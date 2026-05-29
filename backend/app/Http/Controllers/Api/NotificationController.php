<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
// FIX: use BookingNotificationModel (has is_read bool + user_id)
// NOT the Laravel default Notification (has read_at timestamp + morphs)
use App\Models\BookingNotificationModel as Notification;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $notifications = Notification::where('user_id', $request->user()->id)
            ->latest()
            ->paginate($request->per_page ?? 20);

        return response()->json($notifications);
    }


    public function markAsRead(Request $request, Notification $notification): JsonResponse
    {
        abort_if($notification->user_id !== $request->user()->id, 403);
        $notification->update(['is_read' => true]);
        return response()->json($notification);
    }


    public function markAllAsRead(Request $request): JsonResponse
    {
        Notification::where('user_id', $request->user()->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read.']);
    }

    public function destroy(Request $request, Notification $notification): JsonResponse
    {
        abort_if($notification->user_id !== $request->user()->id, 403);
        $notification->delete();
        return response()->json(['message' => 'Notification deleted.']);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $count = Notification::where('user_id', $request->user()->id)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'unread_count' => $count,
            'count'        => $count,
        ]);
    }
}
