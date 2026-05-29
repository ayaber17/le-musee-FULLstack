FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    unzip git curl zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY backend/ /app

RUN composer install --no-dev --optimize-autoloader

CMD sh -c "php -S 0.0.0.0:$PORT -t public"