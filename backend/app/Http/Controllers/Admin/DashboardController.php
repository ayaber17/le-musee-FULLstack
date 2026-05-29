<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ContactMessage;
use App\Models\Review;
use App\Models\User;

class DashboardController extends Controller
{
    public function stats()
    {
        $stats = [
            ['label' => 'Total Bookings', 'value' => Booking::count(), 'icon' => 'BedDouble', 'color' => 'bg-[#1B3022]', 'delta' => Booking::whereMonth('created_at', now()->month)->count() . ' this month'],
            ['label' => 'New Messages',   'value' => ContactMessage::where('is_read', false)->count(), 'icon' => 'MessageSquare', 'color' => 'bg-[#C8A96A]', 'delta' => ContactMessage::count() . ' total'],
            ['label' => 'Avg. Rating',    'value' => number_format(Review::avg('rating') ?? 0, 1), 'icon' => 'Star', 'color' => 'bg-amber-500', 'delta' => Review::count() . ' reviews'],
            ['label' => 'Total Guests',   'value' => User::where('role', 'guest')->count(), 'icon' => 'Users', 'color' => 'bg-indigo-500', 'delta' => '+8% vs last year'],
        ];

        $recentActivity = Booking::with('user', 'room')
            ->latest()->take(10)->get()
            ->map(fn($b) => [
                'id'     => $b->id,
                'name'   => $b->user->name,
                'room'   => $b->room->name,
                'date'   => $b->check_in->format('M d, Y'),
                'status' => $b->status,
            ]);

        return response()->json(['success' => true, 'stats' => $stats, 'recentActivity' => $recentActivity]);
    }
}
