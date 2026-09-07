# Proyecto: Protección de Rutas (Educativo)

## ✍️ Descripción

---

## ⚠️ ¡Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.

- **Razón**: La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

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
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── pages/                # Contiene las páginas de la aplicación
│   │   ├── admin/            # Páginas solo para administradores
│   │   ├── auth/             # Páginas de autenticación (login, registro)
│   │   └── client/           # Páginas solo para clientes
│   ├── types/                # Define las interfaces y tipos (IUser, Rol)
│   └── utils/                # Lógica reutilizable
│       ├── auth.ts           # Función principal de verificación de rol y sesión
│       ├── localStorage.ts   # Funciones para leer/escribir en localStorage
│       └── navigate.ts       # Función para redirigir al usuario
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```
