# Proyecto: Foodstore

## ✍️ Descripción

Proyecto para el primer parcial de Programación III: Foodstore

## [Video explicativo](https://youtu.be/9Dvov2JlxzM)

---

## Funcionalidades

- Visualización de productos
- Búsqueda de productos por nombre (coincidencia parcial)
- Filtro de productos por categoría
- Carrito de compras persistido en `localStorage`
- Modificación lógica de carrito de compras (indicador de carrito, cantidad, subtotal, productos)

## Tecnologías

- HTML5 / CSS3 / Typescript
- Vite

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm run dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

Para interactuar el proyecto debe registrarse un nuevo usuario y logearse con el mismo.

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── assets/               # Contiene los assets (imagenes)
│   ├── pages/                # Contiene las páginas de la aplicación
│   │   ├── admin/            # Páginas solo para administradores
│   │   ├── auth/             # Páginas de autenticación (login, registro) y lógica respectiva de cada una
│   │   └── client/           # Páginas solo para clientes (home, cart) y lógica respectiva de cada una
│   ├── types/                # Define las interfaces y tipos (IUser, Rol, categoria, product)
│   └── utils/                # Lógica reutilizable
│       ├── auth.ts           # Función principal de verificación de rol y sesión
│       ├── cart.ts   				# Funciones para leer/escribir en localStorage para el carrito
│       ├── localStorage.ts   # Funciones para leer/escribir en localStorage
│       └── navigate.ts       # Función para redirigir al usuario
├── package.json              # Dependencias y scripts
├── index.html              	# Punto de entrada de la SPA
└── README.md                 # Este archivo
```
