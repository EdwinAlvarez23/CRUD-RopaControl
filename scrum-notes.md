# 🌀 Notas de Scrum – Proyecto Gestión de Inventario de Ropa

## Roles
- **Scrum Master**: Leli Liliana Díaz Izquierdo
- **Product Owner**: Edwin Fabián Álvarez Jiménez 
- **Development Team**: Jesús Esteban Álvarez Jimenez y Luis Alberto Montiel Diaz  

---

## Sprint 1 – Integración de Singleton y Módulo de Almacenamiento

### Objetivo
Integrar el patrón **Singleton** en `singleton.js` para centralizar la gestión de `localStorage` en `storage.js`, dejando a `app.js` la lógica principal de la interfaz y operaciones del inventario.

### Historias de Usuario
1. Como desarrollador, quiero que el acceso a `localStorage` esté encapsulado en una única instancia para evitar inconsistencias y duplicación de código.  
2. Como usuario, quiero que los productos agregados al inventario se mantengan guardados aunque cierre y vuelva a abrir el navegador.  

### Tareas
- [x] Crear `storage.js` para gestionar la persistencia con `localStorage`.  
- [x] Implementar `singleton.js` para garantizar una única instancia del gestor de almacenamiento.  
- [x] Adaptar `app.js` para que utilice el `StorageManager` del Singleton en lugar de manejar directamente el almacenamiento.
- [x]Verificar funcionamiento de agregar y eliminar productos  
- [ ] Agregar funcionalidad para **editar productos** con persistencia.  



### Retroalimentación
La separación de responsabilidades ahora es más clara: `app.js` maneja la lógica principal, `singleton.js` controla la instancia única y `storage.js` se encarga de la persistencia. Falta completar la funcionalidad de **edición** y realizar pruebas de estabilidad en operaciones de eliminación y actualización.
