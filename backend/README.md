# Payment App Backend

This is the backend server for the Payment App. It provides various API endpoints for account management, user authentication, and user interaction. The server is built with Node.js and Express. The password's are hashed with the use of a cryptographic hashing algorithm called argon2. I have used zod for input validation. I have used transactions in MongoDB to transfer the moeny from one user to another.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elloWorld101/Payment_App
   cd Payment_App\backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add the necessary environment variables:

```plaintext
PORT= your_port
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Running the Server

To start the server, use the following command:

```bash
node index.js
```

The server will be running on \`http://localhost:PORT`.

## API Endpoints

### Authentication Routes

#### POST /user/signup

- Description: Sign up a new user.
- Request Body:
  ```json
  {
    "firstname": "john",
    "lastname": "doe",
    "username": "johndoe@example.com",
    "password": "123456"
  }
  ```

#### POST /user/signin

- Description: Sign in an existing user.
- Request Body:
  ```json
  {
    "username": "johndoe@example.com",
    "password": "123456"
  }
  ```

### Account Routes

#### GET /account/balance

- Description: Get the current balance of the authenticated user.
- Headers: \`Authorization: Bearer <token>\`

#### POST /account/transfer

- Description: Transfer balance to another user.
- Headers: \`Authorization: Bearer <token>\`
- Request Body:
  ```json
  {
    "to": "userId",
    "amount": 100
  }
  ```

### User Routes

#### PUT /user/update

- Description: Update the credentials of the authenticated user. It is optional, a user can update all or any one or two fields.
- Headers: \`Authorization: Bearer <token>\`
- Request Body:
  ```json
  {
    "firstname": "john",
    "lastname": "doe",
    "password": "newpassword"
  }
  ```

#### GET /user/users

- Description: Search for a friend.
- Headers: \`Authorization: Bearer <token>\`

#### GET /user/me

- Description: Checks if the user is already signed up or not.

## Middleware

### User Middleware and Account Middleware

The \`user\` and \`account`\ middlewares are used to protect routes that require authentication. It verifies the JWT token provided in the request headers.

## Contributing

Feel free to open issues or submit pull requests if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
