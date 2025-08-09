# Diseño del Sistema – CRUD-RopaControl (Versión-2.1-storage-refactor)

Este documento describe el diseño lógico del sistema basado en el proyecto `RopaControl-CRUD`, específicamente la versión `2.0` que implementa el patrón de diseño Singleton, organiza los componentes en capas funcionales e incorpora un sistema de **autenticación con roles** (administrador y empleado).

## Estructura General

El sistema está dividido en tres capas principales:

---

### 1. **Frontend**
Encargado de la interacción con el usuario:
- **Interfaz de Usuario** (`HTML + CSS`): Define la estructura visual y estilos.
- **Punto de Entrada de CRUD** (`app.js`): Gestiona las acciones del usuario dentro del módulo de productos y se comunica con el controlador.
- **Pantalla de Login** (`login.html` + `login.js`): Formulario inicial para que el usuario se autentique según su rol.
- **Archivos de Estilo**: CSS asociado a `index.html` y `login.html`.

---

### 2. **Backend Lógico**
Gestiona la instancia y el almacenamiento:
- **`singleton.js`**: Implementación del patrón **Singleton** para asegurar que sólo exista una instancia de gestión de almacenamiento.
- **`storage.js`**: Módulo de gestión del almacenamiento local (`localStorage`) del navegador. Persiste los datos de productos y usuarios.

---

### 3. **Módulo de Autenticación**
Se encarga de validar credenciales y manejar roles de usuario:
- **`login.js`**: Contiene la lógica para:
  - Capturar los datos del formulario (`usuario` y `contraseña`).
  - Validar credenciales contra una lista predefinida de usuarios o contra datos guardados en `localStorage`.
  - Asignar rol (`administrador` o `empleado`).
  - Redirigir a `index.html` si el login es exitoso.
  - Guardar en `sessionStorage` los datos del usuario autenticado para persistir la sesión.
- **`login.html`**: Interfaz de acceso con campos de usuario y contraseña. Incluye:
  - Campos de entrada (`<input>`).
  - Botón de iniciar sesión.
  - Mensajes de error en caso de credenciales inválidas.
  - Enlace o botón para volver a la página principal (opcional).
- **Gestión de usuarios (solo administrador):**
  - Crear usuarios: Permite registrar nuevas cuentas.
  - Eliminar usuarios: Permite dar de baja cuentas existentes.
  - Recuperación de contraseña: Posibilidad de restablecer claves en caso de olvido.
  - Autenticación reforzada: Para crear o eliminar usuarios, el sistema solicita nuevamente las credenciales del administrador para confirmar la acción.

---

## Patrón de diseño aplicado

**Singleton**: El objeto `StorageManager` encapsula toda la lógica relacionada con el almacenamiento en `LocalStorage`.  
Mediante el método `getInstance()`, se asegura que sólo exista una única instancia de `StorageManager`.

---

## Flujo de Autenticación y Autorización

1. **Usuario accede a `login.html`**  
   Ingresa su nombre de usuario y contraseña.

2. **`login.js` valida las credenciales**  
   - Si son correctas, guarda el rol y el nombre de usuario en `sessionStorage`.
   - Si son incorrectas, muestra un mensaje de error.

3. **Redirección a `index.html`**  
   Dependiendo del rol:
   - **Administrador**: Acceso completo al CRUD.
   - **Empleado**: Acceso limitado (por ejemplo, sólo lectura de la tabla de productos).

4. **`app.js` verifica sesión activa**  
   Si no hay sesión, redirige de vuelta a `login.html`.

5. **Acciones de gestión de usuarios (solo administrador)**
    Antes de crear o eliminar un usuario, el sistema solicita nuevamente la autenticación del administrador para confirmar la acción.
    
---

## Diagrama del diseño

El diagrama `diagrama_diseño_software.png` ubicado en `docs/` representa:
- **Frontend**: interfaz visual y formularios de entrada (`index.html`, `login.html`).
- **Backend lógico**: Singleton y almacenamiento (`singleton.js`, `storage.js`).
- **Módulo de autenticación**: Validación y control de acceso (`login.js`).

---

## Archivos Relacionados

- `js/app.js`
- `singleton_ealvarez/singleton.js`
- `js/storage.js`
- `js/login.js`
- `index.html`
- `login.html`
- `docs/diagrama_diseño_software.png`
- `docs/diagrama_archimate.archimate` (archivo editable desde Archi)

---
