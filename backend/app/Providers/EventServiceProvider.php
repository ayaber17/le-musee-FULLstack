<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Models\Booking;
use App\Observers\BookingObserver;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     */
    protected $listen = [
        // هنا تقدر تضيف Event => Listener
    ];

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // تسجيل Observer ديال Booking
        Booking::observe(BookingObserver::class);
    }
}
