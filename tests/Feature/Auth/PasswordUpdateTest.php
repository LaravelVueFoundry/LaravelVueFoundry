<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PasswordUpdateTest extends TestCase {
    use RefreshDatabase;

    public function testPasswordCanBeUpdated(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('profile.edit', ['lang' => 'en']))
            ->put(route('password.update', ['lang' => 'en']), [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit', ['lang' => 'en']));

        $this->assertTrue(Hash::check('new-password', $user->refresh()->password));
    }

    public function testCorrectPasswordMustBeProvidedToUpdatePassword(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('profile.edit', ['lang' => 'en']))
            ->put(route('password.update', ['lang' => 'en']), [
                'current_password' => 'wrong-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertSessionHasErrors('current_password')
            ->assertRedirect(route('profile.edit', ['lang' => 'en']));
    }
}
