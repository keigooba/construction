cp .env.example .env
composer install
composer selfupdate
touch /var/www/construction/storage/logs/laravel.log
chmod -R 777 /var/www/construction/storage
chmod -R 777 /var/www/construction/bootstrap
php artisan key:generate
php artisan migrate
php artisan db:seed
