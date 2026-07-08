FROM php:8.3-cli

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    zip \
    libzip-dev \
    libpq-dev \
    libxml2-dev \
    libonig-dev \
    libgmp-dev \
    libicu-dev \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install \
    bcmath \
    pdo \
    pdo_pgsql \
    mbstring \
    xml \
    zip \
    sockets \
    gmp \
    intl \
    opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

RUN npm install && npm run build

RUN chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD php artisan storage:link && \
    php artisan optimize && \
    php artisan serve --host=0.0.0.0 --port=$PORT
