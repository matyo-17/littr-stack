<?php

namespace App\Http\Controllers\Auth;

use App\DTO\UserDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function __construct(
        private UserService $user_service
    ) {}

    public function index(Request $request): Response {
        return Inertia::render('auth/register');
    }

    public function store(RegisterRequest $request): RedirectResponse {
        $dto = UserDto::fromRequest($request);

        $user = $this->user_service->create($dto);
        Auth::login($user);

        return redirect()->intended(route('verification.notice'))
                    ->with('status', 'verification-link-sent');
    }
}
