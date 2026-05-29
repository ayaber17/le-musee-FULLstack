FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    zip

# install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# copy Laravel backend
COPY backend/ /app

# install dependencies
RUN composer install --no-dev --optimize-autoloader

# run server (IMPORTANT FIX)
CMD ["sh", "-c", "php -S 0.0.0.0:$PORT -t public"]