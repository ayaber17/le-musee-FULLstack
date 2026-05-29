<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $contact) {}

    public function envelope(): Envelope
    {
        // FIX #4: truncate the user-supplied subject to prevent excessively long
        // or potentially malicious content from appearing in the email subject line.
        $safeSubject = mb_substr(strip_tags($this->contact->subject), 0, 80);

        return new Envelope(
            subject: '[Hotel Le Musée] New message: ' . $safeSubject,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-received',
            with: ['contact' => $this->contact],
        );
    }
}
