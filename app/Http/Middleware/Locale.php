<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;

class Locale {
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, \Closure $next) {
        // Only check for the locale on GET requests.
        if ('GET' !== $request->method()) {
            return $next($request);
        }

        $segment = $request->segment(1);

        $cookie = cookie('locale', $segment, strtotime('+1 year'));

        // Redirect to a localised path, if one is not already present.
        if (!in_array($segment, array_keys(config('app.locales')))) {
            $segments = $request->segments();
            $fallback = $request->cookie('locale') ?: config('app.fallback_locale');
            $segments = Arr::prepend($segments, $fallback);

            return redirect()->to(implode('/', $segments))->withCookie($cookie);
        }

        App::setLocale($segment);

        return $next($request)->withCookie($cookie);
    }
}
