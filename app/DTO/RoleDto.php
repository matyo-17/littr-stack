<?php

namespace App\DTO;

use App\Http\Requests\Management\RoleRequest;

final class RoleDto {
    public function __construct(
        public string $name,
        public array $permissions,
    ) {}

    public static function fromRequest(RoleRequest $request): self {
        $validated = $request->validated();

        return new self(
            name: $validated['name'],
            permissions: $validated['permissions'] ?? [],
        );
    }
}