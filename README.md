# Task Manager - Full Stack Application

A modern full-stack web application built with **Spring Boot** backend and **Angular 17** frontend. Manage your tasks efficiently with a clean and intuitive interface.

## Technology Stack

### Backend
- **Framework:** Spring Boot 4.0.1
- **Language:** Java 17
- **Build Tool:** Maven
- **API:** RESTful API with Spring Web MVC

### Frontend
- **Framework:** Angular 17
- **Language:** TypeScript 5.2
- **Styling:** SCSS
- **HTTP Client:** Angular HttpClient
- **Package Manager:** npm

---

## Prerequisites

### Required
- **Java Development Kit (JDK) 17** or later - [Download](https://www.oracle.com/java/technologies/downloads/#java17)
- **Apache Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** and **npm** - [Download](https://nodejs.org/)
- **Git** (optional, for version control)

### Verify Installation
```bash
java -version          # Should show Java 17+
mvn -version          # Should show Maven 3.8+
node --version        # Should show Node.js 18+
npm --version         # Should show npm 9+
```

---

## Project Structure

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── DemoApplication.java
│   │   │       ├── controller/
│   │   │       │   └── TaskController.java
│   │   │       ├── model/
│   │   │       │   └── Task.java
│   │   │       ├── service/
│   │   │       │   └── TaskService.java
│   │   │       └── config/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           └── [Angular Frontend Files]
│   └── test/
│       └── java/
│           └── DemoApplicationTests.java
├── pom.xml                 # Maven configuration
├── mvnw / mvnw.cmd        # Maven Wrapper
├── Dockerfile              # Docker configuration
├── Jenkinsfile            # CI/CD pipeline
├── HELP.md                # Spring Boot documentation
└── README.md              # This file
```

---

## Quick Start (Development Mode)

### 1. Start Spring Boot Backend

#### Option A: Using Maven
```bash
mvn spring-boot:run
```

#### Option B: Using IDE
- Open the project in IntelliJ IDEA or Eclipse
- Right-click `DemoApplication.java`
- Click "Run" or press `Shift + F10`

The backend will start on `http://localhost:8080`

### 2. Start Angular Frontend

In a **new terminal** window:
```bash
cd src/main/resources/static
npm install          # First time only
npm start
```

The frontend will start on `http://localhost:4200`

### 3. Open in Browser
```
http://localhost:4200
```

You should see the Task Manager interface!

---

## Development Workflow

### Frontend Development

**Navigate to frontend directory:**
```bash
cd src/main/resources/static
```

**Available Commands:**
```bash
npm start                    # Start dev server with hot reload
npm run build               # Build for development
npm run build:prod          # Build for production
npm run watch               # Watch and rebuild on changes
npm test                    # Run unit tests
npm run ng -- --help        # View all Angular CLI options
```

**Key Features:**
- ✅ Hot module reloading (changes refresh automatically)
- ✅ Proxy to backend API (`/api` → `localhost:8080`)
- ✅ Source maps for debugging
- ✅ TypeScript strict mode enabled

**See:** [Frontend Setup Guide](src/main/resources/static/ANGULAR_SETUP.md)

### Backend Development

**Available Maven Commands:**
```bash
mvn clean install           # Clean and build entire project
mvn spring-boot:run         # Run Spring Boot application
mvn test                    # Run backend unit tests
mvn clean                   # Clean build artifacts
mvn compile                 # Compile Java source code
```

---

## Building for Production

### Frontend Build
```bash
cd src/main/resources/static
npm run build:prod
```

Output: `target/classes/static/` (served by Spring Boot)

### Full Project Build (Maven)
```bash
mvn clean install
```

This will:
1. ✅ Compile Java code
2. ✅ Build Angular frontend (if Maven plugin configured)
3. ✅ Package everything into a JAR file
4. ✅ Output: `target/demo-0.0.1-SNAPSHOT.jar`

### Run Production JAR
```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

Open `http://localhost:8080` in your browser

---

## API Documentation

### Base URL
```
http://localhost:8080/api/tasks
```

### Endpoints

#### Get All Tasks
```http
GET /api/tasks
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Buy groceries"
  },
  {
    "id": 2,
    "name": "Complete project"
  }
]
```

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

"Learn Angular"
```
**Response:**
```json
{
  "id": 3,
  "name": "Learn Angular"
}
```

#### Update Task
```http
PUT /api/tasks/1
Content-Type: application/json

"Buy groceries and cook"
```
**Response:**
```json
{
  "id": 1,
  "name": "Buy groceries and cook"
}
```

#### Delete Task
```http
DELETE /api/tasks/1
```
**Response:** 204 No Content

---

## Architecture

### Backend Architecture
```
TaskController (REST API)
    ↓
TaskService (Business Logic)
    ↓
In-Memory Storage
```

### Frontend Architecture
```
AppComponent (Root)
├── Template (HTML)
├── Styles (SCSS)
└── Logic (TypeScript)
    ├── TaskService (HTTP calls)
    └── Task Model (Data structure)
```

### Communication Flow
```
Browser (Angular)
    ↓
Dev Server (Proxy)
    ↓
Spring Boot API
    ↓
Service Layer
    ↓
Data Storage
```

---

## Debugging

### Frontend Debugging

1. **Open Chrome DevTools:** `F12` or `Ctrl+Shift+I`
2. **Sources Tab:** View TypeScript code (source maps enabled)
3. **Console Tab:** Check for errors and logs
4. **Network Tab:** Monitor API calls to backend

**Browser URL:** `http://localhost:4200`

### Backend Debugging

1. **IDE Debugger:** Set breakpoints in Java code
2. **IntelliJ:** Run → Debug
3. **VS Code:** Install Java Debug extension

**API URL:** `http://localhost:8080/api/tasks`

---

## Proxy Configuration

**File:** `src/main/resources/static/proxy.conf.json`

During development, the Angular dev server (port 4200) proxies API requests to the Spring Boot backend (port 8080):

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

This allows the frontend to call `/api/tasks` without worrying about CORS issues.

---

## Deployment Options

### 1. Docker (Container)
```bash
docker build -t task-manager .
docker run -p 8080:8080 task-manager
```

### 2. Cloud Platforms
- **Heroku:** `git push heroku main`
- **AWS:** Use AWS CodePipeline + Elastic Beanstalk
- **Google Cloud:** Deploy to Cloud Run
- **Azure:** Use App Service

### 3. Traditional Server
1. Build JAR: `mvn clean install`
2. Copy JAR to server
3. Run: `java -jar demo-0.0.1-SNAPSHOT.jar`

---

## Troubleshooting

### Port Already in Use

**Frontend (Port 4200):**
```bash
cd src/main/resources/static
ng serve --port 4201 --proxy-config proxy.conf.json
```

**Backend (Port 8080):**
Edit `src/main/resources/application.properties`:
```properties
server.port=8081
```

### Can't Connect to API

**Checklist:**
- ✅ Spring Boot is running: `curl http://localhost:8080/api/tasks`
- ✅ Frontend proxy config is correct
- ✅ CORS is not blocking (Spring Boot allows all origins)
- ✅ Browser Network tab shows requests

### npm Dependencies Issue
```bash
cd src/main/resources/static
rm -rf node_modules package-lock.json
npm install
```

### Maven Build Failure
```bash
mvn clean install -X  # Verbose output
mvn dependency:resolve
```

---

## Features

- ✅ **Add Tasks:** Create new tasks with a simple form
- ✅ **View Tasks:** Display all tasks in a clean list
- ✅ **Edit Tasks:** Click to inline edit task names
- ✅ **Delete Tasks:** Remove tasks with confirmation
- ✅ **Error Handling:** User-friendly error messages
- ✅ **Loading States:** Visual feedback during operations
- ✅ **Responsive Design:** Works on desktop and tablet
- ✅ **Type Safety:** Full TypeScript support

---

## Next Steps

1. **Clone/Setup:** Ensure all prerequisites are installed
2. **Backend:** Start Spring Boot with `mvn spring-boot:run`
3. **Frontend:** Start Angular with `npm start`
4. **Test:** Open `http://localhost:4200` and try the app
5. **Develop:** Make changes and see hot reload
6. **Build:** Run `mvn clean install` for production

---

## Additional Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Maven Documentation](https://maven.apache.org/guides/)

### Frontend Setup
See [ANGULAR_SETUP.md](src/main/resources/static/ANGULAR_SETUP.md) for detailed frontend configuration and architecture.

### Learning Resources
- [Angular Official Tutorial](https://angular.io/tutorial)
- [Spring Boot Guides](https://spring.io/guides)
- [RESTful API Best Practices](https://restfulapi.net/)

---

## License

This project is provided as-is for educational purposes.

---

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser DevTools console for errors
3. Check Spring Boot logs in terminal
4. Verify all prerequisites are installed

---

**Happy Coding!** 🚀