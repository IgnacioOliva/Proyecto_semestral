# 🐾 DoggySpa S15 — cierre técnico de EP3 (2026-2)

Proyecto docente de referencia que **continúa el DoggySpa S14 revisado**. No es solución de los cinco casos EP3.

## Objetivo de semana 15
- Login `POST /auth/login`, JWT Bearer, roles ADMIN/USER y verificación `GET /auth/me` en el backend.
- React Router con rutas protegidas: `/mascotas` (USER/ADMIN), `/administracion` (ADMIN).
- Persistencia de sesión tras RECARGAR la pestaña mediante `sessionStorage`.
- Expiración de JWT (60 minutos), logout, rechazo 401 y 403 sin eliminar la sesión ante 403.
- CRUD desde React restringido a ADMIN en backend; USER solo lectura.

## Requisitos
Windows 11, JDK 21, Maven, Node.js/npm, VS Code y **una sola BD** en puerto 3306: XAMPP o Docker (nunca ambos simultáneamente en 3306).

## Arranque (3 terminales/ventanas)

### 1) Base de datos
**XAMPP:** activar MySQL; en phpMyAdmin ejecutar `infra/mysql/xampp/crear_bd.sql` con una cuenta administrativa. Si ya existe, revisar los permisos. No eliminar directorios `mysql/data` ante errores de Aria.

**Docker:** detener MySQL de XAMPP; desde `infra/mysql`: `docker compose up -d`, `docker compose ps` y comprobar el servicio healthy. No usar `docker compose down -v` si deseas conservar datos.

### 2) Backend
En `backend` ejecutar `java -version`, `mvn -version` (ambos Java 21) y `mvn clean spring-boot:run` **o** correr `DoggySpaApplication.java` desde VS Code usando JDK 21. URL: http://localhost:8080/swagger-ui.html — debe mostrar Authorize.

### 3) Frontend
En `frontend`: `npm install`, `npm run dev`. Abrir http://localhost:5173. El URL puede configurarse en `frontend/.env` usando `.env.example`.

## Usuarios ficticios (SOLO laboratorio)
- ADMIN: `admin` / `Admin123!`
- USER: `usuario` / `Usuario123!`

Se crean si no existen en la BD. Son credenciales de ejemplo: **no publicar en una aplicación real**. Configura `JWT_SECRET` con valor robusto y secreto para cualquier entorno no docente.

## Flujo de sesión
1. React llama a `/auth/login` y obtiene el JWT.
2. Guarda JWT, usuario y rol en `sessionStorage`; no guarda contraseña.
3. Tras F5, lee y verifica expiración local del token y solicita `GET /auth/me` al backend: la validación verdadera (firma + vigencia + usuario + rol) se hace en Spring Security.
4. Si `/auth/me` devuelve 401, borra sesión. Si falla la red, muestra reintento y **no da por válida** la sesión.
5. Todas las operaciones protegidas usan `Authorization: Bearer <JWT>`; ante 401 se cierra la sesión; ante 403 se informa la falta de permisos pero no se cierra sesión.
6. Logout elimina JWT de `sessionStorage` y limpia el estado en React.

## Seguridad — límite del ejemplo
`sessionStorage` **resiste recargas**, pero NO el cierre de la pestaña y **no protege contra XSS**. El contenido del JWT se decodifica en el navegador para ver `exp`, pero eso NO verifica la firma. La autorización real ocurre siempre en el backend; ocultar el botón ADMIN o bloquear una ruta React no son controles suficientes. En producción evaluar cookies `HttpOnly`, `Secure`, `SameSite`, gestión de CSRF y políticas CSP.

## Matriz de pruebas
| Caso | Petición | Esperado |
| --- | --- | --- |
| No autenticado | POST `/api/mascotas` | 401 |
| USER autenticado | GET `/api/mascotas` | 200 |
| USER autenticado | POST `/api/mascotas` | 403 |
| ADMIN autenticado + JSON válido + cliente existente | POST `/api/mascotas` | 201 |
| USER autenticado | GET `/auth/me` | 200 con `rol: USER` |
| Sin token | GET `/auth/me` | 401 |
| React F5 con token vigente | `/mascotas` | sesión recuperada tras comprobación backend |
| React navegar a `/administracion` con USER | Ruta bloqueada | `/sin-permiso` |
| React logout | `/mascotas` | redirige a `/login` |
| JWT vencido | Endpoint protegido | 401 |

## Pruebas locales
- `cd backend && mvn test` : pruebas MockMvc con JWT simulado; no comprueban firma real ni base de datos.
- `cd frontend && npm test` : pruebas puras de guardado/expiración de sesión con Node.
- `cd frontend && npm run build` : compilación de producción Vite.
- Realizar también pruebas manuales con MySQL real y Swagger; **los tests no sustituyen la validación E2E**.

## Continuidad hasta EP3
Semana 16: pruebas E2E por caso, manual con capturas, documento de integración, video, ZIP y enlaces de GitHub, entrega individual en AVA en la 2ª sesión. Semana 17: primera sesión, defensa técnica individual personalizada. No se exige nube.

## Nota diagnóstica
`401` significa falta de autenticación válida; `403` significa autenticación válida sin permisos. Si Swagger carece de Authorize, revisar `OpenApiConfig` y reiniciar Spring Boot. Si 401 con USER donde se espera 403, comprobar el filtro JWT y sus registros, y ejecutar pruebas `SecurityFlowTest`.
