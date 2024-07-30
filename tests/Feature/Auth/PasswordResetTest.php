<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase {
    use RefreshDatabase;

    public function testResetPasswordLinkScreenCanBeRendered(): void {
        $response = $this->get(route('password.request', ['lang' => 'en']));

        $response->assertStatus(200);
    }

    public function testResetPasswordLinkCanBeRequested(): void {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route(
            'password.email',
            ['lang' => 'en'],
        ), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function testResetPasswordScreenCanBeRendered(): void {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route(
            'password.email',
            ['lang' => 'en'],
        ), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
            $response = $this->get(route(
                'password.store',
                ['lang' => 'en'],
            ).'/'.$notification->token);

            $response->assertStatus(200);

            return true;
        });
    }

    public function testPasswordCanBeResetWithValidToken(): void {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route(
            'password.email',
            ['lang' => 'en'],
        ), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $response = $this->post(route('password.store', ['lang' => 'en']), [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ]);

            $response
                ->assertSessionHasNoErrors()
                ->assertRedirect(route('login', ['lang' => 'en']));

            return true;
        });
    }
}
