FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_sqlite \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first
COPY composer.json composer.lock ./

# Install dependencies without running scripts
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress \
    --no-scripts

# Copy npm files first
COPY package.json package-lock.json ./
RUN npm install && \
    chmod -R 755 node_modules/.bin

# Copy the rest of the application
COPY . /var/www/html

# Fix seeder name mismatch
RUN mv database/seeders/ProvincialSeeder.php database/seeders/ProvinceSeeder.php 2>/dev/null || true

# Create database directory
RUN mkdir -p /var/www/html/database

# Run the post-autoload-dump scripts
RUN composer run-script post-autoload-dump

# Optimize Laravel for production (skip if .env not present yet)
RUN php artisan config:cache || true && \
    php artisan route:cache || true && \
    php artisan view:cache || true && \
    php artisan event:cache || true

# Build assets
RUN npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/node_modules/.bin

EXPOSE 10000

# Create database file and run migrations at startup
CMD ["sh", "-c", "touch /var/www/html/database/database.sqlite && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000"]
