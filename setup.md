

# Task Management Application

This project is a simple task management tool similar to Trello, allowing users to create, read, update, and delete (CRUD) tasks. Users can organize their tasks into columns, drag and drop tasks between columns, and sort tasks based on time or priority. The project is built with React for the frontend and Node.js with MongoDB for the backend.

## 🌟 Features
- **Task Management**: Create, update, delete tasks. 
- **Drag and Drop**: Easily move tasks between different columns.
- **Sorting**: Sort tasks by latest creation time or by priority. 

## 🛠️ Tech Stack
- **Frontend**: Next js
- **Backend**: Express, Node and typescript
- **DB**: Mongo

## 📦 Setup Guide

### Manual Setup
1. **Clone the repository**:
    ```sh
    git clone git clone https://github.com/yourusername/Crework_assign.git
    cd Crework_assign
    ```

2. **Install dependencies for each service**:
    ```sh
    # Server
    cd todo-backend
    npm install

    # Client
    cd todo-frontend
    npm install
    ```

3. **Create a `.env` file** in each folder and configure your environment variables.
    ```env
    # Example Client .env file
	    NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
    # Example Server .env file
	    MONGO_URL = your_mongo_db_connection_string

    ```

5. **Start each service**:
    ```sh
    # Start Server
    cd todo-backend
    npm run start

    # Start Client
    cd todo-frontend
    npm run dev
    ```

### Docker Setup
1. **Navigate to the root directory**:

2. **Build and run the stack of containers**:
    ```sh
    docker-compose up --build
    ```
