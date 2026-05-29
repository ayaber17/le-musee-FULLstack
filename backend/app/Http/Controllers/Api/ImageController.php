<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function index(Room $room): JsonResponse
    {
        return response()->json($room->images);
    }

    public function store(Request $request, Room $room): JsonResponse
    {
        $request->validate([
            'images'            => 'required|array|min:1',
            'images.*'          => 'required|image|mimes:jpeg,png,jpg,webp|max:4096',
            'primary_index'     => 'nullable|integer|min:0',
        ]);

        // If setting a new primary, unset existing primary
        if ($request->has('primary_index')) {
            $room->images()->where('is_primary', true)->update(['is_primary' => false]);
        }

        $created = [];
        foreach ($request->file('images') as $index => $file) {
            $path = $file->store("rooms/{$room->id}", 'public');
            $created[] = Image::create([
                'room_id'    => $room->id,
                'url_image'  => Storage::url($path),
                'is_primary' => $index === ($request->primary_index ?? 0)
                                && !$room->images()->where('is_primary', true)->exists(),
            ]);
        }

        return response()->json($created, 201);
    }

    public function setPrimary(Room $room, Image $image): JsonResponse
    {
        abort_if($image->room_id !== $room->id, 404);

        $room->images()->update(['is_primary' => false]);
        $image->update(['is_primary' => true]);

        return response()->json($image->fresh());
    }

    public function destroy(Room $room, Image $image): JsonResponse
    {
        abort_if($image->room_id !== $room->id, 404);

        // Remove file from storage
        $relativePath = str_replace('/storage/', 'public/', $image->url_image);
        Storage::delete($relativePath);

        $image->delete();
        return response()->json(['message' => 'Image deleted successfully.']);
    }
}
