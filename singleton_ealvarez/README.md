## Implementación del patrón Singleton

### ¿En qué consiste el patrón Singleton?

El patrón Singleton es un patrón de diseño creacional que restringe la instanciación de una clase a un único objeto. Se utiliza para garantizar que una clase tenga una sola instancia y proporcionar un punto de acceso global a ella.

### ¿Cómo se implementó?

Se implementó el patrón Singleton en un archivo llamado `singleton.js`, ubicado en la carpeta `singleton_EAlvarez/`. Allí se encapsuló toda la lógica relacionada con el almacenamiento en `LocalStorage`. Mediante el método `getInstance()`, se asegura que sólo exista una única instancia de `StorageManager`.

### ¿Qué hace el ejemplo?

El Singleton gestiona el acceso a los métodos `obtenerPrendas`, `guardarPrenda` y `eliminarPrenda`, encargados de manejar el inventario en el almacenamiento local del navegador. Gracias al Singleton, toda la aplicación accede al mismo objeto, evitando duplicaciones innecesarias y manteniendo la consistencia de los datos.
