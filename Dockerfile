FROM php:8.2-fpm

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
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install PHP extensions
RUN docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for better caching
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress

# Copy npm files first for better caching
COPY package.json package-lock.json ./
RUN npm install && \
    chmod -R 755 node_modules/.bin

# Copy the rest of the application
COPY . /var/www/html

# Fix seeder name mismatch
RUN mv database/seeders/ProvincialSeeder.php database/seeders/ProvinceSeeder.php 2>/dev/null || true

# Create SQLite database
RUN touch database/database.sqlite

# Build assets
RUN npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 10000

# Start PHP server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
