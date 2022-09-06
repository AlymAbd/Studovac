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
    public function __construct($email, $pincode)
    {
        $jwt = JWT::toJwt(['email' => $email, 'pin' => $pincode]);
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.emailVerification')->with(['token' => $this->token]);
    }
}
