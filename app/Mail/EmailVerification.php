<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Utils\JWT;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;
    protected $token = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.emailVerification')->with([
            'link' => rtrim(config('app.url'), '/') . '/verify_email/' . $this->token
        ]);
    }
}
