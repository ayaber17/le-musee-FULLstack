FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    unzip git curl zip \
    libpng-dev libonig-dev libxml2-dev

RUN docker-php-ext-install pdo_mysql mbstring bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY backend/ /app

RUN composer install --no-dev --optimize-autoloader

CMD sh -c "php artisan migrate --force && php -S 0.0.0.0:$PORT -t public"