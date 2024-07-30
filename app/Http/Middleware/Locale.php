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

        // Redirect to a localised path, if one is not already present.
        if (!in_array($segment, config('app.locales'))) {
            $segments = $request->segments();
            $fallback = session('locale') ?: config('app.fallback_locale');
            $segments = Arr::prepend($segments, $fallback);

            return redirect()->to(implode('/', $segments));
        }

        // Set the current locale in the session,
        // so URLs without a locale will redirect back to the last used locale.
        session(['locale' => $segment]);
        App::setLocale($segment);

        return $next($request);
    }
}
