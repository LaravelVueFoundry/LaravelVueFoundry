<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProfilePictureController extends Controller {
    /**
     * Update the user's profile picture.
     */
    public function update(Request $request): RedirectResponse {
        $validated = $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        $imageName = Str::lower($request->user()->id).'.'.$request->image->extension();
        $request->image->move(public_path('avatars'), $imageName);

        return back();
    }
}
