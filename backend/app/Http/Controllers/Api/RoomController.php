<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Review;
use App\Models\User;
use App\Models\BookingNotificationModel as Notification;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    // ─── Index — public list of all rooms ────────────────────────────────────
    public function index(): JsonResponse
    {
        try {
            $rooms = Room::with(['type', 'images', 'services'])
                ->get();

            return response()->json($rooms, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // ─── Show — single room detail ────────────────────────────────────────────
    public function show(Room $room): JsonResponse
    {
        return response()->json(
            $room->load(['type', 'images', 'services', 'reviews.user'])
        );
    }

    // ─── Store — admin creates a room ─────────────────────────────────────────
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'num_room'     => 'required|string|max:20|unique:rooms,num_room',
            'floor'        => 'nullable|integer|min:0',
            'status'       => 'required|in:available,occupied,cleaning,maintenance',
            'room_type_id' => 'required|exists:room_types,id',
        ]);

        $room = Room::create($validated);

        // Notify staff if created directly with maintenance/cleaning status
        if (in_array($validated['status'], ['maintenance', 'cleaning'])) {
            $this->notifyStaff($room, $validated['status']);
        }

        return response()->json($room->load('type'), 201);
    }

    // ─── Update — admin updates a room ────────────────────────────────────────
    public function update(Request $request, Room $room): JsonResponse
    {
        $validated = $request->validate([
            'num_room'     => 'sometimes|string|max:20|unique:rooms,num_room,' . $room->id,
            'floor'        => 'nullable|integer|min:0',
            'status'       => 'sometimes|in:available,occupied,cleaning,maintenance',
            'room_type_id' => 'sometimes|exists:room_types,id',
        ]);

        $oldStatus = $room->status;
        $newStatus = $validated['status'] ?? $oldStatus;

        $room->update($validated);

        // ── Auto-notification when status changes to maintenance or cleaning ──
        if ($newStatus !== $oldStatus && in_array($newStatus, ['maintenance', 'cleaning'])) {
            $this->notifyStaff($room->fresh(), $newStatus);
        }

        return response()->json($room->fresh('type'));
    }

    // ─── Destroy — admin deletes a room ──────────────────────────────────────
    public function destroy(Room $room): JsonResponse
    {
        $room->delete();
        return response()->json(['message' => 'Room deleted successfully.']);
    }

    // ─── Sync services ────────────────────────────────────────────────────────
    public function syncServices(Request $request, Room $room): JsonResponse
    {
        $request->validate([
            'service_ids'   => 'required|array',
            'service_ids.*' => 'exists:services,id',
        ]);

        $room->services()->sync($request->service_ids);

        return response()->json($room->load('services'));
    }

    // ─── Available rooms (legacy route) ──────────────────────────────────────
    public function available(): JsonResponse
    {
        $rooms = Room::with(['type', 'images'])
            ->where('status', 'available')
            ->get();

        return response()->json($rooms);
    }

    // ─── Private: notify all staff & admins ──────────────────────────────────
    /**
     * Sends a BookingNotificationModel to every user with role admin or staff.
     * Called automatically when a room status changes to 'maintenance' or 'cleaning'.
     */
    private function notifyStaff(Room $room, string $status): void
    {
        $label   = $status === 'maintenance' ? 'Maintenance' : 'Nettoyage';
        $message = "🏨 Chambre {$room->num_room} (Étage {$room->floor}) — mise en {$label} par " .
                   (Auth::user()?->name ?? 'le système') . ".";

        // Fetch all staff & admin users
        $staffUsers = User::whereIn('role', ['admin', 'staff'])->get();

        foreach ($staffUsers as $user) {
            Notification::create([
                'user_id'   => $user->id,
                'booking_id'=> null,
                'type'      => 'room_status',
                'message'   => $message,
                'is_read'   => false,
            ]);
        }
    }
}
// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\Room;
// use App\Models\Review;
// use Illuminate\Http\Request;
// use Illuminate\Http\JsonResponse;
// use Illuminate\Support\Facades\Auth;

// class RoomController extends Controller
// {
//     // ─── Index — public list of all rooms ────────────────────────────────────
//     public function index(): JsonResponse
//     {
//         try {
//             $rooms = Room::with(['type', 'images', 'services'])
//                 ->get();

//             return response()->json($rooms, 200);
//         } catch (\Exception $e) {
//             return response()->json(['error' => $e->getMessage()], 500);
//         }
//     }

    // ─── Show — single room detail ────────────────────────────────────────────
    // public function show(Room $room): JsonResponse
    // {
    //     return response()->json(
    //         $room->load(['type', 'images', 'services', 'reviews.user'])
    //     );
    // }

    // ─── Store — admin creates a room ─────────────────────────────────────────
    // public function store(Request $request): JsonResponse
    // {
    //     $validated = $request->validate([
    //         'num_room'     => 'required|string|max:20|unique:rooms,num_room',
    //         'floor'        => 'nullable|integer|min:0',
    //         'status'       => 'required|in:available,occupied,cleaning,maintenance',
    //         'room_type_id' => 'required|exists:room_types,id',
    //     ]);

    //     $room = Room::create($validated);

    //     return response()->json($room->load('type'), 201);
    // }

    // ─── Update — admin updates a room ────────────────────────────────────────
    // public function update(Request $request, Room $room): JsonResponse
    // {
    //     $validated = $request->validate([
    //         'num_room'     => 'sometimes|string|max:20|unique:rooms,num_room,' . $room->id,
    //         'floor'        => 'nullable|integer|min:0',
    //         'status'       => 'sometimes|in:available,occupied,cleaning,maintenance',
    //         'room_type_id' => 'sometimes|exists:room_types,id',
    //     ]);

    //     $room->update($validated);

    //     return response()->json($room->fresh('type'));
    // }

    // ─── Destroy — admin deletes a room ──────────────────────────────────────
    // public function destroy(Room $room): JsonResponse
    // {
    //     $room->delete();
    //     return response()->json(['message' => 'Room deleted successfully.']);
    // }

    // ─── Sync services ────────────────────────────────────────────────────────
    // public function syncServices(Request $request, Room $room): JsonResponse
    // {
    //     $request->validate([
    //         'service_ids'   => 'required|array',
    //         'service_ids.*' => 'exists:services,id',
    //     ]);

    //     $room->services()->sync($request->service_ids);

    //     return response()->json($room->load('services'));
    // }

    // ─── Available rooms (legacy route) ──────────────────────────────────────
//     public function available(): JsonResponse
//     {
//         $rooms = Room::with(['type', 'images'])
//             ->where('status', 'available')
//             ->get();

//         return response()->json($rooms);
//     }
// }
// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\Review;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class RoomController extends Controller
// {
//     /**
//      * ✅ FIX: user_id must come from Auth::id(), NOT from request body.
//      * Never trust user_id sent from frontend — security risk.
//      */
//     public function store(Request $request)
//     {
//         // 1. Validate incoming data
//         $validated = $request->validate([
//             'room_id'    => 'required|integer|exists:rooms,id',
//             'note'       => 'required|numeric|min:1|max:5',
//             'commentaire'=> 'nullable|string|max:1000',
//         ]);

//         // 2. ✅ AttachA authenticated user's ID server-side
//         $validated['user_id'] = Auth::id();

//         // 3. Create the review
//         $review = Review::create($validated);

//         return response()->json([
//             'message' => 'Review submitted successfully',
//             'review'  => $review,
//         ], 201);
//     }
// public function index()
// {
//     try {
//         return response()->json(\App\Models\RoomType::all(), 200);
//     } catch (\Exception $e) {
//         return response()->json(['error' => $e->getMessage()], 500);
//     }
// }
// } -->
