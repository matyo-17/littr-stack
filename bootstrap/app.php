<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $error_code = $response->getStatusCode();
            
            if ($response->getStatusCode() === 419) {
                return back()->with('toast', [
                    'status' => 'error',
                    'message' => 'The page expired, please try again.',
                ]);
            }

            if (!app()->isLocal() && in_array($error_code, [500, 503, 404, 403])) {
                return Inertia::render('error', ['status' => $error_code])
                            ->toResponse($request)
                            ->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();
