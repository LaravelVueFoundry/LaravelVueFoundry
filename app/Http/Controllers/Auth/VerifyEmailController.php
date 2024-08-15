<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller {
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse {
        $locale = $request->getLocale();

        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route(
                'profile.view',
                ['lang' => $locale, 'verified' => 1],
                false,
            ));
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route(
            'profile.view',
            ['lang' => $locale, 'verified' => 1],
            false,
        ));
    }
}
