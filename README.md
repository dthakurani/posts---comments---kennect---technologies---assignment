# Post-Comment Application with Dockerization

## Project Overview

This repository contains a full stack web application that allows users to create posts, add comments to posts, and search for posts with filters. The application also includes user authorization for logging in. The project is structured into separate backend and frontend folders, each with its own Dockerfile for easy containerization. The Docker Compose configuration (docker-compose.yml) allows you to start the application with a single command.

## Backend

### Technologies Used

- Node.js 16.20
- npm 8.19.4
- MongoDB (hosted on Railway)
- Hosted on Render

### Getting Started

1. Clone this repository to your local machine.
2. Navigate to the backend directory.
3. Install the required dependencies using npm:

   ```
   npm install
   ```

4. Create an .env file in the backend directory and set the following environment variables:

- DB_CONNECTING_STRING - MongoDB connection string (you can get this from Railway).
- REFRESH_TOKEN_SECRET - Secret key for JWT refresh token generation.
- ACCESS_TOKEN_SECRET - Secret key for JWT access token generation.
- SERVER_PORT - Port on which the backend server will run.

5. Start the backend server:

   ```
   npm start
   ```

The backend is now up and running.

## API Reference

### Health Check

#### Check Application Health

**Endpoint**: `/api/health`

- **Method**: GET
- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "message": "Application running successfully!"
    }
    ```

The "Health Check" route is used to verify the health status of your application. It can be helpful for monitoring and ensuring that your application is running without issues.

Customize the health check endpoint and response as needed for your specific application. This documentation provides a framework to include this essential part of your API.

### User Management

#### Create a User

**Endpoint**: `/api/user`

- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "securePassword"
  }
  ```

* Response
  - Status: 201 Created
  - Body:
  ```json
  {
    "statusCode": 201,
    "data": {
      "id": "654af4a865a2f60b43723ca9",
      "email": "testing02@gmail.com",
      "name": "Testing",
      "tokens": {
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhZjRhODY1YTJmNjBiNDM3MjNjYTkiLCJpYXQiOjE2OTk0MTExMTIsImV4cCI6MTY5OTQ5NzUxMn0.YCB7YDlSJhu-DCW8EEgBRytfpFmwlQEuzkZG0l6JrYQ",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhZjRhODY1YTJmNjBiNDM3MjNjYTkiLCJpYXQiOjE2OTk0MTExMTIsImV4cCI6MTY5OTQxNDcxMn0.-NX7cApZ3_qEg5pha5U3momWV1yRwFk1SdXxCn1q0sw"
      }
    },
    "message": "Registration successful"
  }
  ```

#### User Login

**Endpoint**: `/api/user/login`

- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword"
  }
  ```

* Response
  - Status: 200 OK
  - Body:
  ```json
  {
    "statusCode": 200,
    "data": {
      "id": "654af4a865a2f60b43723ca9",
      "email": "testing02@gmail.com",
      "name": "Testing",
      "tokens": {
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhZjRhODY1YTJmNjBiNDM3MjNjYTkiLCJpYXQiOjE2OTk0MTExMTIsImV4cCI6MTY5OTQ5NzUxMn0.YCB7YDlSJhu-DCW8EEgBRytfpFmwlQEuzkZG0l6JrYQ",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhZjRhODY1YTJmNjBiNDM3MjNjYTkiLCJpYXQiOjE2OTk0MTExMTIsImV4cCI6MTY5OTQxNDcxMn0.-NX7cApZ3_qEg5pha5U3momWV1yRwFk1SdXxCn1q0sw"
      }
    },
    "message": "OK"
  }
  ```

#### Generate Access Token

**Endpoint**: `/api/user/generate-access-token`

- **Method**: GET
- **Request Header**:
  - `Authorization` - Refresh token in the format: `Bearer <refresh-token>`
- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "statusCode": 200,
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhMWM5NmUzMjU0NmU2YzI2YmFkNzgiLCJpYXQiOjE2OTk0MTE0NTMsImV4cCI6MTY5OTQxNTA1M30.ggddOpKJ0oIh1W16TrTeN1Y3WWZY1po2c8HCfxKZy94"
      },
      "message": "OK"
    }
    ```

### Posts

#### Create a Post

**Endpoint**: `/api/post`

- **Method**: POST
- **Request Header**:
  - `Authorization` - Access token in the format: `Bearer <access-token>`
- **Request Body**:

  ```json
  {
    "title": "Your Post Title",
    "content": "Your Post Content"
  }
  ```

- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "statusCode": 200,
      "data": {
        "userId": "654a1c96e32546e6c26bad78",
        "title": "Your Post Title",
        "content": "Your Post Content",
        "_id": "654af6ee65a2f60b43723cb6",
        "comments": [],
        "createdAt": "2023-11-08T02:48:14.441Z",
        "updatedAt": "2023-11-08T02:48:14.441Z",
        "__v": 0
      },
      "message": "OK"
    }
    ```

#### Add a Comment to a Post

**Endpoint**: `/api/post/:id/comment`

- **Method**: POST
- **Request Header**:
  - `Authorization` - Access token in the format: `Bearer <access-token>`
- **Request Body**:

  ```json
  {
    "content": "Your Post Content"
  }
  ```

- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "statusCode": 200,
      "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
      },
      "message": "OK"
    }
    ```

#### Get Specific Post Details

**Endpoint**: `/api/post/:id`

- **Method**: GET
- **Request Header**:

  - `Authorization` - Access token in the format: `Bearer <access-token>`

- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "statusCode": 200,
      "data": {
        "_id": "654af6ee65a2f60b43723cb6",
        "userId": {
          "_id": "654a1c96e32546e6c26bad78",
          "name": "Divyanshi Thakurani"
        },
        "title": "Your Post Title",
        "content": "Your Post Content",
        "comments": [
          {
            "userId": {
              "_id": "654a1c96e32546e6c26bad78",
              "name": "Divyanshi Thakurani"
            },
            "content": "Finance",
            "_id": "654af75d65a2f60b43723cbc",
            "createdAt": "2023-11-08T02:50:05.993Z",
            "updatedAt": "2023-11-08T02:50:05.993Z"
          }
        ],
        "createdAt": "2023-11-08T02:48:14.441Z",
        "updatedAt": "2023-11-08T02:50:05.993Z",
        "__v": 0
      },
      "message": "OK"
    }
    ```

#### Get All Posts with Filters

**Endpoint**: `/api/post`

- **Method**: GET
- **Request Header**:

  - `Authorization` - Access token in the format: `Bearer <access-token>`

- **Query Parameters**:

  - page (default: 1) - Page number.
  - limit (default: 10) - Number of items per page.
  - sortBy (default: 'createdAt') - Sort by field ('createdAt', 'title').
  - sortOrder (default: 'asc') - Sort order ('asc', 'desc').
  - type - Type of content ('posts', 'comments').
  - userPost - Set to true to get only posts of the logged-in user.
  - searchQuery - Search query string for filtering posts and comments.

- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "statusCode": 200,
      "data": {
        "posts": [
          {
            "_id": "654af6ee65a2f60b43723cb6",
            "userId": {
              "_id": "654a1c96e32546e6c26bad78",
              "name": "Divyanshi Thakurani"
            },
            "title": "Your Post Title",
            "createdAt": "2023-11-08T02:48:14.441Z"
          },
          {
            "_id": "654af6be65a2f60b43723cb2",
            "userId": {
              "_id": "654a1c96e32546e6c26bad78",
              "name": "Divyanshi Thakurani"
            },
            "title": "A Comprehenive Guide to Finance Management",
            "createdAt": "2023-11-08T02:47:26.981Z"
          },
          {
            "_id": "654a7e76cb6c54f5f1ad1680",
            "userId": {
              "_id": "654a1c96e32546e6c26bad78",
              "name": "Divyanshi Thakurani"
            },
            "title": "A Comprehensive Guide to Finance Management",
            "createdAt": "2023-11-07T18:14:14.575Z"
          }
        ],
        "total": 3
      },
      "message": "OK"
    }
    ```

## Frontend

### Technologies Used

- React
- Ant Design
- Tailwind CSS
- Hosted on Vercel

### Getting Started

1. Navigate to the frontend directory.
2. Install the required dependencies using npm:

```
npm install
```

3. Create an .env file in the frontend directory and set the following environment variables:

- VITE_BASE_URL - The URL of the backend API.

4. Start the frontend application:

```
npm run dev
```

The frontend is now running and can be accessed in your browser.

## Dockerization

The project includes Dockerfiles for both the backend and frontend, allowing you to containerize each component separately. You can build the Docker images and run the application using the provided docker-compose.yml.

To build and start the Docker containers, run the following command in the root directory:

```
docker-compose up
```

## Hosted URLs and Database Connection

### Backend Hosted on Render

- **URL**: [https://post-comments-backend.onrender.com/](https://post-comments-backend.onrender.com)

### Frontend Hosted on Vercel

- **URL**: [https://posts-comments-frontend-divyanshi-thakuranis-projects.vercel.app/](https://posts-comments-frontend-divyanshi-thakuranis-projects.vercel.app/)

### MongoDB Connection (Hosted on Railway)

- **Connection String**: [mongodb://mongo:DBH1hgF6ah5B6FFf3CGCdfc2Ch-2c-HE@roundhouse.proxy.rlwy.net:31117](mongodb://mongo:DBH1hgF6ah5B6FFf3CGCdfc2Ch-2c-HE@roundhouse.proxy.rlwy.net:31117)
