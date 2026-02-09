# ListenUp English Project Overview

This is a full-stack project named "ListenUp English", designed to be an English learning application. It follows a monorepo structure, containing separate backend and frontend applications.

## Project Structure

-   `BACKEND/`: Contains the NestJS API.
-   `FRONTEND/`: Contains the React.js application built with Vite.

## Backend Overview

The backend is a RESTful API developed using **NestJS**, **TypeScript**, and **PostgreSQL** with **Prisma ORM**. It handles user management, authentication (JWT), and the core logic for lessons, questions, answers validation, and tracking student progress.

### Backend Technologies

-   Node.js
-   NestJS
-   TypeScript
-   PostgreSQL (via Prisma ORM)
-   JWT for authentication
-   Bcrypt for password hashing
-   Class Validator for data validation

### Backend Installation and Running

1.  **Clone the repository.**
2.  Navigate to the `BACKEND` directory: `cd BACKEND`
3.  Install dependencies: `npm install`
4.  Configure environment variables in a `.env` file (refer to `.env.example`):
    -   `DATABASE_URL`: Connection URL for PostgreSQL.
    -   `JWT_SECRET`: Secret key for JWT.
    -   `JWT_EXPIRES_IN`: JWT expiration time (e.g., `1d`).
5.  Run database migrations: `npx prisma migrate dev`
6.  Generate Prisma client: `npx prisma generate`
7.  Execute data seeding (optional, for initial data): `npm run seed`

**To run the backend:**

-   **Development mode:** `npm run start:dev`
-   **Production mode:** `npm run start`

**Other Backend Commands:**

-   **Build project:** `npm run build`
-   **Run tests:** `npm run test`
-   API Documentation (Swagger) is available at `/api` when the server is running.

## Frontend Overview

The frontend is a single-page application built with **React.js**, **TypeScript**, and **Vite**. It uses **TailwindCSS** for styling, **Axios** for API requests, **React Router DOM** for navigation, and **Zustand** for state management. It interacts with the backend API to provide the user interface for the English learning application.

### Frontend Technologies

-   React.js
-   TypeScript
-   Vite
-   TailwindCSS
-   Axios
-   React Router DOM
-   Zustand (State Management)

### Frontend Installation and Running

1.  **Clone the repository.**
2.  Navigate to the `FRONTEND` directory: `cd FRONTEND`
3.  Install dependencies (Bun is also used, as indicated by `bun.lock`): `npm install` (or `bun install`)

**To run the frontend:**

-   **Development mode:** `npm run dev`
-   **Build for production:** `npm run build`
-   **Preview production build:** `npm run preview`
-   **Run linting:** `npm run lint`

## Development Conventions

-   **Language:** TypeScript is used for both frontend and backend.
-   **Styling:** TailwindCSS for the frontend.
-   **Code Formatting:** Prettier is used (indicated by `.prettierrc` in backend, likely also for frontend).
-   **Linting:** ESLint is configured for both projects.
-   **Database:** PostgreSQL with Prisma ORM.
-   **API Interaction:** RESTful API.

This `GEMINI.md` file serves as a comprehensive guide for understanding and working with the ListenUp English project.