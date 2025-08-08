# RopaControl – Sistema de Gestión de Inventario de Ropa versión-2.0-singleton

Proyecto educativo desarrollado como parte del módulo Ingeniería de Software II, cuyo propósito es brindar una solución sencilla, funcional y escalable para el control de inventario en pequeños almacenes de ropa. En esta versión se integran el patrón Singleton, la modularización del almacenamiento mediante storage.js y una interfaz moderna y responsiva.

---

## Objetivos del Proyecto

Este sistema permite aplicar conceptos clave del desarrollo de software, incluyendo:

- **Diseño de software estructurado:** separación de responsabilidades, patrón Singleton, modelo modular.      
- **Gestión de configuración:** organización por capas lógicas (frontend y backend), uso de ramas en Git.
- **Interfaz de usuario intuitiva:** diseño responsive con CSS3, enfocado en usabilidad.
- **Persistencia de datos local:** almacenamiento en localStorage mediante un módulo externo (storage.js).
- **Arquitectura simple en capas:** identificación de componentes frontend, lógica de negocio y persistencia.

---

## Tecnologías Utilizadas

- HTML5
- CSS3(con diseño responsivo y personalizado)
- JavaScript modular
- Patrón Singleton en JavaScript
- Almacenamiento en LocalStorage

---

## Funcionalidades Actuales

- Registro de productos (tipo de prenda, talla, precio)
- Visualización dinámica en tabla
- Edición y actualización de productos existentes
- Eliminación de productos del inventario
- Búsqueda mediante prendas y tallas
- Gestión centralizada del almacenamiento con Singleton: toda la lógica de acceso a `LocalStorage` es controlada desde una única instancia para evitar inconsistencias y mejorar el rendimiento.

---

## Diagrama del sistema (versión 2.1)

El sistema está dividido en dos capas principales:

[ Interfaz de Usuario ] | app.js → Singleton | storage.js

Este diseño modular facilita la trazabilidad del flujo de datos y separa claramente las responsabilidades.

---

## Estructura del Proyecto

RopaControl/
├── .vscode/
│ └── settings.json
├── assets/
│ ├── css/
│ │ └── style.css
│ ├── Logo.png
│ └── Logoo.png
├── docs/
│ ├── diagrama_archimate.archimate
│ └── diagrama_diseño_software.png
│ ├── diseño_sistema.md
│ └── instrucciones.md
├── js/
│ ├── app.js
│ └── storage.js
├── singleton_ealvarez/
│ ├── singleton.js
│ └── README.md
├── .hintrc
├── index.html
├── README.md
└── scrum-notes.md

---

## Instrucciones de Uso

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. Usa el formulario para registrar nuevos productos.
4. Visualiza, edita o elimina los productos desde la tabla interactiva.
5. La información se guarda automáticamente en el navegador (LocalStorage) mediante una unica instancia controlada por el Singleton.

---

## Licencia y Uso

Este proyecto es educativo y está diseñado para fines formativos en Ingeniería de Software.  
Eres libre de adaptarlo, extenderlo o compartirlo siempre que se mantenga el crédito académico.

---

**Autor:**  
- Edwin Fabián Álvarez Jiménez 
- Jesus Esteban Alvarez Jimenez
- Luis Alberto Montiel Diaz  
**Fecha:** 09/08/2025  
**Materia:** Ingeniería de Software II
**Versión:** 2.1 – CRUD modular con Singleton y manejo de almacenamiento externo
