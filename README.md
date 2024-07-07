# Tournament Registration API

This project is a backend application for managing user registrations and team registrations for an online tournament. It is built using Express, TypeScript, Mongoose, Zod for validation, and JWT for authentication.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
    - [Register User](#register-user)
    - [Login User](#login-user)
  - [Tournament Routes](#tournament-routes)
    - [Register Team](#register-team)
- [Environment Variables](#environment-variables)

## Installation

1. **Clone the repository:**
~
    ```bash
    git clone https://github.com/yourusername/tournament-registration.git
    cd tournament-registration
    ```

2. **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```

## Running the Application

1. **Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:**

    ```env
    MONGO_URI=mongodb://mongo:27017/tournament
    JWT_SECRET=your_jwt_secret
    ```

2. **Start the application using Docker Compose:**

    ```bash
    docker-compose up --build
    ```

The application will be available at `http://localhost:3000`.

## API Documentation

### Authentication Routes

#### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**

    ```json
    {
      "username": "user123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "confirmPassword": "password123"
    }
    ```

- **Success Response:**

  - **Status:** `201 Created`
  - **Body:**

    ```json
    {
      "message": "User registered successfully",
      "data": {
        "_id": "60d21baee7d4b92f0c3d0bce",
        "username": "user123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "__v": 0
      }
    }
    ```

- **Error Response:**

  - **Status:** `400 Bad Request`
  - **Body (Validation Error):**

    ```json
    {
      "message": "Validation error",
      "errors": [
        {
          "path": ["username"],
          "message": "String must contain at least 6 character(s)"
        },
        {
          "path": ["password"],
          "message": "String must contain at least 8 character(s)"
        }
      ]
    }
    ```

  - **Body (Username Exists):**

    ```json
    {
      "message": "Username already exists"
    }
    ```

#### Login User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Login a user.
- **Request Body:**

    ```json
    {
      "username": "user123",
      "password": "password123"
    }
    ```

- **Success Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    {
      "token": "jwt_token_here"
    }
    ```

- **Error Response:**

  - **Status:** `400 Bad Request`
  - **Body (Validation Error):**

    ```json
    {
      "message": "Validation error",
      "errors": [
        {
          "path": ["username"],
          "message": "String must contain at least 6 character(s)"
        },
        {
          "path": ["password"],
          "message": "String must contain at least 8 character(s)"
        }
      ]
    }
    ```

  - **Body (Invalid Credentials):**

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Tournament Routes

#### Register Team

- **URL:** `/api/team/register`
- **Method:** `POST`
- **Description:** Register a new team. Requires authentication.
- **Request Body:**

    ```json
    {
      "teamName": "Team123",
      "members": [
        {
          "name": "Alice Smith",
          "phone": "1234567890",
          "gender": "Woman"
        },
        {
          "name": "Bob Johnson",
          "phone": "0987654321",
          "gender": "Man"
        }
      ]
    }
    ```

- **Success Response:**

  - **Status:** `201 Created`
  - **Body:**

    ```json
    {
      "message": "Team registered successfully",
      "data": {
        "_id": "60d21baee7d4b92f0c3d0bce",
        "teamName": "Team123",
        "members": [
          {
            "name": "Alice Smith",
            "phone": "1234567890",
            "gender": "Woman"
          },
          {
            "name": "Bob Johnson",
            "phone": "0987654321",
            "gender": "Man"
          }
        ],
        "__v": 0
      }
    }
    ```

- **Error Response:**

  - **Status:** `400 Bad Request`
  - **Body (Validation Error):**

    ```json
    {
      "message": "Validation error",
      "errors": [
        {
          "path": ["teamName"],
          "message": "String must contain at least 4 character(s)"
        },
        {
          "path": ["members", 0, "name"],
          "message": "Invalid input"
        }
      ]
    }
    ```

  - **Body (Team Name Exists):**

    ```json
    {
      "message": "Team name already exists"
    }
    ```

#### Get Teams

- **URL:** `/api/team`
- **Method:** `GET`
- **Description:** Get a list of registered teams. Requires authentication.
- **Success Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    {
     "message": "Teams fetched successfully",
      "data": [
        {
          "_id": "60d21baee7d4b92f0c3d0bce",
          "teamName": "Team123",
          "members": [
            {
              "name": "Alice Smith",
              "phone": "1234567890",
              "gender": "Woman"
            },
            {
              "name": "Bob Johnson",
              "phone": "0987654321",
              "gender": "Man"
            }
          ],
          "__v": 0
        }
      ]
    }
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
MONGO_URI=mongodb://mongo:27017/tournament
JWT_SECRET=your_jwt_secret
