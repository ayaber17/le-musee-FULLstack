<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Review;
use App\Models\ContactMessage;
use App\Models\User;
use App\Models\Room;

class AdminController extends Controller
{

    public function getDashboardStats()
    {
        try {
            $stats = [
                [
                    'label' => 'Total Bookings',
                    'value' => Booking::count(), 
                    'icon' => 'BedDouble',
                    'color' => 'bg-blue-500'
                ],
                [
                    'label' => 'New Messages',
                    'value' => ContactMessage::where('is_read', false)->count(), //
                    'icon' => 'MessageSquare',
                    'color' => 'bg-green-500'
                ],
                [
                    'label' => 'Avg Rating',
                    'value' => number_format(Review::avg('note') ?: 0, 1), //
                    'icon' => 'Star',
                    'color' => 'bg-yellow-500'
                ],
                [
                    'label' => 'Total Guests',
                    'value' => User::where('role', 'guest')->count(),
                    'icon' => 'Users',
                    'color' => 'bg-purple-500'
                ],
            ];

            $recentBookings = Booking::with(['user', 'room.type']) //
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($booking) {
                    return [
                        'id' => $booking->id, //
                        'name' => $booking->user->nom ?? 'Guest', //
                        'room' => $booking->room->type->name ?? 'N/A', //
                        'date' => $booking->date_debut->format('d M Y'), //
                        'status' => $booking->status_payment, //
                    ];
                });

            return response()->json([
                'success' => true,
                'stats' => $stats,
                'recentActivity' => $recentBookings
            ]);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }


public function getAllBookings()
{
    try {
        $bookings = Booking::with(['user', 'room.type', 'coupon', 'payments'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $bookings,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage(),
        ], 500);
    }
}
    public function getMessages()
    {
        $messages = ContactMessage::latest()->get(); //
        return response()->json($messages);
    }

    public function markMessageAsRead($id)
    {
        $message = ContactMessage::findOrFail($id); //
        $message->update(['is_read' => true]); //
        return response()->json(['success' => true]);
    }
}
