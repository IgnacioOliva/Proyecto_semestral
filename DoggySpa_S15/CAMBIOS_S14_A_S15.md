# Cambios concretos S14 → S15

## Backend
- `controller/AuthController.java`: nuevo `GET /auth/me`, autenticado por JWT; responde `username` y `rol` actuales. Agrega error 401 si fallan credenciales de login y valida datos básicos.
- `security/SecurityConfig.java`: cambia la excepción `/auth/**` pública por SOLO `POST /auth/login`; exige autenticación para `GET /auth/me`. Conserva filtro único JWT, handlers JSON, permisos USER/ADMIN y CORS.
- `src/test/.../AuthMeSecurityTest.java`: dos pruebas MockMvc para 401/200 en `/auth/me` (sin MySQL).
- `application.properties`: cambia el nombre del laboratorio a S15; mismas variables de MySQL y JWT.

## Frontend
- `src/main.jsx`: sustituye página única S14 por `BrowserRouter` y `AuthProvider`.
- `src/App.jsx`: menú, rutas `/login`, `/mascotas`, `/administracion` y `/sin-permiso`.
- `src/auth/session.js`: guardar, leer, borrar token y comprobar `exp`.
- `src/auth/AuthContext.jsx`: login, logout, temporizador de expiración y recuperación de sesión verificada en `/auth/me`.
- `src/services/api.js`: peticiones REST con JWT, tratamiento separado de HTTP 401 y 403.
- `src/components/ProtectedRoute.jsx`: guardas de autenticación y roles (UX, no sustituyen backend).
- `src/pages/*.jsx`: login, listado/CRUD de mascotas y área ADMIN.
- `src/style.css`: mejoras de legibilidad y diseño adaptable.
- `tests/session.test.js`: pruebas Node del almacenamiento y expiración.
- `package.json`: agrega React Router 6.30.1 y scripts `npm test`, `npm run build`.

## Alcance de la sesión
- S14: Spring Security + Swagger JWT + CRUD/MySQL.
- S15: React autenticado con sesión persistente al recargar, rutas, roles, cierre de sesión, validación backend y pruebas.
- No incluye renovación automática/refresh-token como flujo avanzado; el JWT vencido exige volver a iniciar sesión. Esto se declara como decisión técnica del laboratorio.
