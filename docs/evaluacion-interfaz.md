# Evaluación y Rediseño de la Interfaz – RopaControl

## Objetivo

Evaluar la interfaz de usuario actual del sistema **RopaControl** y proponer mejoras que incrementen su claridad, interactividad y usabilidad, con base en principios de diseño de interfaces.

---

## 1. Criterios de Evaluación

| Criterio             | Descripción                                                              | ¿Cumple?   | Observaciones                                                                                                         |
| -------------------- | ------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| **Claridad**         | Etiquetas y campos son comprensibles y están bien distribuidos.          | ✅ Sí       | La disposición vertical de los campos facilita su comprensión. Puedes agregar íconos o tooltips para mejorar aún más. |
| **Consistencia**     | El uso de colores y estilos es uniforme en toda la vista.                | ✅ Sí       | Buena coherencia entre secciones. El azul como color principal está bien aplicado.                                    |
| **Interactividad**   | Se pueden realizar acciones como guardar, editar y eliminar productos.   | 🟡 Parcial | No hay cambios visuales al pasar el mouse (hover), ni retroalimentación al completar acciones. Faltan animaciones.    |
| **Accesibilidad**    | Considera facilidad de uso para personas con distintas capacidades.      | 🟡 Parcial | Se puede mejorar incluyendo un botón de alto contraste o ajuste de tamaño de letra.                                   |
| **Flexibilidad**     | Permite adaptar o modificar elementos sin alterar su estructura general. | ✅ Sí       | Diseño simple y modular, permite ampliaciones o rediseños fácilmente.                                                 |
| **Eficiencia**       | Permite completar tareas básicas como registrar y buscar productos.      | ✅ Sí       | La barra de búsqueda y los botones están bien ubicados para una gestión rápida.                                       |
| **Atractivo visual** | El diseño es estéticamente limpio, pero algo básico.                     | 🟡 Parcial | Podría ser más moderno. Se recomienda usar sombras suaves, bordes redondeados y tipografía más estilizada.            |

---

## 2. Propuestas de Mejora Implementadas (o sugeridas)

- Se crearon nuevas interfazes para entrar como administrador, empleado y cada uno ve un formulario diferente.
- Se agrego el campo de **Cantidad** ahora incluye flechas para aumentar o disminuir el valor.
- Se agrego el campo de **Descripcion del producto** para describir el prodcuto a agregar.
- Se recomienda agregar una miniatura o ícono representativo en la **Tabla de Productos**.
- Todos los botones clave (Guardar, Editar, Eliminar) deberían tener **íconos** que refuercen su función.
- Implementar **notificaciones visuales** con SweetAlert2 para confirmar acciones del usuario.
- Usar fuentes como **Poppins** o **Roboto** para mejorar legibilidad y estética.
- Añadir modo oscuro o alto contraste para accesibilidad.
- Antes de crear o eliminar un usuario se pide autenticacion del administrador para poder hacer la funcion.
- Se puede recuperar la contraseña solo ingresando el usuario.
- El formulario del administrador puedes agregar, editar, eliminar y buscar, mientras que en el del empleado solo puedes ver la tabla de los productos y buscar.

---

## 3. Evidencias del Rediseño

- **Diseño digital:** 
  - Ver archivo en docs/rediseño_interfaz_inicio.png.
  - Ver archivo en docs/rediseño_interfaz_administrador.png.
  - Ver archivo en docs/rediseño_interfaz_empleado.png.
- **Boceto tipo wireframe:**
  - Ver archivo en doc/.rediseño_interfaz_inicio_dibujo.png. 
  - Ver archivo en doc/.rediseño_interfaz_administrador_dibujo.jpg. 
  - Ver archivo en doc/.rediseño_interfaz_empleado_dibujo.jpg. 
  
---

## 4. Conclusiones

El rediseño de RopaControl busca una experiencia de usuario más moderna y accesible. Las mejoras propuestas impactan directamente en la claridad, estética e interacción, acercando el sistema a un producto más profesional, ideal para ser probado por usuarios reales. Se prioriza una estructura clara, botones descriptivos e integración de retroalimentación visual para fortalecer la usabilidad general.
