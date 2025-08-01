# RopaControl – Sistema de Gestión de Inventario de Ropa version-2.0-singleton

Proyecto educativo desarrollado como parte del módulo **Ingeniería de Software II**, cuyo propósito es brindar una solución sencilla, funcional y escalable para el control de inventario en pequeños almacenes de ropa.

---

## Objetivos del proyecto

Este sistema permite aplicar conceptos clave de desarrollo de software, incluyendo:

- **Arquitectura MVC (Modelo – Vista – Controlador):** separación de responsabilidades para una estructura más limpia y mantenible.
- **Desarrollo incremental:** implementación paso a paso de funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar).
- **Escalabilidad:** pensado para ser ampliado con nuevos módulos como autenticación, alertas, reportes y conexión a base de datos.
- **Colaboración y control de versiones:** uso de herramientas como Git para gestionar cambios en equipo.

---

## Tecnologías utilizadas

- HTML5
- CSS3 (con diseño responsivo y personalizado)
- JavaScript (modular, con patrón Singleton)
- Almacenamiento en LocalStorage

---

## Funcionalidades actuales

- Registro de productos (tipo de prenda, talla, precio)
- Visualización dinámica en tabla
- Edición y actualización de productos existentes
- Eliminación de productos del inventario
- Busqueda mediante prendas y tallas

---
## Estructura del proyecto

RopaControl/
├── .vscode/
│   └── settings.json
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── Logo.png
│   └── Logoo.png
├── docs/
│   └── instrucciones.txt
├── js/
│   └── app.js
├── singleton_EAlvarez/
│   ├── singleton.js
│   └── README.md
├── .hintrc
├── index.html
└── README.md

---

## Instrucciones de uso

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. Usa el formulario para registrar nuevos productos.
4. Visualiza, edita o elimina los productos desde la tabla interactiva.
5. La información se guarda automáticamente en el navegador (LocalStorage).

---

## Licencia y uso

Este proyecto es **educativo** y está diseñado para fines formativos en Ingeniería de Software.  
Eres libre de adaptarlo, extenderlo o compartirlo siempre que se mantenga el crédito académico.

---

**Autor:**  
- Edwin Fabián Álvarez Jiménez  
**Fecha:** 02/08/2025  
**Materia:** Ingeniería de Software II
