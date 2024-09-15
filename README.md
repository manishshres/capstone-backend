# Capestone Project

## Overview

This project is a web application that connects people in need with food banks and shelters. It provides a platform for users to easily access various services while ensuring that organizations can effectively manage their available resources.

## Features

- User registration and authentication
- Search for nearby food banks and shelters
- Real-time availability status of services
- Service request system
- Donation management
- Volunteer coordination
- Data analytics for service usage and resource distribution

## Technologies Used

### Backend
- Java 17
- Spring Boot 3.3.3
- Spring Security
- MongoDB
- JWT for authentication

### Frontend
- React
- React Router
- Axios for API calls
- Tailwind CSS for styling

## Prerequisites

- Java 17
- Node.js and npm
- MongoDB

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/manishshres/capestone.git
   cd capestone
   ```

2. Backend Setup:
   - Navigate to the backend directory:
     ```
     cd src/main/java
     ```
   - Create a `env.properties` file in the root directory and add your MongoDB URI and JWT secret:
     ```
     MONGODB_URI=your_mongodb_uri
     MONGODB_DATABASE=your_database_name
     JWT_SECRET=your_jwt_secret
     ```
   - Build the project:
     ```
     ./mvnw clean install
     ```

3. Frontend Setup:
   - Navigate to the frontend directory:
     ```
     cd src/main/frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

## Running the Application

1. Start the backend server:
   ```
   ./mvnw spring-boot:run
   ```
   The server will start on `http://localhost:8080`.

2. In a new terminal, start the frontend development server:
   ```
   cd src/main/frontend
   npm start
   ```
   The frontend will be available on `http://localhost:3000`.

## Testing

- To run backend tests:
  ```
  ./mvnw test
  ```

- To run frontend tests:
  ```
  cd src/main/frontend
  npm test
  ```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

