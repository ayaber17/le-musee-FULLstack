FROM php:8.4-cli
# install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    zip

# install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# copy backend (Laravel)
COPY backend/ /app

# install php dependencies
RUN composer install --no-dev --optimize-autoloader

# expose port (Railway uses $PORT)
CMD php artisan serve --host=0.0.0.0 --port=$PORT