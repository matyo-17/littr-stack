<?php

namespace App\DTO;

use App\Http\Requests\Management\PermissionRequest;

final class PermissionDto {
    public function __construct(
        public string $name,
        public ?string $group
    ) {}

    public static function fromRequest(PermissionRequest $request): self {
        $validated = $request->validated();

        return new self(
            name: $validated['name'],
            group: $validated['group'],
        );
    }
}
