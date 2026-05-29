<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{

    public function index(Request $request): JsonResponse
    {
        $reviews = Review::with(['user', 'room.type'])
            ->when($request->room_id, fn($q) => $q->where('room_id', $request->room_id))
            ->when($request->user_id, fn($q) => $q->where('user_id', $request->user_id))
            ->latest()
            ->paginate($request->per_page ?? 15);

        return response()->json($reviews);
    }


    public function store(Request $request): JsonResponse
    {
        if (! $request->user()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $validated = $request->validate([
            'room_id'     => 'required|exists:rooms,id',
            'note'        => 'required|numeric|min:1|max:5',
            'commentaire' => 'nullable|string|max:1000',
        ]);

        $exists = Review::where('user_id', $request->user()->id)
            ->where('room_id', $validated['room_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'You have already reviewed this room.',
            ], 422);
        }

        $review = Review::create([
            'user_id'     => $request->user()->id,
            'room_id'     => $validated['room_id'],
            'note'        => $validated['note'],
            'commentaire' => $validated['commentaire'] ?? null,
        ]);

        return response()->json($review->load(['user', 'room']), 201);
    }


    public function show(Review $review): JsonResponse
    {
        return response()->json($review->load(['user', 'room']));
    }


    public function update(Request $request, Review $review): JsonResponse
    {
        $this->authorize('update', $review);

        $validated = $request->validate([
            'note'        => 'sometimes|numeric|min:1|max:5',
            'commentaire' => 'nullable|string|max:1000',
        ]);

        $review->update($validated);

        return response()->json($review->fresh(['user', 'room']));
    }
    public function destroy(Review $review): JsonResponse
    {
        $this->authorize('delete', $review);
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.']);
    }
}
