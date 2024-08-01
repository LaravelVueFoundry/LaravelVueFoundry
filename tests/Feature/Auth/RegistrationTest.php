<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase {
    use RefreshDatabase;

    public function testRegistrationScreenCanBeRendered(): void {
        $response = $this->get(route('register', ['lang' => 'en']));

        $response->assertStatus(200);
    }

    public function testNewUsersCanRegister(): void {
        $response = $this->post(route('register.post', ['lang' => 'en']), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route(
            'dashboard',
            ['lang' => 'en'],
            false,
        ));
    }
}
