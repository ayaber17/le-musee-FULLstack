<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class BookingController extends Controller
{

    public function index(Request $request): JsonResponse
    {
        $bookings = Booking::with(['user', 'room.type', 'room.services', 'room.images', 'coupon', 'payments'])
            ->when(!$this->isAdminOrStaff(), fn($q) => $q->where('user_id', auth()->id()))
            ->when($request->user_id && $this->isAdminOrStaff(), fn($q) => $q->where('user_id', $request->user_id))
            ->when($request->status_payment, fn($q) => $q->where('status_payment', $request->status_payment))
            ->latest()
            ->paginate($request->per_page ?? 15);

        return response()->json($bookings);
    }


    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'room_id'     => 'required|exists:rooms,id',
            'date_debut'  => 'required|date|after_or_equal:today',
            'date_fin'    => 'required|date|after:date_debut',
            'coupon_code' => 'nullable|string|max:50',
        ]);

        $room = Room::with('type')->find($validated['room_id']);

        if (!$room) {
            return response()->json(['message' => 'Room not found.'], 404);
        }

        if (!$room->type || is_null($room->type->base_price)) {
            return response()->json(['message' => 'This room has no price configured. Please contact support.'], 422);
        }

        if (!$room->isAvailable($validated['date_debut'], $validated['date_fin'])) {
            return response()->json(['message' => 'Room is not available for the selected dates.'], 422);
        }

        $nights     = Carbon::parse($validated['date_debut'])->diffInDays($validated['date_fin']);
        $totalPrice = round($room->type->base_price * $nights, 2);
        $couponId   = null;

        DB::beginTransaction();
        try {
            if (!empty($validated['coupon_code'])) {
                $coupon = Coupon::where('code', $validated['coupon_code'])
                    ->lockForUpdate()
                    ->first();

                if (!$coupon || !$coupon->isValid()) {
                    DB::rollBack();
                    return response()->json(['message' => 'Invalid or expired coupon.'], 422);
                }

                if ($coupon->discount_type === 'percent') {
                    $totalPrice -= $totalPrice * ($coupon->discount_value / 100);
                } else {
                    $totalPrice -= $coupon->discount_value;
                }

                $totalPrice = max(0, round($totalPrice, 2));
                $coupon->useCoupon();
                $couponId = $coupon->id;
            }

            $booking = Booking::create([
                'user_id'        => $request->user()->id,
                'room_id'        => $room->id,
                'coupon_id'      => $couponId,
                'date_debut'     => $validated['date_debut'],
                'date_fin'       => $validated['date_fin'],
                'prix_total'     => $totalPrice,
                'status_payment' => 'pending',
            ]);

            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Booking creation failed', [
                'user_id' => $request->user()->id,
                'room_id' => $validated['room_id'],
                'error'   => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile(),
            ]);
            return response()->json(['message' => 'Booking creation failed. Please try again.'], 500);
        }

        return response()->json([
            'message' => 'Booking created successfully.',
            'booking' => $booking->load(['room.type', 'coupon']),
        ], 201);
    }


    public function show(Booking $booking): JsonResponse
    {
        abort_if(
            $booking->user_id !== auth()->id() && !$this->isAdminOrStaff(),
            403,
            'Access denied.'
        );

        return response()->json(
            $booking->load(['user', 'room.type', 'room.images', 'coupon', 'payments'])
        );
    }


    public function update(Request $request, Booking $booking): JsonResponse
    {
        abort_if(
            $booking->user_id !== auth()->id() && !$this->isAdminOrStaff(),
            403,
            'Access denied.'
        );

        $validated = $request->validate([
            'status_payment' => 'sometimes|in:pending,confirmed,cancelled,completed,checked_in',

            'date_debut'     => 'sometimes|date',
            'date_fin'       => 'sometimes|date|after:date_debut',

            'note'           => 'sometimes|nullable|string|max:1000',
        ]);

        if (!$this->isAdminOrStaff()) {
            $requestedStatus = $validated['status_payment'] ?? null;

            if ($requestedStatus && $requestedStatus !== 'cancelled') {
                return response()->json(['message' => 'You are not allowed to change the booking status.'], 403);
            }

            if ($requestedStatus === 'cancelled') {
                if (!in_array($booking->status_payment, ['pending', 'confirmed'])) {
                    return response()->json(['message' => 'This booking cannot be cancelled.'], 422);
                }

                $hoursUntilCheckIn = Carbon::now()->diffInHours(
                    Carbon::parse($booking->date_debut), false
                );

                if ($hoursUntilCheckIn < 48) {
                    return response()->json([
                        'message' => 'Cancellations must be made at least 48 hours before check-in.',
                    ], 422);
                }
            }

            unset($validated['date_debut'], $validated['date_fin'], $validated['note']);
        }

        if (isset($validated['date_debut']) || isset($validated['date_fin'])) {
            $debut = $validated['date_debut'] ?? $booking->date_debut->toDateString();
            $fin   = $validated['date_fin']   ?? $booking->date_fin->toDateString();

            if (!$booking->room->isAvailable($debut, $fin, $booking->id)) {
                return response()->json(['message' => 'Room not available for new dates.'], 422);
            }
        }

        $booking->update($validated);

        return response()->json([
            'message' => 'Booking updated successfully.',
            'booking' => $booking->fresh(['room.type', 'coupon', 'payments']),
        ]);
    }


    public function destroy(Booking $booking): JsonResponse
    {
        abort_if(
            $booking->user_id !== auth()->id() && !$this->isAdminOrStaff(),
            403,
            'Access denied.'
        );

        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully.']);
    }


    public function userBookings(Request $request): JsonResponse
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['room.type', 'room.images', 'coupon', 'payments'])
            ->latest()
            ->paginate($request->per_page ?? 10);

        return response()->json($bookings);
    }


    private function isAdminOrStaff(): bool
    {
        return in_array(auth()->user()->role, ['admin', 'staff']);
    }
}
