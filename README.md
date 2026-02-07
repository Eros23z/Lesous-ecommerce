# 🔮 Lesous | Artefacts & Mysticism

> **Plataforma de E-commerce (A medida)**
> Desarrollada para la gestión y venta exclusiva de artefactos esotéricos.

![Project Status](https://img.shields.io/badge/Status-Development-gold)
![Next.js](https://img.shields.io/badge/Core-Next.js_15-black)
![React](https://img.shields.io/badge/Library-React_19-61dafb)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Prisma](https://img.shields.io/badge/ORM-Prisma-green)

---

## 🏛️ Visión del Proyecto

**Lesous** es una aplicación web progresiva (PWA) diseñada para ofrecer una experiencia de usuario inmersiva, fusionando una estética "Dark/Gold" minimalista con una arquitectura de software robusta y escalable. 

El sistema utiliza **React.js** como núcleo para la creación de interfaces de usuario interactivas, permitiendo una navegación fluida y una gestión de estado eficiente en tiempo real.

---

## ⚡ Arquitectura Técnica

El sistema está construido sobre una arquitectura moderna basada en **React Server Components (RSC)** y el motor de Next.js 16.

### Stack Tecnológico
* **Frontend Core:** [React.js](https://react.dev/) (v19) para la construcción de interfaces y componentes reutilizables.
* **Framework:** [Next.js 15](https://nextjs.org/) (App Router) para la optimización de rutas y renderizado híbrido.
* **Styling Engine:** Tailwind CSS con diseño atómico.
* **Motion System:** Framer Motion para micro-interacciones y transiciones de estado de componentes.
* **Backend / API:** Next.js API Routes (Serverless Functions).
* **Database Layer:** PostgreSQL gestionado a través de **Prisma ORM** para un tipado estricto de los datos.

---

## 💎 Módulos del Sistema

### 1. Storefront (React Components)
Una interfaz diseñada para la retención del usuario mediante componentes de React optimizados.
* **Filtrado Híbrido:** Sistema de navegación reactivo con gestión de estado para categorías y búsqueda dinámica.
* **Búsqueda en Tiempo Real:** Filtrado instantáneo de productos mediante el uso de `useMemo` y estados controlados de React.
* **Optimistic UI:** Feedback visual inmediato mediante actualizaciones de estado que anticipan la respuesta del servidor.

### 2. Panel de Maestro (CMS / Dashboard)
Panel de administración centralizado que utiliza la reactividad de React para facilitar la gestión.
* **Gestión de Productos:** CRUD completo con estados de carga (Loading states) y manejo de errores asíncronos.
* **Custom Hooks:** Implementación de lógica encapsulada en Hooks personalizados para la recuperación y sincronización de datos entre componentes.
* **Integridad Referencial:** Lógica de validación en los componentes para proteger la consistencia de los artefactos y sus clases.

### 3. Sistema de Modales & UX
* **Componentes Reutilizables:** Modales de confirmación y alerta diseñados íntegramente en React, eliminando la dependencia de funciones nativas del navegador para mantener la coherencia estética del "Grimorio".

---

## 🎨 Estrategia de Diseño

La interfaz sigue una paleta de colores estricta solicitada por el cliente. Se priorizó la legibilidad tipográfica mediante el uso de:
* **Cinzel:** Para encabezados y elementos de jerarquía alta.
* **Cormorant Garamond:** Para cuerpos de texto y descripciones detalladas.

---

## 🚀 Roadmap de Desarrollo

- [x] **Core:** Arquitectura base con React y Next.js.
- [x] **CMS:** Dashboard funcional con gestión de categorías y productos.
- [ ] **Storage:** Migración de gestión de assets a **Supabase Storage**.
- [ ] **Deploy:** Despliegue en infraestructura Edge (Vercel).

---

© 2026 Lesous Development. Todos los derechos reservados.
