FROM php:8.4-apache

# Installer les extensions nécessaires pour Laravel & MySQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installer les drivers MySQL d-dabt lli m-khbblin lik l-omour
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Activer mod_rewrite dial Apache pour Laravel
RUN a2enmod rewrite

# Bddel l-DocumentRoot dial Apache l /public dial Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Copier l-code dial l-projet
WORKDIR /var/www/html
COPY . .

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Permissions dial Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
