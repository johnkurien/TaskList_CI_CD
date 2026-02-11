# Angular Frontend Setup & Architecture

This project has been converted to use **Angular 17** for the frontend with a modern, component-based architecture.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development](#development)
- [Production Build](#production-build)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Proxy Configuration](#proxy-configuration)

---

## Prerequisites

- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Spring Boot backend** running on `http://localhost:8080`

---

## Quick Start

### 1. Install Dependencies
Navigate to the frontend directory and install npm packages:
```bash
cd src/main/resources/static
npm install
```

### 2. Start Development Server
```bash
npm start
```

This will:
- ✅ Start the Angular dev server on `http://localhost:4200`
- ✅ Proxy API requests to the Spring Boot backend (`http://localhost:8080`)
- ✅ Enable hot module reloading (file changes auto-refresh)
- ✅ Watch for TypeScript compilation errors in real-time

Open your browser to `http://localhost:4200` and you're ready to develop!

---

## Development

### Run Development Server
```bash
npm start
```
- Starts on `http://localhost:4200`
- Supports hot reload on file changes
- Includes source maps for debugging

### Compile TypeScript
```bash
npm run watch
```
- Builds in development mode
- Watches for file changes
- Useful for background compilation

### Run Tests
```bash
npm test
```
- Runs unit tests with Karma
- Watches for file changes
- Opens Chrome for test execution

---

## Production Build

### Build for Production
```bash
npm run build:prod
```

This will:
- ✅ Compile TypeScript to JavaScript
- ✅ Bundle all dependencies
- ✅ Minify and optimize code
- ✅ Output optimized files to `../../../target/classes/static/`
- ✅ Ready to be packaged with the Spring Boot JAR

### Output Location
- **Development build:** `dist/`
- **Production build:** `target/classes/static/` (served by Spring Boot)

---

## Architecture

### Technology Stack
- **Framework:** Angular 17 (Latest)
- **Language:** TypeScript 5.2
- **Styling:** SCSS
- **HTTP Client:** Angular HttpClient
- **Forms:** Reactive Forms with Two-way binding
- **Module System:** Standalone Components (modern Angular approach)

### Design Pattern
- **Component-Based:** Single root component (`AppComponent`)
- **Service-Based:** Centralized API communication (`TaskService`)
- **Reactive:** RxJS Observables for asynchronous operations
- **Type-Safe:** Full TypeScript type checking

---

## Project Structure

```
src/main/resources/static/
├── app/
│   ├── app.component.ts          # Root component logic
│   ├── app.component.html        # Component template
│   ├── app.component.scss        # Component styles
│   ├── models/
│   │   └── task.model.ts         # TypeScript interfaces
│   └── services/
│       └── task.service.ts       # API communication service
├── index.html                    # HTML entry point
├── main.ts                       # Bootstrap file (entry point)
├── styles.scss                   # Global styles
├── angular.json                  # Angular CLI configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TS config
├── package.json                  # Dependencies & scripts
├── proxy.conf.json               # Dev server proxy config
└── .gitignore                    # Git ignore rules
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `main.ts` | Bootstrap Angular application with HttpClient provider |
| `app.component.ts` | Root component - handles task management logic |
| `task.service.ts` | Service for API calls to `/api/tasks` endpoints |
| `task.model.ts` | TypeScript interface for type safety |
| `proxy.conf.json` | Proxy configuration for dev server (routes `/api` to backend) |

---

## API Integration

The Angular app communicates with the Spring Boot backend using HttpClient.

### Endpoints
```
Base URL: http://localhost:8080/api/tasks
```

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update an existing task |
| DELETE | `/api/tasks/{id}` | Delete a task |

### Example Request/Response

**Create Task (POST)**
```javascript
// Request Body
"Buy groceries"

// Response
{
  "id": 1,
  "name": "Buy groceries"
}
```

### Error Handling
The app includes error handling for:
- Network failures
- Invalid requests
- Server errors
- User feedback with error messages

---

## Proxy Configuration

### Development Proxy (`proxy.conf.json`)
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

**Why?** The dev server runs on port 4200, but your API is on port 8080. The proxy redirects all `/api/*` requests to the backend during development.

**Used by:** `npm start` command (configured in `package.json`)

---

## Building with Maven (Optional)

To integrate Angular builds into Maven:

1. Add Frontend Maven Plugin to `pom.xml`:
   ```xml
   <plugin>
     <groupId>com.github.eirslett</groupId>
     <artifactId>frontend-maven-plugin</artifactId>
     <version>1.13.4</version>
     <configuration>
       <workingDirectory>src/main/resources/static</workingDirectory>
     </configuration>
     <executions>
       <execution>
         <id>install node and npm</id>
         <goals>
           <goal>install-node-and-npm</goal>
         </goals>
       </execution>
       <execution>
         <id>npm install</id>
         <goals>
           <goal>npm</goal>
         </goals>
       </execution>
       <execution>
         <id>npm run build</id>
         <goals>
           <goal>npm</goal>
         </goals>
         <configuration>
           <arguments>run build:prod</arguments>
         </configuration>
       </execution>
     </executions>
   </plugin>
   ```

2. Run `mvn clean install` - Maven will automatically build the Angular app and include it in the Spring Boot JAR.

---

## npm Scripts

```json
{
  "start": "ng serve --proxy-config proxy.conf.json",
  "build": "ng build",
  "build:prod": "ng build --configuration production",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server with proxy on port 4200 |
| `npm run build` | Build for development |
| `npm run build:prod` | Build optimized production version |
| `npm run watch` | Watch and rebuild on file changes |
| `npm test` | Run unit tests |

---

## Troubleshooting

### Port 4200 already in use
```bash
ng serve --port 4201 --proxy-config proxy.conf.json
```

### Can't connect to backend API
- Ensure Spring Boot is running on `http://localhost:8080`
- Check proxy configuration in `proxy.conf.json`
- Verify network tab in browser DevTools

### Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
npm run watch
```
Check the terminal for compilation errors.

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start development server: `npm start`
3. ✅ Open browser: `http://localhost:4200`
4. ✅ Test the Task Manager functionality
5. ✅ Make code changes and see hot reload in action

Happy coding! 🚀
