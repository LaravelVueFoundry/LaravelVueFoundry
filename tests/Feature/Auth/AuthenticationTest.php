<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase {
    use RefreshDatabase;

    public function testLoginScreenCanBeRendered(): void {
        $response = $this->get(route('login', ['lang' => 'en']));

        $response->assertStatus(200);
    }

    public function testUsersCanAuthenticateUsingTheLoginScreen(): void {
        $user = User::factory()->create();

        $response = $this->post(route('login', ['lang' => 'en']), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route(
            'dashboard',
            ['lang' => 'en'],
            false,
        ));
    }

    public function testUsersCanNotAuthenticateWithInvalidPassword(): void {
        $user = User::factory()->create();

        $this->post(route('login', ['lang' => 'en']), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function testUsersCanLogout(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('logout', ['lang' => 'en']));

        $this->assertGuest();
        $response->assertRedirect(route('home', ['lang' => 'en']));
    }
}
