<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase {
    use RefreshDatabase;

    public function testConfirmPasswordScreenCanBeRendered(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route(
            'password.confirm',
            ['lang' => 'en'],
        ));

        $response->assertStatus(200);
    }

    public function testPasswordCanBeConfirmed(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route(
            'password.confirm',
            ['lang' => 'en'],
        ), [
            'password' => 'password',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();
    }

    public function testPasswordIsNotConfirmedWithInvalidPassword(): void {
        /** @var User */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route(
            'password.confirm',
            ['lang' => 'en'],
        ), [
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors();
    }
}
