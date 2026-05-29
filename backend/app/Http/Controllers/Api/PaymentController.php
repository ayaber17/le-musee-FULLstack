<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $payments = Payment::with('booking.user')
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->methode, fn($q) => $q->where('methode', $request->methode))
            ->latest()
            ->paginate($request->per_page ?? 15);

        return response()->json($payments);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'booking_id'     => 'required|exists:bookings,id',
            'montant'        => 'required|numeric|min:0',
            'methode'        => 'required|in:cash,card,virement,paypal',
            'status'         => 'required|in:pending,completed,failed,refunded',
            'transaction_id' => 'nullable|string|unique:payments,transaction_id',
            'date_payments'  => 'required|date',
        ]);

        $payment = Payment::create($validated);

        // If payment completed, update booking status
        if ($validated['status'] === 'completed') {
            Booking::where('id', $validated['booking_id'])
                ->update(['status_payment' => 'paid']);
        }

        return response()->json($payment->load('booking'), 201);
    }

    public function show(Payment $payment): JsonResponse
    {
        return response()->json($payment->load('booking.user'));
    }

    public function update(Request $request, Payment $payment): JsonResponse
    {
        $validated = $request->validate([
            'status'         => 'sometimes|in:pending,completed,failed,refunded',
            'transaction_id' => 'sometimes|nullable|string',
        ]);

        $payment->update($validated);

        if (isset($validated['status']) && $validated['status'] === 'completed') {
            $payment->booking()->update(['status_payment' => 'pending']);
        }

        return response()->json($payment->fresh('booking'));
    }

    public function destroy(Payment $payment): JsonResponse
    {
        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully.']);
    }
}
