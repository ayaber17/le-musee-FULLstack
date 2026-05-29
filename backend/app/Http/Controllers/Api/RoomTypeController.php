<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RoomTypeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $types = RoomType::withCount('rooms')
            ->when($request->min_price && $request->max_price,
                fn($q) => $q->priceBetween($request->min_price, $request->max_price))
            ->when($request->capacity_adult, fn($q) => $q->where('capacity_adult', '>=', $request->capacity_adult))
            ->get();

        return response()->json($types);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'               => 'required|string|max:100',
            'description'        => 'nullable|string',
            'base_price'         => 'required|numeric|min:0',
            'bed_number'         => 'required|integer|min:1',
            'capacity_adult'     => 'required|integer|min:1',
            'capacity_children'  => 'required|integer|min:0',
        ]);

        $type = RoomType::create($validated);
        return response()->json($type, 201);
    }

    public function show(RoomType $roomType): JsonResponse
    {
        return response()->json($roomType->load('rooms.images'));
    }

    public function update(Request $request, RoomType $roomType): JsonResponse
    {
        $validated = $request->validate([
            'name'               => 'sometimes|string|max:100',
            'description'        => 'nullable|string',
            'base_price'         => 'sometimes|numeric|min:0',
            'bed_number'         => 'sometimes|integer|min:1',
            'capacity_adult'     => 'sometimes|integer|min:1',
            'capacity_children'  => 'sometimes|integer|min:0',
        ]);

        $roomType->update($validated);
        return response()->json($roomType->fresh());
    }

    public function destroy(RoomType $roomType): JsonResponse
    {
        $roomType->delete();
        return response()->json(['message' => 'Room type deleted successfully.']);
    }
}
