<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as EncryptCookiesBase;

class EncryptCookies extends EncryptCookiesBase {
    protected $except = [
        'locale',
    ];
}
