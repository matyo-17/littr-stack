<?php

namespace App\DTO;

use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Settings\UpdatePasswordRequest;
use App\Http\Requests\Settings\UpdateProfileRequest;
use App\Http\Requests\Management\UserRequest;

final class UserDto {
    public function __construct(
        public ?string $name,
        public ?string $email,
        public ?string $password,
        public ?string $avatar,
        public array $roles,
    ) {}

    public static function fromRequest(
        RegisterRequest|UpdateProfileRequest|UpdatePasswordRequest|UserRequest $request
    ): self {
        $validated = $request->validated();

        return new self(
            name: $validated['name'] ?? null,
            email: $validated['email'] ?? null,
            password: $validated['password'] ?? null,
            avatar: null,
            roles: $validated['roles'] ?? [],
        );
    }
}
