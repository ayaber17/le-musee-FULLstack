<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; background: #f9f9f7; color: #1a1a1a; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border: 1px solid #e8e4dc; }
    .header { background: #1a1a1a; padding: 32px 40px; }
    .header h1 { color: #C8A966; font-size: 22px; margin: 0; font-style: italic; font-weight: normal; }
    .body { padding: 40px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 6px; }
    .value { font-size: 15px; color: #1a1a1a; line-height: 1.6; }
    .message-box { background: #fdfbf7; border-left: 3px solid #C8A966; padding: 16px 20px; }
    .footer { padding: 24px 40px; border-top: 1px solid #e8e4dc; font-size: 11px; color: #aaa; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Contact Message — Hotel Le Musée</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value">{{ $contact->name }} &lt;{{ $contact->email }}&gt;</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">{{ $contact->subject }}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-box">{{ $contact->message }}</div>
      </div>
      <div class="field">
        <div class="label">Received at</div>
        <div class="value">{{ $contact->created_at->format('D, d M Y — H:i') }}</div>
      </div>
    </div>
    <div class="footer">
      This email was generated automatically. Reply directly to {{ $contact->email }} to respond.
    </div>
  </div>
</body>
</html> whad l code 
