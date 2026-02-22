# Bookly | Sistema de Reserva de Turnos

Frontend de aplicación full stack desarrollada con React + Vite.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Deploy](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🌍 Enlaces del Proyecto

- 🚀 [Aplicación en Producción](https://gaitanmatias-bookly.vercel.app/)
- ⚙️ [Repositorio Backend](https://github.com/gaitanmatias/UTN_FINAL_PROJECT--BACKEND)

---

## 📌 Descripción del Proyecto

Este es el frontend de la aplicación desarrollada como parte del
proyecto final UTN. Está construido con **React + Vite**, siguiendo una
arquitectura modular basada en páginas, componentes reutilizables,
contextos globales y hooks personalizados.

La interfaz permite al usuario:

-   Registrarse e iniciar sesión.
-   Verificar su cuenta por email.
-   Seleccionar fechas mediante un **calendario interactivo dinámico**.
-   Visualizar turnos disponibles por día.
-   Reservar turnos en tiempo real.
-   Administrar turnos futuros y pasados.
-   Recuperar contraseña.

El frontend se comunica con el backend mediante **servicios Axios** que
manejan autenticación, turnos y verificación.

---

## 📁 Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

```
FRONTEND/
├── .env                      # Variables de entorno
├── .env.example              # Ejemplo para configuración
├── .gitignore
├── index.html                # Punto de entrada HTML
├── package.json              # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
├── vercel.json               # Configuración de Vercel
│
└── src/
    ├── App.jsx               # Componente raíz de la aplicación
    ├── main.jsx              # Punto de montaje de React
    │
    ├── assets/               # Recursos estáticos
    │
    ├── components/           # Componentes reutilizables
    │   ├── NavBar/
    │   ├── ThemeToggleButton/
    │   ├── ConfirmDialog/
    │   ├── DateSelection/
    │   └── Footer/
    │
    ├── constants/            # Constantes globales (iconos, rutas)
    │   ├── icons.jsx
    │   └── apiRoutes.jsx
    │
    ├── context/              # Contextos globales
    │   ├── AuthContext.jsx
    │   ├── UIContext.jsx
    │   └── ThemeContext.jsx
    │
    ├── hooks/                # Hooks personalizados
    │   ├── useAuth.js
    │   ├── usePageTitle.js
    │   └── useScrollToTop.js
    │
    ├── layouts/              # Layouts reutilizables
    │
    ├── pages/                # Páginas de la aplicación
    │   ├── home/
    │   ├── auth/
    │   ├── admin/
    │   ├── appointments/
    │   ├── profile/
    │   └── NotFoundPage/
    │
    ├── router/
    │   └── AppRouter.jsx
    │
    ├── services/             # Llamadas a la API (Axios)
    │   ├── auth.service.js
    │   └── appointments.service.js
    │
    ├── styles/
    │   └── base.css
    │
    └── utils/
        └── sessionHandler.js
```

---

## 🚀 Instalación y Puesta en Marcha

### 1️⃣ Clonar el repositorio

    git clone https://github.com/gaitanmatias/UTN_FINAL_PROJECT--FRONTEND
    cd frontend

### 2️⃣ Instalar dependencias

    npm install

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example`.

    VITE_API_URL=http://localhost:8080/

Cambiar según el backend en producción.

### 4️⃣ Ejecutar en modo desarrollo

    npm run dev

La aplicación se abrirá en:

    http://localhost:5173

### 5️⃣ Build para producción

    npm run build

### 6️⃣ Vista previa del build

    npm run preview

---

## 🧩 Dependencias Principales

Estas dependencias están definidas en el `package.json`:

| Librería             | Versión | Uso                                 |
| -------------------- | ------- | ----------------------------------- |
| **react**            | ^19.1.1 | UI principal                        |
| **react-router-dom** | ^19.1.1 | Sistema de rutas                    |
| **axios**            | ^1.13.2 | Requests HTTP                       |
| **react-icons**      | ^5.5.0  | Iconografía                         |
| **react-calendar**   | ^6.0.0  | Calendario interactivo              |
| **jwt-decode**       | ^4.0.0  | Decodificación de JWT en el cliente |

---

## 🌐 Rutas principales del sistema

El archivo `AppRouter.jsx` administra todas las rutas:

### `/`
* `/` → Home
* `/appointments` → Seleccionar fecha de turnos
* `/appointments/available/:date` → Ver turnos disponibles
* `/admin-dashboard` → Ver turnos disponibles
### `/auth`
* `/auth/login` → Iniciar sesión
* `/auth/register` → Crear cuenta
* `/auth/forgot-password` → Recuperar contraseña
* `/auth/reset-password/:token` → Restablecer contraseña
* `/auth/verify-email/:token` → Verificación
### `/profile`
* `/profile/:userId` → Perfil del usuario
* `/profile/:userId/my-appointments` → Mis turnos

`*` → Página 404 (NotFoundPage)

---

## 🔒 Autenticación y Manejo de Sesión

- **Contexto de autenticación (`AuthContext`)**: maneja estado global del usuario.
- **Persistencia del token en localStorage**.
- **Manejo de expiración de la sesión** mediante `sessionHandler.js`.
- **Protección de rutas** desde `AppRouter.jsx`.

---

## 🧠 Hooks Personalizados

| Hook               | Función                                                 |
| ------------------ | ------------------------------------------------------- |
| `useAuth()`        | Maneja el login, registro, logout y estado del usuario. |
| `usePageTitle()`   | Actualiza dinámicamente el título del documento.        |
| `useScrollToTop()` | Hace scroll al inicio al navegar entre páginas.         |

---

## 🎨 Estilos y Temas

-   CSS modular por componentes y páginas.
-   Variables globales en `base.css`.
-   Soporte de tema claro/oscuro mediante `ThemeContext`.

---

## 🔌 Servicios y Comunicación con el Backend

Los servicios Axios encapsulan las peticiones:

### `auth.service.js`

- Login
- Register
- Forgot password
- Reset password
- Verify email
- Refresh de sesión (si aplica)

### `appointments.service.js`

- Obtener turnos disponibles
- Reservar turno
- Listar turnos del usuario

---

## 🧪 Testing Manual con Postman

Se incluye una colección de Postman (en el repositorio del backend) para facilitar la validación de endpoints.

---

## 📦 Deploy

Frontend desplegado en **Vercel**.

Requiere variable de entorno en producción:

    VITE_API_URL=<URL_BACKEND_PRODUCCION>

---

## 👤 Autor

Gaitán Matías - Desarrollador Full Stack.


