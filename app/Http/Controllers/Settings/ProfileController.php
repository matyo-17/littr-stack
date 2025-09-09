<?php

namespace App\Http\Controllers\Settings;

use App\DTO\UserDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(
        private UserService $user_service
    ) {}

    public function edit(Request $request): Response {
        return Inertia::render('settings/profile');
    }

    public function update(UpdateProfileRequest $request): RedirectResponse {
        $user = $request->user();
        $dto = UserDto::fromRequest($request);

        $dto->avatar = $this->user_service->saveAvatar($user, $request->file('avatar'));

        $this->user_service->updateProfile($user, $dto);

        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Profile updated!',
        ]);
    }
}
