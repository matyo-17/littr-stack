<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureCommands();
        $this->configureModels();
        $this->configureUrl();
    }

    private function configureCommands(): void {
        DB::prohibitDestructiveCommands(app()->isProduction());
    }

    private function configureModels(): void {
        Model::shouldBeStrict();
    }

    private function configureUrl(): void {
        URL::forceHttps(!app()->isLocal());
    }
}
