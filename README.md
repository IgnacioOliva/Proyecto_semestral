# Sonido Vivo — Proyecto Semestral (DSY1104 · EP3)

Aplicación web fullstack para la tienda de instrumentos musicales, audio e iluminación **Sonido Vivo** (Arlegui #450, Viña del Mar).

- **Backend:** Java 21, Spring Boot 4.1.2, Spring Data JPA, Spring Security + JWT (`jjwt`), Swagger/OpenAPI (`springdoc`), driver MariaDB/MySQL y H2 para desarrollo rápido.
- **Frontend:** React 19, Vite 8, React Router 7, Bootstrap 5, Vitest + React Testing Library.

---

## 1. Requisitos previos

- **Java JDK 21** (el proyecto incluye Maven Wrapper `mvnw` / `mvnw.cmd`).
- **Node.js 18+** y **npm**.
- **MySQL / MariaDB** (por ejemplo mediante **XAMPP**, puerto `3306`) para ejecución con base de datos persistente.

---

## 2. Variables de entorno de ejemplo

Se incluyen archivos de referencia en cada carpeta:

- [`backend/.env.example`](backend/.env.example)
- [`frontend/.env.example`](frontend/.env.example)

### Backend (`backend/.env.example`)

| Variable | Valor por defecto | Descripción |
| :--- | :--- | :--- |
| `DB_PORT` | `3306` | Puerto de MySQL / MariaDB (perfil `mysql`). |
| `DB_USER` | `root` | Usuario de la base de datos (perfil `mysql`). |
| `DB_PASSWORD` | *(vacío)* | Contraseña de la base de datos (perfil `mysql`). |
| `JWT_SECRET` | `sonidovivo-clave-jwt-de-desarrollo-32bytes` | Clave simétrica HMAC para firmar JWT (mínimo 32 bytes). |
| `JWT_EXPIRATION_MINUTES` | `120` | Vigencia del token JWT en minutos. |

### Frontend (`frontend/.env.example`)

| Variable | Valor por defecto | Descripción |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost:8080` | URL base del backend Spring Boot consumido por React. |

Si necesitas cambiar la URL de la API, copia `frontend/.env.example` como `frontend/.env` y ajusta `VITE_API_URL`.

---

## 3. Inicialización de la base de datos

### Opción A: MySQL / MariaDB con XAMPP (perfil `mysql`)

1. Inicia el módulo **MySQL** en el panel de control de XAMPP.
2. Abre **phpMyAdmin** (o un cliente MySQL) y ejecuta el script [`backend/sql/01_crear_sonidovivo.sql`](backend/sql/01_crear_sonidovivo.sql):

```sql
CREATE DATABASE IF NOT EXISTS sonidovivo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

3. Al iniciar el backend con el perfil `mysql`, Hibernate crea/actualiza las tablas automáticamente (`ddl-auto=update`) a partir de las entidades JPA (`Producto`, `Pedido`, `DetallePedido`, `Usuario`) y `DatosDemo` carga los datos iniciales si las tablas están vacías.

### Opción B: Base de datos H2 en memoria (perfil por defecto)

Si no se especifica el perfil `mysql`, el backend arranca contra `jdbc:h2:mem:sonidovivo` con consola habilitada en `http://localhost:8080/h2-console` y los mismos datos semilla cargados automáticamente.

---

## 4. Procedimiento reproducible de ejecución

### Paso 1: Levantar el backend (puerto `8080`)

Abre una terminal en `backend/`:

- **Con MySQL / MariaDB (XAMPP):**

```powershell
cd backend
.\mvnw.cmd "-Dspring-boot.run.profiles=mysql" spring-boot:run
```

- **Con H2 en memoria (prueba local rápida):**

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

> Si en la red local Maven Central devuelve error HTTP 429, agrega el espejo configurado:
> `.\mvnw.cmd -s .\settings-google.xml "-Dspring-boot.run.profiles=mysql" spring-boot:run`

Cuando arranque correctamente, la API quedará disponible en `http://localhost:8080` y Swagger UI en `http://localhost:8080/swagger-ui/index.html`.

### Paso 2: Levantar el frontend (puerto `5173`)

En una segunda terminal en `frontend/`:

```powershell
cd frontend
npm install
npm run dev
```

Abre la aplicación en `http://localhost:5173` (también se permite `http://127.0.0.1:5173` en la configuración CORS global del backend).

---

## 5. Credenciales de demostración y roles

Al iniciar, `DatosDemo` crea automáticamente **2 usuarios** (contraseñas cifradas con BCrypt) y **51 productos** de catálogo (`ProductosIniciales`):

| Rol | Usuario | Contraseña | Permisos en Frontend | Permisos en Backend |
| :--- | :--- | :--- | :--- | :--- |
| **`ADMIN`** | `admin` | `admin123` | Acceso a Catálogo, Carrito y **Gestión Stock** (`/admin`). | Acceso total a `/auth/me` y todos los endpoints `/api/**` (CRUD de Productos, Pedidos, Usuarios y consulta de DetallePedidos). |
| **`USER`** | `usuario` | `usuario123` | Acceso a Catálogo y Carrito (registrar pedidos). No ve el enlace **Gestión Stock**; si navega a `/admin` es redirigido a `/sin-permiso` (403). | `GET /auth/me`, `GET /api/Productos`, `GET /api/Productos/{id}` y `POST /api/Pedidos`. Cualquier otro endpoint `/api/**` (por ejemplo `PUT`/`POST`/`DELETE` en Productos o `GET /api/Pedidos`) responde **403 Forbidden**. |

---

## 6. Documentación API (Swagger / OpenAPI) y colección HTTP

- **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI JSON:** `http://localhost:8080/v3/api-docs`
- **Archivo de pruebas HTTP:** [`backend/peticiones.http`](backend/peticiones.http) (compatible con REST Client de VS Code e IntelliJ).

### Cómo probar endpoints protegidos en Swagger

1. Ejecuta `POST /auth/login` con `{"usuario": "admin", "password": "admin123"}` (o `usuario` / `usuario123`).
2. Copia el campo `token` de la respuesta.
3. Haz clic en el botón **Authorize** (arriba a la derecha en Swagger UI), pega el token (sin el prefijo `Bearer`) y confirma.
4. Ya puedes ejecutar lectura (`GET`), creación (`POST`), actualización (`PUT`) y eliminación (`DELETE`) en `/api/Productos`, `/api/Pedidos` y `/api/Usuarios`.

### Reglas de negocio destacadas en backend

- **`POST /api/Pedidos` (`PedidoService`):** transaccional (`@Transactional`). Valida stock disponible (devuelve `409 Conflict` si falta stock), descuenta stock automáticamente, copia código/nombre/precio vigente de cada producto, calcula costo de envío (`$0` retiro, `$4.990` despacho), calcula el total en servidor, asigna estado `"En Preparación"`, fecha actual y número único `SV-XXXXXX`.
- **`PUT /api/Pedidos/{id}`:** solo permite actualizar el estado del pedido, evitando alterar montos o detalles históricos.
- **`POST` / `PUT` en `/api/Usuarios`:** cifra las contraseñas con BCrypt; la propiedad `password` es `WRITE_ONLY` en Jackson y nunca se expone en respuestas JSON.

---

## 7. Guía rápida de verificación funcional

1. **Acceso sin sesión:** abrir `/catalogo` o `/admin` sin iniciar sesión redirige a `/login`. Llamar a `/api/Productos` sin token devuelve `401 Unauthorized`.
2. **Persistencia de sesión tras recarga:** iniciar sesión y recargar la página (`F5`). El frontend recupera el JWT desde `sessionStorage` (`sonidovivo.session`), lo revalida contra `GET /auth/me` y mantiene la sesión activa.
3. **Sesión inválida o expirada:** si se manipula el token en `sessionStorage` o el JWT vence, `/auth/me` o cualquier solicitud API devuelve `401`, se limpia la sesión automáticamente y se muestra el aviso para volver a ingresar. Si el backend está detenido al recargar, la vista muestra estado de reconexión con botón **Reintentar verificación**.
4. **Control de acceso por rol:** con `usuario` / `usuario123` se oculta **Gestión Stock**; entrar manualmente a `/admin` muestra `403 — Acceso restringido` (`/sin-permiso`) y llamar a `PUT /api/Productos/{id}` responde `403`. Con `admin` / `admin123` se accede a `/admin` y se actualiza el stock en el backend.
5. **Flujo CRUD completo:** consultar catálogo (`GET /api/Productos`), confirmar un pedido desde el carrito (`POST /api/Pedidos` descontando stock), editar stock desde `/admin` (`PUT /api/Productos/{id}`) y crear/eliminar registros de prueba desde Swagger o `backend/peticiones.http`.

---

## 8. Documentación de pruebas de integración y unitarias

### 8.1 Pruebas del backend (Spring Boot Test + MockMvc)

Comando de ejecución desde `backend/`:

```powershell
.\mvnw.cmd test
```

| Archivo de prueba | Tipo | Casos cubiertos |
| :--- | :--- | :--- |
| `backend/src/test/java/com/example/demo/DemoApplicationTests.java` | Integración de contexto (`@SpringBootTest`) | Verifica el levantamiento completo del contexto de Spring Boot, repositorios JPA, seguridad y carga de `DatosDemo`. |
| `backend/src/test/java/com/example/demo/AuthMeSecurityTest.java` | Integración web/seguridad (`@WebMvcTest` + `MockMvc`) | 1) `GET /auth/me` sin token responde `401 Unauthorized`.<br>2) `GET /auth/me` con token válido de rol `USER` responde `200 OK` con `username` y `rol`. |
| `backend/src/test/java/com/example/demo/SecurityFlowTest.java` | Integración web/autorización (`@WebMvcTest` + `MockMvc`) | 1) `POST /api/Productos` sin token responde `401 Unauthorized`.<br>2) `GET /api/Productos` con rol `USER` responde `200 OK`.<br>3) `PUT /api/Productos/1` con rol `USER` responde `403 Forbidden`.<br>4) `PUT /api/Productos/1` con rol `ADMIN` responde `200 OK`. |

**Resultado verificado:** 3 clases de prueba, **7 pruebas ejecutadas, 0 fallos**.

### 8.2 Pruebas del frontend (Vitest + React Testing Library)

Comando de ejecución desde `frontend/`:

```powershell
npm test
```

Para generar reporte de cobertura:

```powershell
npm run test:coverage
```

| Archivo de prueba | Tipo | Casos cubiertos |
| :--- | :--- | :--- |
| `frontend/src/pages/Login.test.jsx` | Integración UI + `AuthProvider` + `fetch` | Validación de campos vacíos sin llamada HTTP, manejo de `401 Credenciales incorrectas`, login exitoso guardando JWT en `sessionStorage` y redirección según rol. |
| `frontend/src/auth/session.test.js` | Unitaria de persistencia JWT | Guardar y recuperar sesión tras recarga, invalidación/limpieza automática por expiración, rechazo de JWT malformados y limpieza en cierre de sesión. |
| `frontend/src/pages/Carrito.test.jsx` | Integración de componente | Confirmación de pedido previniendo submit por defecto y vaciando carrito; actualización de cantidad y eliminación de ítems. |
| `frontend/src/pages/Contacto.test.jsx` | Integración de formulario | Validaciones de campos vacíos, correo inválido, rechazo de `validarTexto` y persistencia cuando los datos son válidos. |
| `frontend/src/components/ProductoCard.test.jsx` | Componente UI | Renderizado de nombre, categoría y precio formateado en pesos chilenos. |
| `frontend/src/utils/validaciones.test.js` | Unitaria | Validación de largo mínimo de texto y formato de correo electrónico. |

**Resultado verificado:** 6 archivos de prueba, **20 pruebas ejecutadas, 0 fallos**.
