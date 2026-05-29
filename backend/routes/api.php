<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\RoomAvailabilityController;

/*
|--------------------------------------------------------------------------
| Public Routes (المسارات العامة)
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);
Route::get('/rooms/available', [RoomAvailabilityController::class, 'index']);


// Rooms & Services (public read-only)
Route::get('rooms',                  [RoomController::class,     'index']);
Route::get('rooms/available',        [RoomController::class,     'available']);
Route::get('rooms/{room}',           [RoomController::class,     'show']);
Route::get('rooms/{room}/images',    [ImageController::class,    'index']);
Route::get('room-types',             [RoomTypeController::class, 'index']);
Route::get('room-types/{roomType}',  [RoomTypeController::class, 'show']);
Route::get('services',               [ServiceController::class,  'index']);
Route::get('reviews',                [ReviewController::class,   'index']);
Route::get('reviews/{review}',       [ReviewController::class,   'show']);
Route::post('coupons/validate',      [CouponController::class,   'validate']);
Route::post('/contact', [ContactController::class, 'store']);
/*
|--------------------------------------------------------------------------
| Authenticated Routes — auth:sanctum
|--------------------------------------------------------------------------
*/
Route::get('/coupons/check', [CouponController::class, 'check']);
Route::get('coupons/latest-valid', [CouponController::class, 'getLatestValid']);
Route::middleware('auth:sanctum')->group(function () {

    // Current user info
    Route::get('/user', fn(Request $request) => $request->user());

    // Profile & security
    Route::get('profile',             [UserController::class, 'profile']);
    Route::put('profile',             [UserController::class, 'updateProfile']);
    Route::put('profile/password',    [UserController::class, 'updatePassword']);
    Route::post('logout',             [AuthController::class, 'logout']);

    // Bookings — user owns only their bookings
    // ⚠️  my-bookings MUST come before {booking} to avoid route conflict
    Route::get('my-bookings',         [BookingController::class, 'userBookings']);
    Route::post('bookings',           [BookingController::class, 'store']);
    Route::get('bookings/{booking}',  [BookingController::class, 'show']);
    // ☝️  ownership check (user_id === auth()->id()) MUST be enforced inside show()

    // Reviews
    Route::post('reviews',              [ReviewController::class, 'store']);
    Route::put('reviews/{review}',      [ReviewController::class, 'update']);
    Route::delete('reviews/{review}',   [ReviewController::class, 'destroy']);

    // Notifications
    Route::get('notifications',                          [NotificationController::class, 'index']);
    Route::get('notifications/unread-count',             [NotificationController::class, 'unreadCount']);
    Route::patch('notifications/{notification}/read',    [NotificationController::class, 'markAsRead']);
    Route::patch('notifications/mark-all-read',           [NotificationController::class, 'markAllAsRead']);
    Route::delete('notifications/{notification}',        [NotificationController::class, 'destroy']);



    /*
    |--------------------------------------------------------------------------
    | Admin / Staff Routes — role:admin,staff
    | ⚠️  Make sure CheckRole middleware is registered in Kernel.php:
    |      'role' => \App\Http\Middleware\CheckRole::class
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,staff')->prefix('admin')->group(function () {

        // Dashboard stats
        Route::get('/stats',                    [AdminController::class, 'getDashboardStats']);

        // Messages
        Route::get('/messages',                 [AdminController::class, 'getMessages']);
        Route::put('/messages/{id}/read',       [AdminController::class, 'markMessageAsRead']);

        // Users management
        Route::apiResource('users', UserController::class);

        // Rooms management (index & show already public above)
        Route::apiResource('rooms', RoomController::class)->except(['index', 'show']);
        Route::post('rooms/{room}/services',    [RoomController::class,  'syncServices']);
        Route::post('rooms/{room}/images',      [ImageController::class, 'store']);

        // Bookings management
        Route::get('bookings',                  [AdminController::class,  'getAllBookings']);
        Route::patch('bookings/{booking}',      [BookingController::class,'update']);
        Route::delete('bookings/{booking}',     [BookingController::class,'destroy']);

        // Other admin resources
        Route::apiResource('room-types', RoomTypeController::class)->except(['index', 'show']);
        Route::apiResource('services',   ServiceController::class)->except(['index']);
        Route::apiResource('coupons',    CouponController::class);
        Route::apiResource('payments',   PaymentController::class);
        Route::get('settings',           [SettingController::class, 'index']);
        Route::post('settings',          [SettingController::class, 'upsert']);
        Route::delete('settings/{key}',  [SettingController::class, 'destroy']);
        });
});

use Illuminate\Support\Facades\DB;

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return response()->json([
            'status' => 'success',
            'message' => 'L-Connexion khdama m9adda m3a MySQL!'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Had l-moshkil 3lash makatbghish t-konnekta:',
            'error_details' => $e->getMessage()
        ], 500);
    }
});
