# Diseño del Sistema – CRUD-RopaControl (Versión-2-1-storage-refactor)

Este documento describe el diseño lógico del sistema basado en el proyecto `RopaControl-CRUD`, específicamente la versión `2.0` que implementa el patrón de diseño Singleton y organiza los componentes en capas funcionales.

## Estructura General

El sistema está dividido en dos capas principales:

### 1. **Frontend**
Encargado de la interacción con el usuario:
- `Interfaz de Usuario` (HTML + CSS): Define la estructura visual y estilos.
- `app.js`: Actúa como punto de entrada del sistema. Se encarga de recibir las acciones del usuario y redirigirlas hacia el controlador adecuado.

### 2. **Backend Lógico**
Gestiona la instancia y el almacenamiento
- `Singleton.js`: Instancia única que se asegura que solo exita una isntancia de almacenamiento.
- `storage.js`: Módulo de gestión del almacenamiento local (`localStorage`) del navegador. Se encarga de persistir los datos.

## Patrón de diseño aplicado

**Singleton**: EL objeto donde se encapsuló toda la lógica relacionada con el almacenamiento en `LocalStorage`. Mediante el método `getInstance()`, se asegura que sólo exista una única instancia de `StorageManager`.

## Diagrama del diseño

El diagrama `diagrama_diseño_software.png` ubicado en esta misma carpeta (`docs/`) representa la arquitectura descrita, diferenciando claramente entre el frontend (interfaz y punto de entrada y controladores) y el backend lógico (instancia unica y almacenamiento).

## Archivos Relacionados

- `js/app.js`
- `singleton_ealvarez/singleton.js`
- `js/storage.js`
- `index.html`
- `docs/diagrama_diseño_software.png`
- `docs/diagrama_archimate.archimate` (archivo editable desde Archi)

---


