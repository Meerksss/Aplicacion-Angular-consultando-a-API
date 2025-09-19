# 📘 Documentación del Proyecto Angular - Gestión de Usuarios

Este documento recoge todos los pasos realizados durante el desarrollo de la aplicación Angular, incluyendo los errores encontrados y sus soluciones.

---

## 1️⃣ Creación del repositorio y control de versiones
- Se creó un **repositorio en GitHub** para alojar el proyecto.
- Se vinculó el repositorio con la carpeta personal en local.
- Se abrió **GitKraken** para llevar el control de versiones (commits, ramas, pushes).

---

## 2️⃣ Instalación de Angular en el proyecto
Se instaló Angular en el proyecto:

```bash
ng new nombre-del-proyecto

```

---

## 3️⃣ Creación de componentes principales
Se generaron los siguientes componentes:

```bash
ng g c components/navbar --skip-tests --type=component
ng g c components/home --skip-tests --type=component
ng g c components/user-view --skip-tests --type=component
ng g c components/user-form --skip-tests --type=component
```

Estos componentes representan:
- **Navbar** → Cabecera fija con la navegación de la aplicación.
- **Home** → Vista principal con listado de usuarios.
- **UserView** → Vista detallada de un usuario.
- **UserForm** → Formulario para crear/editar usuarios.

---

## 4️⃣ Creación del servicio y la interfaz
Se generó el **servicio Users** y la **interfaz IUsers**:

```bash
ng g s services/users
ng g i interfaces/iusers
```

## 5️⃣ Errores encontrados y soluciones aplicadas

### ❌ Error 1: La aplicación no se visualizaba (pantalla en blanco)
- **Causa**: El servicio estaba mal planteado en el método `getAll`, estaba llamando mal al array de la API.  
- **Solución**: Corregir el endpoint y la tipificación.

### ❌ Error 2: Fallo en la vista de usuario (`getById`)
- **Causa**: La función estaba planteada igual que `getAll` y no devolvía el usuario correcto.
- **Solución**: Ajustar el método `getById` para recibir un `string` (`_id`) en lugar de un `number`.

### ❌ Error 3: Problemas con las rutas (`:_id` vs `:id`)
- **Causa**: En `app.routes.ts` usaba correctamente `:_id`, mientras que en los componentes estaba poniendo, repetidamente, `id`.
- **Solución**: Unificar los parámetros.

---

## 6️⃣ Formulario de usuario
Se utilizó un **Reactive Form** con validaciones y estilos para mejorar la apariencia.  
El formulario se modificó para que fuese más atractivo, dejando atrás el estilo simple.

---

## 7️⃣ Footer general
Finalmente, se añadió un **footer global** para que aparezca en todas las páginas.  
Se usó un **layout flex con Bootstrap** para mantenerlo pegado abajo incluso si la pantalla tiene poco contenido.

---

## 8️⃣ Cierre del proyecto
Una vez completadas todas las funcionalidades (CRUD, navbar, footer, notificaciones), el proyecto se dio por cerrado y documentado en este archivo.

---

# ✅ Puntos de interes (paquetes de instalación)

Se llevó a cabo la instalación de bootstrap para asignar estilos a la aplicación.
También se llevó a cabo la instalación de sweetalert2 para la creación de los popUp a la hora de confirmar la eliminación de un usuario.

```bash
npm install bootstrap
npm install sweetalert2
```
