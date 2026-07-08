<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Ramsey\Uuid\Uuid;

class TokenGeneratorHelper
{
    /**
     * Generate a random alphanumeric token.
     *
     * @param int $length
     * @param string $prefix
     * @param string $suffix
     * @return string
     */
    public static function generateRandom(int $length = 32, string $prefix = '', string $suffix = ''): string
    {
        return $prefix . Str::random($length) . $suffix;
    }

    /**
     * Generate a secure token with specific characters.
     *
     * @param int $length
     * @param bool $useNumbers
     * @param bool $useSymbols
     * @param bool $useUppercase
     * @param bool $useLowercase
     * @return string
     */
    public static function generateSecure(
        int $length = 32,
        bool $useNumbers = true,
        bool $useSymbols = true,
        bool $useUppercase = true,
        bool $useLowercase = true
    ): string {
        $characters = '';

        if ($useLowercase) {
            $characters .= 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($useUppercase) {
            $characters .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ($useNumbers) {
            $characters .= '0123456789';
        }
        if ($useSymbols) {
            $characters .= '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }

        if (empty($characters)) {
            throw new \InvalidArgumentException('At least one character type must be enabled.');
        }

        $token = '';
        $maxIndex = strlen($characters) - 1;

        for ($i = 0; $i < $length; $i++) {
            $token .= $characters[random_int(0, $maxIndex)];
        }

        return $token;
    }

    /**
     * Generate a UUID v4.
     *
     * @param bool $withoutDashes
     * @return string
     */
    public static function generateUuid(bool $withoutDashes = false): string
    {
        $uuid = Uuid::uuid4()->toString();
        return $withoutDashes ? str_replace('-', '', $uuid) : $uuid;
    }

    /**
     * Generate a unique reference number.
     *
     * @param string $prefix
     * @param int $length
     * @param bool $includeTimestamp
     * @return string
     */
    public static function generateReference(string $prefix = 'REF', int $length = 8, bool $includeTimestamp = true): string
    {
        $timestamp = $includeTimestamp ? date('YmdHis') : '';
        $random = Str::upper(Str::random($length));

        return $prefix . $timestamp . $random;
    }

    /**
     * Generate a human-readable token (e.g., for OTP).
     *
     * @param int $length
     * @param bool $onlyNumbers
     * @return string
     */
    public static function generateHumanReadable(int $length = 6, bool $onlyNumbers = false): string
    {
        if ($onlyNumbers) {
            return str_pad((string) random_int(0, pow(10, $length) - 1), $length, '0', STR_PAD_LEFT);
        }

        $characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous characters
        $token = '';
        $maxIndex = strlen($characters) - 1;

        for ($i = 0; $i < $length; $i++) {
            $token .= $characters[random_int(0, $maxIndex)];
        }

        return $token;
    }

    /**
     * Generate an API token.
     *
     * @param string|null $name
     * @param int $length
     * @return array
     */
    public static function generateApiToken(?string $name = null, int $length = 40): array
    {
        $token = Str::random($length);
        $hashedToken = Hash::make($token);

        return [
            'token' => $token,
            'hashed_token' => $hashedToken,
            'name' => $name ?? 'API Token',
            'created_at' => now(),
        ];
    }

    /**
     * Generate a JWT secret.
     *
     * @return string
     */
    public static function generateJwtSecret(): string
    {
        return Str::random(64);
    }

    /**
     * Generate an encrypted token.
     *
     * @param mixed $data
     * @param int $expirationMinutes
     * @return string
     */
    public static function generateEncryptedToken($data, int $expirationMinutes = 60): string
    {
        $payload = [
            'data' => $data,
            'expires_at' => now()->addMinutes($expirationMinutes)->timestamp,
            'created_at' => now()->timestamp,
        ];

        return Crypt::encryptString(json_encode($payload));
    }

    /**
     * Generate a verification token.
     *
     * @param string|int $identifier
     * @param string $type
     * @param int $length
     * @return array
     */
    public static function generateVerificationToken($identifier, string $type = 'email', int $length = 64): array
    {
        $token = static::generateRandom($length);
        $expiresAt = now()->addHours(24);

        return [
            'token' => $token,
            'identifier' => $identifier,
            'type' => $type,
            'expires_at' => $expiresAt,
        ];
    }

    /**
     * Generate an OTP (One-Time Password).
     *
     * @param int $length
     * @param int $expirationMinutes
     * @return array
     */
    public static function generateOtp(int $length = 6, int $expirationMinutes = 10): array
    {
        $otp = static::generateHumanReadable($length, true);

        return [
            'otp' => $otp,
            'expires_at' => now()->addMinutes($expirationMinutes),
        ];
    }

    /**
     * Generate a session token.
     *
     * @param string $sessionId
     * @param array $data
     * @return string
     */
    public static function generateSessionToken(string $sessionId, array $data = []): string
    {
        $payload = array_merge($data, [
            'session_id' => $sessionId,
            'created_at' => now()->timestamp,
        ]);

        return base64_encode(json_encode($payload));
    }

    /**
     * Generate a password reset token.
     *
     * @param string $email
     * @param int $length
     * @return array
     */
    public static function generatePasswordResetToken(string $email, int $length = 64): array
    {
        return [
            'token' => static::generateRandom($length),
            'email' => $email,
            'expires_at' => now()->addMinutes(30),
        ];
    }

    /**
     * Generate a shareable link token.
     *
     * @param array $data
     * @param int $expirationDays
     * @param bool $encrypt
     * @return string
     */
    public static function generateShareableLink(array $data, int $expirationDays = 7, bool $encrypt = true): string
    {
        $payload = array_merge($data, [
            'expires_at' => now()->addDays($expirationDays)->timestamp,
            'created_at' => now()->timestamp,
        ]);

        if ($encrypt) {
            return Crypt::encryptString(json_encode($payload));
        }

        return base64_encode(json_encode($payload));
    }

    /**
     * Generate a unique slug.
     *
     * @param string $string
     * @param int $randomLength
     * @return string
     */
    public static function generateSlug(string $string, int $randomLength = 6): string
    {
        return Str::slug($string) . '-' . static::generateHumanReadable($randomLength);
    }

    /**
     * Generate a tracking number.
     *
     * @param string $prefix
     * @param string $suffix
     * @param int $length
     * @return string
     */
    public static function generateTrackingNumber(string $prefix = 'TRK', string $suffix = '', int $length = 10): string
    {
        $timestamp = date('Ymd');
        $random = static::generateHumanReadable($length, true);

        return $prefix . $timestamp . $random . $suffix;
    }

    /**
     * Generate an invoice number.
     *
     * @param string $prefix
     * @param int $year
     * @param int $month
     * @param int $counter
     * @param int $padding
     * @return string
     */
    public static function generateInvoiceNumber(
        string $prefix = 'INV',
        ?int $year = null,
        ?int $month = null,
        int $counter = 1,
        int $padding = 6
    ): string {
        $year = $year ?? date('Y');
        $month = $month ?? date('m');
        $counterPadded = str_pad((string) $counter, $padding, '0', STR_PAD_LEFT);

        return $prefix . $year . $month . $counterPadded;
    }

    /**
     * Generate a random color code.
     *
     * @param bool $includeHash
     * @return string
     */
    public static function generateColorCode(bool $includeHash = true): string
    {
        $hex = sprintf('#%06X', random_int(0, 0xFFFFFF));
        return $includeHash ? $hex : substr($hex, 1);
    }

    /**
     * Generate a short code for URLs.
     *
     * @param int $length
     * @param string $alphabet
     * @return string
     */
    public static function generateShortCode(int $length = 6, string $alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'): string
    {
        $code = '';
        $maxIndex = strlen($alphabet) - 1;

        for ($i = 0; $i < $length; $i++) {
            $code .= $alphabet[random_int(0, $maxIndex)];
        }

        return $code;
    }

    /**
     * Generate a batch of tokens.
     *
     * @param int $count
     * @param int $length
     * @param string $prefix
     * @return array
     */
    public static function generateBatch(int $count, int $length = 32, string $prefix = ''): array
    {
        $tokens = [];
        for ($i = 0; $i < $count; $i++) {
            $tokens[] = static::generateRandom($length, $prefix);
        }
        return $tokens;
    }

    /**
     * Validate if a token is in the correct format.
     *
     * @param string $token
     * @param int $expectedLength
     * @param string|null $pattern
     * @return bool
     */
    public static function validateToken(string $token, int $expectedLength = 32, ?string $pattern = null): bool
    {
        if (strlen($token) !== $expectedLength) {
            return false;
        }

        if ($pattern && !preg_match($pattern, $token)) {
            return false;
        }

        return true;
    }
}
