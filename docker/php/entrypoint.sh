#!/bin/bash
set -e

cd /var/www/html

if [ ! -f vendor/autoload.php ]; then
    echo "Installing composer dependencies..."
    composer install --optimize-autoloader
fi

if [ ! -d node_modules ]; then
    echo "Installing npm modules..."
    npm install
fi

php artisan optimize

npm run dev -- --host &

exec php-fpm
