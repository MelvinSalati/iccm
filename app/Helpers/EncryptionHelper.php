<?php

namespace App\Helpers;

class EncryptionHelper
{
    private const KEY = '12345678901234567890123456789012';
    private const IV = '1234567890123456';

    public static function decryptId(string $encrypted): int
    {
        $decrypted = openssl_decrypt(
            urldecode($encrypted),
            'AES-256-CBC',
            self::KEY,
            0,
            self::IV
        );

        if ($decrypted === false) {
            abort(404, 'Invalid facility identifier.');
        }

        return (int) $decrypted;
    }
}
