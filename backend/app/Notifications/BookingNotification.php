<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingNotification extends Notification
{
    use Queueable;

    protected $booking;
    protected $message;

    public function __construct($booking, $message = null)
    {
        $this->booking = $booking;
        $this->message = $message ?? "Your booking has been processed!";
    }

    // Channels: database + optional email
    public function via(object $notifiable): array
    {
        return ['database']; // + 'mail' إذا بغيت email
    }

    // Data to store in DB
    public function toArray(object $notifiable): array
    {
        return [
            'booking_id'  => $this->booking->id,
            'room'        => $this->booking->room->num_room,
            'client_name' => $this->booking->user->nom . ' ' . $this->booking->user->prenom,
            'message'     => $this->message,
        ];
    }
}
