<?php

namespace App\Http\Controllers\Api;

use App\Models\ContactMessage;
use App\Http\Controllers\Controller;
use App\Mail\ContactMessageReceived;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class ContactController extends Controller
{
    private const MAX_ATTEMPTS  = 5;
    private const DECAY_SECONDS = 60;

    public function store(Request $request): JsonResponse
    {
        $key = 'contact:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS)) {
            $seconds = RateLimiter::availableIn($key);

            return response()->json([
                'message'     => 'Too many requests. Please wait before trying again.',
                'retry_after' => $seconds,
            ], 429);
        }

        RateLimiter::hit($key, self::DECAY_SECONDS);


        $validated = $request->validate([
            'name'    => ['required', 'string', 'min:2', 'max:255'],
            'email'   => ['required', 'email:rfc', 'max:255'],
            'subject' => ['required', 'string', 'min:3', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ], [
            'name.min'    => 'Name must be at least 2 characters.',
            'email.email' => 'Please provide a valid email address.',
            'subject.min' => 'Subject must be at least 3 characters.',
            'message.min' => 'Message must be at least 10 characters.',
            'message.max' => 'Message cannot exceed 5000 characters.',
        ]);

        $validated['name']    = strip_tags($validated['name']);
        $validated['subject'] = strip_tags($validated['subject']);
        $validated['message'] = strip_tags($validated['message']);

        // ── 4. Persist ───────────────────────────────────────────────────────
        try {
            $contact = ContactMessage::create($validated);
        } catch (\Throwable $e) {
            Log::error('ContactController@store — DB error', [
                'error' => $e->getMessage(),
                'ip'    => $request->ip(),
            ]);

            return response()->json([
                'message' => 'Unable to save your message. Please try again later.',
            ], 500);
        }

        try {
            Mail::to(config('mail.admin_address', 'admin@hotellemusee.com'))
                ->queue(new ContactMessageReceived($contact));
        } catch (\Throwable $e) {
            Log::warning('ContactController@store — Mail queue failed', [
                'error'      => $e->getMessage(),
                'contact_id' => $contact->id,
            ]);
        }

        Log::info('New contact message received', [
            'id'      => $contact->id,
            'subject' => $contact->subject,
            'ip'      => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Your message has been sent successfully. We will get back to you within 24 hours.',
            'data'    => [
                'id'         => $contact->id,
                'created_at' => $contact->created_at->toISOString(),
            ],
        ], 201);
    }
}
