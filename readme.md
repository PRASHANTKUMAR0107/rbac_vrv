# RBAC Server

## Description

RBAC Server is a backend application that implements Role-Based Access Control (RBAC) for managing permissions and user roles. This project is designed to provide a secure and efficient way to manage different access levels for users, allowing for better control over resources.

## Features

- **Role-Based Access Control (RBAC)**: Manage different roles and their permissions.
- **Environment Variables**: Configured using `dotenv` for secure management of sensitive data.
- **Express Server**: Built with Express.js for creating RESTful APIs.
- **Database Integration**: Supports MongoDB for storing user and role data.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store user and role data.
- **dotenv**: Used for loading environment variables from `.env` files.
- **Bcrypt.js**: Used for hashing passwords securely.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/rbac-server.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file at the root of your project and add the necessary environment variables:

    ```bash
    MONGO_URI=your-mongo-db-uri
    ```

4. Start the server:

    ```bash
    npm start
    ```

    This will start the server at `http://localhost:5000`.

4. Start the client:

    ```bash
    npm start
    ```
    This will start the server at `http://localhost:3000`.

## Usage

- **Create Roles**: You can define different roles in your system (e.g., Admin, User).
- **Assign Permissions**: Assign different permissions to each role, such as `read`, `write`, or `admin`.
- **Assign Roles to Users**: Users can be assigned specific roles based on their permissions.