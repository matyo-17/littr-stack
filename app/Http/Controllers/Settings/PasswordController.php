<?php

namespace App\Http\Controllers\Settings;

use App\DTO\UserDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdatePasswordRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function __construct(
        private UserService $user_service
    ) {}

    public function edit(Request $request) {
        return Inertia::render('settings/password');
    }

    public function update(UpdatePasswordRequest $request) {
        $user = $request->user();
        $dto = UserDto::fromRequest($request);

        $this->user_service->updatePassword($user, $dto);

        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Password updated!',
        ]);;
    }
}
