# RBAC (VRV)

## Description

This is a full-stack Role-Based Access Control (RBAC) application that allows administrators to manage user roles and permissions in a web application. The project consists of both a **backend server** (Node.js, Express) and a **frontend UI** built with a modern frontend framework (e.g., React). This solution ensures secure management of users' access levels within a web application.

## Features

- **Role-Based Access Control (RBAC)**: Manage user roles and permissions effectively.
- **Frontend Interface**: A web UI to manage users, roles, and permissions.
- **Backend API**: Built with Express.js to handle authentication, authorization, and role management.
- **Environment Variables**: Sensitive data management using `.env` files.
- **Database Integration**: MongoDB used for storing users and roles.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment for the backend.
- **Express.js**: Web framework to build the RESTful API.
- **MongoDB**: NoSQL database for storing user and role data.
- **Mongoose**: MongoDB ODM for object data modeling.
- **dotenv**: Loads environment variables from a `.env` file.
- **JWT**: JSON Web Tokens for secure user authentication and session management.

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **TAILWINDCSS**: Styling the frontend interface.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/PRASHANTKUMAR0107/rbac_vrv.git
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