# Django_template

A Django REST Framework template project with JWT authentication, user registration, profile management, password reset, and more.

## Features

- User registration and login with JWT authentication
- Email verification (optional, code included)
- Password reset via email
- User profile management (view, update, delete)
- Change password endpoint
- Logout with token blacklisting
- CORS support for frontend integration

## Project Structure

## Setup

1. Clone the repository and install dependencies:
    ```sh
    pip install -r server/requirements.txt
    ```

2. Copy `.env.example` to `.env` and update your environment variables.

3. Run migrations:
    ```sh
    python server/manage.py migrate
    ```

4. Create a superuser (optional):
    ```sh
    python server/manage.py createsuperuser
    ```

5. Start the development server:
    ```sh
    python server/manage.py runserver
    ```

## API Endpoints

- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/logout/` - Logout and blacklist refresh token
- `GET/PUT/DELETE /api/auth/profile/` - Manage user profile
- `POST /api/auth/forgot-password/` - Request password reset email
- `POST /api/auth/reset-password/` - Reset password with token
- `POST /api/auth/change-password/` - Change password
- `POST /api/auth/verify_token/` - Verify JWT token
- `POST /api/auth/test/` - Test authenticated endpoint

## Testing with Postman

A Postman collection is provided: Django template.postman_collection.json

## License

This project is licensed under the MIT License.