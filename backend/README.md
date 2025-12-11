# E-Commerce Backend Setup Guide

Follow these steps to set up the backend on a new system.

## Prerequisites
- PHP 8.2 or higher
- Composer
- SQLite (default) or MySQL

## Installation Steps

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install PHP Dependencies**:
    ```bash
    composer install
    ```

3.  **Environment Configuration**:
    Copy the example environment file and configure it.
    ```bash
    cp .env.example .env
    ```
    *If you are using SQLite (default), the `.env` is already configured for it. If using MySQL, update `DB_CONNECTION`, `DB_DATABASE`, etc., in the `.env` file.*

4.  **Generate Application Key**:
    ```bash
    php artisan key:generate
    ```

5.  **Setup Database**:
    Run the migrations and seed the database with initial data (Products and Admin Account).
    ```bash
    php artisan migrate:fresh --seed
    ```
    *This command creates all tables and restores all default products and the admin user.*

6.  **Admin Credentials**:
    After seeding, use the following credentials to log in to the Admin Panel:
    - **Email**: `admin@example.com`
    - **Password**: `password`

7.  **Start the Server**:
    ```bash
    php artisan serve
    ```
    The API will be available at `http://localhost:8000`.

## Important Note on Images
All product images are stored in `public/images/`. The application logic automatically serves these images. Ensure the `public/images` folder contains the product assets (p1_product.png, etc.). If you cloned this repository, they should already be there.

## Troubleshooting
-   **Images not loading?** Ensure you are running `php artisan serve` inside the `backend` folder.
-   **Database error?** Ensure your database server is running (if using MySQL) or that the `database/database.sqlite` file exists (create it using `touch database/database.sqlite` if missing and using SQLite).
