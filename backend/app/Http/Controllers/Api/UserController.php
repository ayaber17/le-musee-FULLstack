<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Admin: list all users with pagination
     */
    public function index(Request $request): JsonResponse
    {
        $users = User::with('details')
            ->when($request->role, fn($q) => $q->where('role', $request->role))
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'data' => UserResource::collection($users->items()),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page'    => $users->lastPage(),
                'total'        => $users->total(),
                'per_page'     => $users->perPage(),
            ]
        ]);
    }

    /**
     * Admin: create user & details
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom'          => 'required|string|max:100',
            'prenom'       => 'required|string|max:100',
            'email'        => 'required|email|unique:users,email',
            'password'     => ['required', Password::min(8)],
            'telephone'    => 'nullable|string|max:20',
            'role'         => 'required|in:admin,staff,client',
            'status'       => 'required|in:active,inactive,banned',
            'is_foreign'   => 'boolean',
            'cin_passport' => 'nullable|string|max:50',
        ]);

        DB::beginTransaction();
        try {
            $validated['password'] = Hash::make($validated['password']);

            // إنشاء المستخدم (بدون cin_passport لأنها في جدول التفاصيل)
            $user = User::create(Arr::except($validated, ['cin_passport']));

            // إنشاء التفاصيل إذا وجدت
            $user->details()->create([
                'cin_passport' => $validated['cin_passport'] ?? null
            ]);

            DB::commit();
            return response()->json(new UserResource($user->load('details')), 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating user',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Authenticated user profile
     */
    public function profile(Request $request): JsonResponse
    {
        // كنستعملو UserResource باش نخرجو البيانات كيفما محتاجها الـ Frontend
        return response()->json(
            new UserResource($request->user()->load('details'))
        );
    }

    /**
     * Authenticated user: update own profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'nom'       => 'sometimes|string|max:100',
            'prenom'    => 'sometimes|string|max:100',
            'telephone' => 'nullable|string|max:20',
            'avatar'    => 'nullable|string|max:255',
            'details.nationality' => 'nullable|string|max:100',
            'details.dob'         => 'nullable|date',
            'details.adresse'     => 'nullable|string|max:255',
            'details.cin_passport'=> 'nullable|string|max:50',
        ]);

        DB::beginTransaction();
        try {
            $user->update(Arr::except($validated, ['details']));

            if (!empty($validated['details'])) {
                $user->details()->updateOrCreate(
                    ['user_id' => $user->id],
                    $validated['details']
                );
            }

            DB::commit();
            return response()->json(new UserResource($user->fresh('details')));

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Update failed', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update password
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required|string',
            'password'         => ['required', 'confirmed', Password::min(8)],
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 422);
        }

        $request->user()->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    /**
     * Admin: show any user
     */
    public function show(User $user): JsonResponse
    {
        return response()->json(
            new UserResource($user->load(['details', 'bookings.room.type', 'reviews']))
        );
    }

    /**
     * Admin: update user details
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'nom'       => 'sometimes|string|max:100',
            'prenom'    => 'sometimes|string|max:100',
            'email'     => 'sometimes|email|unique:users,email,' . $user->id,
            'telephone' => 'nullable|string|max:20',
            'role'      => 'sometimes|in:admin,staff,client',
            'status'    => 'sometimes|in:active,inactive,banned',
        ]);

        $user->update($validated);
        return response()->json(new UserResource($user->fresh('details')));
    }

    /**
     * Admin: delete user
     */
    public function destroy(User $user): JsonResponse
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot delete your own account.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully.']);
    }
}
