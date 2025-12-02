#!/bin/bash
set -e

cd /var/www/html

ROLE=${CONTAINER_ROLE:-app}

if [ "$ROLE" = "app" ]; then
    if [ ! -f vendor/autoload.php ]; then
        echo "Installing composer dependencies..."
        composer install --optimize-autoloader
    fi

    if [ ! -d node_modules ]; then
        echo "Installing npm modules..."
        npm install
    fi

    echo "Optimizing Laravel..."
    php artisan optimize

    echo "Starting Vite dev server..."
    npm run dev -- --host &

    echo "Starting PHP-FPM..."
    exec php-fpm
fi

if [ "$ROLE" = "queue" ]; then
    echo "Starting queue worker..."
    exec php artisan queue:listen
fi

if [ "$ROLE" = "scheduler" ]; then
    echo "Starting scheduler..."
    exec php artisan schedule:work
fi
