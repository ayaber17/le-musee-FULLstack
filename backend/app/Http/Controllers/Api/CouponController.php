<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CouponController extends Controller
{
    // ─── Admin: List coupons ──────────────────────────────────────────────────
    public function index(): JsonResponse
    {
        $coupons = Coupon::withoutGlobalScope('valid')
            ->latest()
            ->paginate(15);

        return response()->json([
            'data' => $coupons->items(),
            'meta' => [
                'current_page' => $coupons->currentPage(),
                'last_page'    => $coupons->lastPage(),
                'total'        => $coupons->total(),
                'per_page'     => $coupons->perPage(),
            ],
        ]);
    }

    // ─── Admin: Create coupon ─────────────────────────────────────────────────
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code'           => 'required|string|unique:coupons,code',
            'discount_type'  => 'required|in:percent,fixed',
            'discount_value' => 'required|numeric|min:0',
            'start_date'     => 'required|date',
            'end_date'       => 'required|date|after:start_date',
            'usage_limit'    => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $coupon = Coupon::withoutGlobalScope('valid')->create($validated);
            DB::commit();

            return response()->json($coupon, 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error creating coupon',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ─── Admin: Show coupon ───────────────────────────────────────────────────
    public function show(string $id): JsonResponse
    {
        $coupon = Coupon::withoutGlobalScope('valid')->findOrFail($id);

        return response()->json($coupon);
    }

    // ─── Admin: Update coupon ─────────────────────────────────────────────────
    public function update(Request $request, string $id): JsonResponse
    {
        $coupon = Coupon::withoutGlobalScope('valid')->findOrFail($id);

        $validated = $request->validate([
            'code'           => 'sometimes|string|unique:coupons,code,' . $coupon->id,
            'discount_type'  => 'sometimes|in:percent,fixed',
            'discount_value' => 'sometimes|numeric|min:0',
            'start_date'     => 'sometimes|date',
            'end_date'       => 'sometimes|date|after:start_date',
            'usage_limit'    => 'sometimes|integer|min:0',
        ]);

        DB::beginTransaction();

        try {
            $coupon->update($validated);
            DB::commit();

            return response()->json($coupon->fresh());
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error updating coupon',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ─── Admin: Delete coupon ─────────────────────────────────────────────────
    public function destroy(string $id): JsonResponse
    {
        $coupon = Coupon::withoutGlobalScope('valid')->findOrFail($id);
        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted successfully']);
    }

    // ─── Admin: Get latest valid coupon ──────────────────────────────────────
    public function getLatestValid(): JsonResponse
    {
        $coupon = Coupon::latest()->first();

        if (!$coupon) {
            return response()->json(['message' => 'No coupons available'], 404);
        }

        return response()->json($coupon);
    }

    // ─── Public: Quick check (used by frontend on input) ─────────────────────
    // ✅ FIX: استعمل withoutGlobalScope + قارن بـ endOfDay() باش يشمل كامل اليوم
    public function check(Request $request): JsonResponse
    {
        $request->validate(['code' => 'required|string']);

        $coupon = Coupon::withoutGlobalScope('valid')
                        ->where('code', $request->code)
                        ->first();

        if (!$coupon) {
            return response()->json(['valid' => false, 'message' => 'Code promo introuvable.'], 200);
        }

        if ($coupon->usage_limit <= 0) {
            return response()->json(['valid' => false, 'message' => 'Code promo épuisé.'], 200);
        }

        $now = now();

        // ✅ FIX: startOfDay / endOfDay باش يشمل كامل اليوم الأول والأخير
        if ($now->lt($coupon->start_date->copy()->startOfDay()) || $now->gt($coupon->end_date->copy()->endOfDay())) {
            return response()->json(['valid' => false, 'message' => 'Code promo expiré ou pas encore actif.'], 200);
        }

        return response()->json([
            'valid'          => true,
            'discount_type'  => $coupon->discount_type,
            'discount_value' => $coupon->discount_value,
        ]);
    }

    // ─── Public: Validate coupon (used at booking confirmation) ──────────────
    // ✅ FIX: نفس الإصلاح — endOfDay() على end_date
    public function validateCoupon(Request $request): JsonResponse
    {
        $validated = $request->validate(['code' => 'required|string']);

        $coupon = Coupon::withoutGlobalScope('valid')
                        ->where('code', $validated['code'])
                        ->first();

        if (!$coupon) {
            return response()->json(['valid' => false, 'message' => 'Code promo introuvable.'], 404);
        }

        if ($coupon->usage_limit <= 0) {
            return response()->json(['valid' => false, 'message' => 'Limite d\'utilisation atteinte.'], 422);
        }

        $now = now();

        // ✅ FIX: startOfDay / endOfDay باش يشمل كامل اليوم الأول والأخير
        if ($now->lt($coupon->start_date->copy()->startOfDay()) || $now->gt($coupon->end_date->copy()->endOfDay())) {
            return response()->json(['valid' => false, 'message' => 'Code promo expiré ou pas encore actif.'], 422);
        }

        return response()->json([
            'valid'          => true,
            'discount_type'  => $coupon->discount_type,
            'discount_value' => $coupon->discount_value,
        ]);
    }
}
