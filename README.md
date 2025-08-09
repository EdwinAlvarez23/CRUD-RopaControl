# RopaControl – Sistema de Gestión de Inventario de Ropa versión-mejora de interfaz

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
- Mensajes de confirmación al agregar, editar o eliminar productos.
- Separacion del singleton y el localstorage: El singleton controla desde una única instancia para evitar inconsistencias y mejorar el rendimiento del almacenamiento mientras que el storage maneja el almacenamiento local.

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
│ │ └── login.css
│ ├── Logo.png
│ └── Logoo.png
├── docs/
│ ├── diagrama_archimate.archimate
│ └── diagrama_diseño_software.png
│ ├── diseño_sistema.md
│ └── evaluacion-interfaz.md
│ ├── instrucciones.txt
│ └── rediseño_interfaz_administrador_dibujo.jpg
│ ├── rediseño_interfaz_administrador.png
│ ├── rediseño_interfaz_empleado_dibujo.jpg
│ └── rediseño_interfaz_empleado.png
│ ├── rediseño_interfaz_inicio_dibujo.png
│ └── rediseño_interfaz_inicio.png
├── js/
│ ├── app.js
│ ├── login.js
│ └── storage.js
├── singleton_ealvarez/
│ ├── singleton.js
│ └── README.md
├── .hintrc
├── index.html
├── login.html
├── README.md
└── scrum-notes.md

---

## Mejora de la Interfaz de Usuario (rama interfaz)

En esta etapa se propuso un rediseño de la interfaz gráfica para optimizar la claridad, eficiencia y experiencia de usuario. Aunque las nuevas funcionalidades ya han sido implementadas parcialmente, se han realizado los siguientes aportes:  

**Diseño digital y boceto a mano** del nuevo flujo de interfaz para administrador y empleado.  
**Inclusión de campos adicionales** para registrar la cantidad y la descripción del producto.  
**Control numérico** para ajustar la cantidad de productos de forma precisa.  
**Botones de acción con íconos intuitivos** para agregar, editar y eliminar productos.  
**Mensajes de confirmación** al agregar, editar o eliminar un producto.  
**Archivo `evaluacion-interfaz.md`** con checklist de criterios de usabilidad.  

**Archivos relacionados**:  
- `docs/rediseño_interfaz_inicio.png`  
- `docs/rediseño_interfaz_administrador.png`  
- `docs/rediseño_interfaz_empleado.png`  
- `docs/rediseño_interfaz_inicio_dibujo.png`  
- `docs/rediseño_interfaz_administrador_dibujo.jpg`  
- `docs/rediseño_interfaz_empleado_dibujo.jpg`  
- `docs/evaluacion-interfaz.md`  

---

## Instrucciones de Uso

1. Clona o descarga el repositorio.
2. Abre el archivo `login.html` en tu navegador ingresa como administrador ingresando admin y admin123, como empleado igresa empleado y empleado123.
3. Usa el formulario para registrar nuevos productos, editar, eliminar como administrador.
4. Visualiza los productos desde la tabla como empleado.
5. La información se guarda automáticamente en el navegador (LocalStorage) mediante una unica instancia controlada por el Singleton.
6. Puedes crear nuevo usuarios, eliminar usuario usando el usuario y contraseña como administrador.

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
