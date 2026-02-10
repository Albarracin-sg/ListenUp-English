# ListenUp English - Backend

Backend para la aplicación de aprendizaje de inglés "ListenUp English", desarrollado con NestJS, TypeScript y PostgreSQL.

## Descripción

Este backend proporciona una API RESTful para una aplicación de aprendizaje de inglés que incluye lecciones, preguntas de comprensión auditiva y seguimiento de progreso.

## Características

- Autenticación JWT segura
- Gestión de usuarios (registro, login)
- Gestión de lecciones de inglés
- Sistema de preguntas y respuestas
- Seguimiento de progreso del estudiante
- Base de datos PostgreSQL con Prisma ORM

## Arquitectura

El proyecto sigue una arquitectura modular basada en Clean Architecture:

- `auth/` - Gestión de autenticación y autorización
- `users/` - Gestión de usuarios
- `lessons/` - Gestión de lecciones
- `questions/` - Gestión de preguntas
- `answers/` - Validación de respuestas
- `progress/` - Seguimiento de progreso
- `common/` - Servicios y utilidades comunes
- `seeds/` - Scripts de inicialización de datos

## Endpoints API

### Autenticación

- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/profile` - Obtener perfil de usuario (requiere token)

### Usuarios

- `GET /users/me` - Obtener perfil del usuario autenticado
- `GET /users` - Obtener todos los usuarios (requiere token)

### Lecciones

- `GET /lessons` - Obtener todas las lecciones publicadas
- `GET /lessons/:id` - Obtener una lección específica
- `POST /lessons` - Crear nueva lección (solo admin)
- `PUT /lessons/:id` - Actualizar lección (solo admin)
- `DELETE /lessons/:id` - Eliminar lección (solo admin)

### Preguntas

- `GET /questions/lesson/:lessonId` - Obtener preguntas por lección
- `POST /questions` - Crear nueva pregunta (solo admin)
- `PUT /questions/:id` - Actualizar pregunta (solo admin)
- `DELETE /questions/:id` - Eliminar pregunta (solo admin)

### Respuestas

- `POST /answers/validate` - Validar respuesta a pregunta (requiere token)

### Progreso

- `POST /progress` - Crear o actualizar progreso de lección
- `GET /progress/me` - Obtener progreso del usuario autenticado
- `GET /progress/lesson/:lessonId` - Obtener progreso por lección

## Variables de Entorno

- `DATABASE_URL` - URL de conexión a PostgreSQL
- `JWT_SECRET` - Clave secreta para JWT
- `JWT_EXPIRES_IN` - Tiempo de expiración del token (por defecto: 1d)

## Instalación

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno en un archivo `.env`
4. Ejecuta las migraciones: `npx prisma migrate dev`
5. Genera el cliente de Prisma: `npx prisma generate`
6. Ejecuta el seed: `npm run seed`
7. Inicia el servidor: `npm run start:dev`

## Tecnologías utilizadas

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticación
- Bcrypt para hashing de contraseñas
- Class Validator para validación de datos

## Scripts disponibles

- `npm run start` - Iniciar en modo producción
- `npm run start:dev` - Iniciar en modo desarrollo
- `npm run build` - Compilar el proyecto
- `npm run seed` - Ejecutar el script de inicialización de datos
- `npm run test` - Ejecutar pruebas unitarias

## Documentación de API

La documentación de la API está disponible en `/api` cuando el servidor está en ejecución. Swagger proporciona una interfaz interactiva para explorar y probar los endpoints.