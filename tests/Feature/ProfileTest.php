<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase {
    use RefreshDatabase;

    public function testProfilePageIsDisplayed(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('profile.edit', ['lang' => 'en']));

        $response->assertOk();
    }

    public function testProfileInformationCanBeUpdated(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch(route('profile.update', ['lang' => 'en']), [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit', ['lang' => 'en']));

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function testEmailVerificationStatusIsUnchangedWhenTheEmailAddressIsUnchanged(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch(route('profile.update', ['lang' => 'en']), [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit', ['lang' => 'en']));

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function testUserCanDeleteTheirAccount(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete(route('profile.destroy', ['lang' => 'en']), [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('home', ['lang' => 'en']));

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function testCorrectPasswordMustBeProvidedToDeleteAccount(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('profile.edit', ['lang' => 'en']))
            ->delete(route('profile.destroy', ['lang' => 'en']), [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect(route('profile.edit', ['lang' => 'en']));

        $this->assertNotNull($user->fresh());
    }
}
