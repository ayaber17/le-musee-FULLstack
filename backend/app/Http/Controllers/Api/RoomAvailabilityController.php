<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RoomAvailabilityController extends Controller
{

    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'check_in'  => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
        ]);

        $checkIn  = $request->check_in;
        $checkOut = $request->check_out;

        $roomTypes = RoomType::with(['rooms'])->get();

        $result = $roomTypes->map(function (RoomType $type) use ($checkIn, $checkOut) {

            //
            $bookedRoomIds = \App\Models\Booking::whereNotIn('status_payment', ['cancelled'])
                ->where('date_debut', '<', $checkOut)
                ->where('date_fin',   '>',  $checkIn)
                ->pluck('room_id');

            $availableRooms = $type->rooms
                ->where('status', 'available')
                ->whereNotIn('id', $bookedRoomIds)
                ->values();

            $nextRoom = $availableRooms->first();

            return [
                'room_type_id'         => $type->id,
                'room_type_name'       => $type->name,
                'available_count'      => $availableRooms->count(),
                'next_available_room'  => $nextRoom ? [
                    'id'       => $nextRoom->id,
                    'num_room' => $nextRoom->num_room,
                    'floor'    => $nextRoom->floor,
                    'status'   => $nextRoom->status,
                    'base_price'        => $type->base_price,
                    'type'              => $type,
                ] : null,
            ];
        });

        return response()->json($result);
    }
}
