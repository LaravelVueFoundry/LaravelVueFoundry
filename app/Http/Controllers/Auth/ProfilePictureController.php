<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Classes\LaravelVueFoundry\Glide;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use League\Flysystem\Filesystem;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use League\Flysystem\Local\LocalFilesystemAdapter;

class ProfilePictureController extends Controller {
    /**
     * Update the user's profile picture.
     */
    public function update(Request $request): RedirectResponse {
        $validated = $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        /** @var \Illuminate\Http\UploadedFile $img */
        $img = $validated['image'];

        $imageName = Str::lower($request->user()->id).'.png';

        $memoryFs = new Filesystem(new InMemoryFilesystemAdapter());
        $img->move($img->getPathName().'.tmp');

        try {
            $glide = Glide::create(
                new Filesystem(new LocalFilesystemAdapter($img->getPathName().'.tmp')),
                $memoryFs,
            );

            $cachePath = $glide->convert(basename($img->getPathName()), [
                'p' => 'avatar',
            ]);

            $imgFs = new Filesystem(new LocalFilesystemAdapter(public_path('avatars')));
            $imgFs->write($imageName, $memoryFs->read($cachePath));
        } catch (\Exception $e) {
            throw $e;
        } finally {
            // Clean up tmp files.
            $tmpFs = new Filesystem(new LocalFilesystemAdapter($img->getPath()));
            $tmpFs->deleteDirectory(basename($img->getPathName().'.tmp'));
        }

        return back();
    }

    /**
     * Delete the user's profile picture.
     */
    public function delete(Request $request): RedirectResponse {
        $imageName = Str::lower($request->user()->id).'.png';
        File::delete(public_path('avatars').'/'.$imageName);

        return back();
    }
}
