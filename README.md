# Frontend – Documentación del Proyecto

> **Nombre del proyecto:** "*Bookly | Sistema de Reserva de Turnos*"
>
> **Tecnologías principales:** React - Vite - React Router DOM - Axios

---

## 📌 Descripción del Proyecto

Este es el frontend de la aplicación desarrollada como parte del proyecto final UTN. Está construido con **React + Vite**, siguiendo una arquitectura modular basada en páginas, componentes reutilizables, contextos globales y hooks personalizados. La interfaz permite al usuario:

* Registrarse e iniciar sesión.
* Verificar su cuenta por email.
* Solicitar y reservar turnos disponibles.
* Administrar sus turnos futuros y pasados.
* Editar información de perfil.
* Recuperar contraseña.

El frontend se comunica con el backend mediante **servicios Axios** que manejan autenticación, turnos y verificación.

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
    │   └── Footer/
    │
    ├── constants/            # Constantes globales (iconos, rutas)
    │   ├── icons.jsx
    │   └── apiRoutes.jsx
    │
    ├── context/              # Contextos globales
    │   ├── AuthContext.jsx
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

### 1️⃣ **Clonar el repositorio**

```
git clone <url-del-repo-frontend>
cd frontend
```

### 2️⃣ **Instalar dependencias**

```
npm install
```

### 3️⃣ **Configurar variables de entorno**

Crear un archivo `.env` basado en `.env.example`.

Variables típicas:

```
VITE_API_URL=http://localhost:8080/
```

Cambiar según el backend en producción (por ejemplo, el deploy en Vercel).

### 4️⃣ **Ejecutar en modo desarrollo**

```
npm run dev
```

La aplicación se abrirá en:

```
http://localhost:5173
```

### 5️⃣ **Build para producción**

```
npm run build
```

### 6️⃣ **Vista previa del build**

```
npm run preview
```

---

## 🧩 Dependencias Principales

Estas dependencias están definidas en el `package.json`:

| Librería             | Versión | Uso                                 |
| -------------------- | ------- | ----------------------------------- |
| **react**            | ^19.1.1 | UI principal                        |
| **react-router-dom** | ^7.9.3  | Sistema de rutas                    |
| **axios**            | ^1.13.2 | Requests HTTP                       |
| **react-icons**      | ^5.5.0  | Iconografía                         |
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
* `*` → Página 404

---

## 🔒 Autenticación y Manejo de Sesión

El frontend implementa:

* **Contexto de autenticación (`AuthContext`)**: maneja estado global del usuario.
* **Persistencia del token en localStorage**.
* **Manejo de expiración de la sesión** mediante `sessionHandler.js`.
* **Protección de rutas** desde `AppRouter.jsx`.

---

## 🧠 Hooks Personalizados

| Hook               | Función                                                 |
| ------------------ | ------------------------------------------------------- |
| `useAuth()`        | Maneja el login, registro, logout y estado del usuario. |
| `usePageTitle()`   | Actualiza dinámicamente el título del documento.        |
| `useScrollToTop()` | Hace scroll al inicio al navegar entre páginas.         |

---

## 🎨 Estilos y Temas

* Proyecto basado en **CSS modular por componentes/páginas**.
* Variables y estilos globales en `styles/base.css`.
* Tema claro/oscuro controlado por `ThemeContext`.
* Botón tipo switch de tema: `ThemeToggleButton`.

---

## 🔌 Servicios y Comunicación con el Backend

Los servicios Axios encapsulan las peticiones:

### `auth.service.js`

* Login
* Register
* Forgot password
* Reset password
* Verify email
* Refresh de sesión (si aplica)

### `appointments.service.js`

* Obtener turnos disponibles
* Reservar turno
* Listar turnos del usuario

---

## 🧪 Testing Manual con Postman

Se incluye una colección de Postman (en el repositorio del backend) para facilitar la validación de endpoints.

---

## 📦 Deploy

El frontend está desplegado con **Vercel**, utilizando:

* `npm run build`
* Adaptación automática de Vite

El entorno de producción debe incluir:

```
VITE_API_URL=<URL_DE_TU_BACKEND_DEPLOYADO>
```

---

## 📜 Licencia

Proyecto desarrollado para fines académicos (UTN). Uso libre para revisión.

---

## 👤 Autor

Matías Gaitán.


