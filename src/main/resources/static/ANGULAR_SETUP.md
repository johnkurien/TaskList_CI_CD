# Angular Frontend Setup

This project has been converted to use Angular for the frontend.

## Prerequisites

- Node.js (v18 or later)
- npm (comes with Node.js)

## Installation & Setup

1. Navigate to the frontend directory:
   ```bash
   cd src/main/resources/static
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the Angular application:
   ```bash
   npm run build:prod
   ```
   
   This will output the compiled Angular application to `target/classes/static/`

4. Alternatively, for development with hot reload, you can run:
   ```bash
   npm start
   ```
   
   This starts the Angular development server on `http://localhost:4200`

## How it works

- The Angular application is a standalone Bootstrap application using Angular 17
- Main application component: `app/app.component.ts`
- Services: `app/services/task.service.ts` handles API calls
- Models: `app/models/task.model.ts` defines the Task interface
- Styles: `styles.scss` contains the main stylesheet

## Building with Maven

To build the entire project including the Angular frontend with Maven:

1. Ensure Node.js and npm are installed on your system
2. Update your `pom.xml` to include the Frontend Maven Plugin that will:
   - Install Node.js and npm automatically
   - Run `npm install` in the static directory
   - Build the Angular app during the Maven build process

## API Integration

The Angular app communicates with the Spring Boot backend at `/api/tasks` with the following endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
