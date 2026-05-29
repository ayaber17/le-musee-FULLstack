<?php


// use App\Http\Controllers\RoomTypeController;
// use App\Http\Controllers\RoomController;
// use App\Http\Controllers\BookingController;
// use App\Http\Controllers\PaymentController;
// use App\Http\Controllers\ReviewController;
// use App\Http\Controllers\ServiceController;
// use App\Http\Controllers\CouponController;
// use App\Http\Controllers\NotificationController;
// use App\Http\Controllers\SettingController;
// use App\Http\Controllers\UserDetailController;
// use Illuminate\Support\Facades\Route;

// Route::middleware(['auth'])->group(function () {

//     // Room Types
//     Route::resource('room-types', RoomTypeController::class);

//     // Rooms
//     Route::resource('rooms', RoomController::class);

//     // Bookings
//     Route::resource('bookings', BookingController::class);

//     // Payments
//     Route::resource('payments', PaymentController::class);

//     // Reviews
//     Route::resource('reviews', ReviewController::class)->only(['index', 'store', 'destroy']);

//     // Services
//     Route::resource('services', ServiceController::class);

//     // Coupons
//     Route::resource('coupons', CouponController::class)->except(['show']);

//     // Notifications
//     Route::prefix('notifications')->name('notifications.')->controller(NotificationController::class)->group(function () {
//         Route::get('/',             'index')->name('index');
//         Route::patch('{notification}/read', 'markAsRead')->name('markAsRead');
//         Route::patch('read-all',    'markAllAsRead')->name('markAllAsRead');
//         Route::delete('{notification}', 'destroy')->name('destroy');
//     });

//     // Settings
//     Route::get('settings',  [SettingController::class, 'index'])->name('settings.index');
//     Route::put('settings',  [SettingController::class, 'update'])->name('settings.update');

//     // User Details
//     Route::get('users/{user}/details',  [UserDetailController::class, 'show'])->name('user-details.show');
//     Route::get('users/{user}/details/edit', [UserDetailController::class, 'edit'])->name('user-details.edit');
//     Route::put('users/{user}/details',  [UserDetailController::class, 'update'])->name('user-details.update');
// });


// // ============================================================
// // routes/api.php
// // ============================================================

// use App\Http\Controllers\RoomTypeController;
// use App\Http\Controllers\RoomController;
// use App\Http\Controllers\BookingController;
// use App\Http\Controllers\PaymentController;
// use App\Http\Controllers\ReviewController;
// use App\Http\Controllers\ServiceController;
// use App\Http\Controllers\CouponController;
// use App\Http\Controllers\NotificationController;
// use App\Http\Controllers\SettingController;
// use App\Http\Controllers\UserDetailController;

// Route::middleware(['auth:sanctum'])->group(function () {

//     // Room Types
//     Route::prefix('room-types')->name('api.room-types.')->group(function () {
//         Route::get('/',                         [RoomTypeController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [RoomTypeController::class, 'apiStore'])->name('store');
//         Route::get('/{roomType}',               [RoomTypeController::class, 'apiShow'])->name('show');
//         Route::put('/{roomType}',               [RoomTypeController::class, 'apiUpdate'])->name('update');
//         Route::delete('/{roomType}',            [RoomTypeController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Rooms
//     Route::prefix('rooms')->name('api.rooms.')->group(function () {
//         Route::get('/',                         [RoomController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [RoomController::class, 'apiStore'])->name('store');
//         Route::get('/{room}',                   [RoomController::class, 'apiShow'])->name('show');
//         Route::put('/{room}',                   [RoomController::class, 'apiUpdate'])->name('update');
//         Route::delete('/{room}',                [RoomController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Bookings
//     Route::prefix('bookings')->name('api.bookings.')->group(function () {
//         Route::get('/',                         [BookingController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [BookingController::class, 'apiStore'])->name('store');
//         Route::get('/{booking}',                [BookingController::class, 'apiShow'])->name('show');
//         Route::put('/{booking}',                [BookingController::class, 'apiUpdate'])->name('update');
//         Route::delete('/{booking}',             [BookingController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Payments
//     Route::prefix('payments')->name('api.payments.')->group(function () {
//         Route::get('/',                         [PaymentController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [PaymentController::class, 'apiStore'])->name('store');
//         Route::get('/{payment}',                [PaymentController::class, 'apiShow'])->name('show');
//         Route::put('/{payment}',                [PaymentController::class, 'apiUpdate'])->name('update');
//         Route::delete('/{payment}',             [PaymentController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Reviews
//     Route::prefix('reviews')->name('api.reviews.')->group(function () {
//         Route::get('/',                         [ReviewController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [ReviewController::class, 'apiStore'])->name('store');
//         Route::delete('/{review}',              [ReviewController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Services
//     Route::prefix('services')->name('api.services.')->group(function () {
//         Route::get('/',                         [ServiceController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [ServiceController::class, 'apiStore'])->name('store');
//         Route::put('/{service}',                [ServiceController::class, 'apiUpdate'])->name('update');
//         Route::delete('/{service}',             [ServiceController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Coupons
//     Route::prefix('coupons')->name('api.coupons.')->group(function () {
//         Route::get('/',                         [CouponController::class, 'apiIndex'])->name('index');
//         Route::post('/',                        [CouponController::class, 'apiStore'])->name('store');
//         Route::post('/validate',                [CouponController::class, 'apiValidate'])->name('validate');
//         Route::delete('/{coupon}',              [CouponController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Notifications
//     Route::prefix('notifications')->name('api.notifications.')->group(function () {
//         Route::get('/',                         [NotificationController::class, 'apiIndex'])->name('index');
//         Route::patch('/{notification}/read',    [NotificationController::class, 'apiMarkAsRead'])->name('markAsRead');
//         Route::patch('/read-all',               [NotificationController::class, 'apiMarkAllAsRead'])->name('markAllAsRead');
//         Route::delete('/{notification}',        [NotificationController::class, 'apiDestroy'])->name('destroy');
//     });

//     // Settings
//     Route::prefix('settings')->name('api.settings.')->group(function () {
//         Route::get('/',                         [SettingController::class, 'apiIndex'])->name('index');
//         Route::put('/',                         [SettingController::class, 'apiUpdate'])->name('update');
//         Route::get('/{key}',                    [SettingController::class, 'apiShow'])->name('show');
//     });

//     // User Details
//     Route::prefix('users')->name('api.users.')->group(function () {
//         Route::get('/{user}',                   [UserDetailController::class, 'apiShow'])->name('show');
//         Route::put('/{user}/details',           [UserDetailController::class, 'apiUpdate'])->name('details.update');
//     });
// });
