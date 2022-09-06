<?php

namespace App\Utils;

use \Illuminate\Encryption\Encrypter;

class Crypt implements iEncrypt
{
    protected function getEncrypter()
    {
        return new Encrypter(config('app.jwt_key'), 'aes-256-cbc');
    }

    public static function encrypt(array $payload)
    {
        $encrypt = (new self)->getEncrypter();
        $payload = json_encode($payload);
        return $encrypt->encrypt($payload);
    }

    public static function decrypt(String $payload)
    {
        $encrypt = (new self)->getEncrypter();
        $data = $encrypt->decrypt($payload);
        return json_decode($data);
    }
}

interface iEncrypt
{
    public static function encrypt(array $payload);

    public static function decrypt(String $payload);
}
