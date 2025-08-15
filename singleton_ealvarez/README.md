### 💡 Implementación del Patrón de Diseño Singleton

El patrón **Singleton** es un patrón de diseño creacional que asegura que una clase tenga una **única instancia** y que se pueda acceder a ella de forma global desde cualquier parte de la aplicación. Es ideal para gestionar recursos compartidos, como por ejemplo, el **almacenamiento local** del navegador.

---

### ¿Cómo se implementó?

La implementación se encuentra en el archivo **`singleton.js`** dentro de la carpeta `singleton_EAlvarez/`.

1.  **Clase `StorageManager`**: Se creó la clase `StorageManager` para centralizar toda la lógica de interacción con el almacenamiento local.
2.  **Mecanismo Singleton**: En el constructor, se verifica si `StorageManager.instance` ya existe. Si la instancia ya fue creada, se devuelve la existente en lugar de crear una nueva. Si no, se crea y se asigna a `StorageManager.instance`. Esto garantiza que, sin importar cuántas veces se intente instanciar, siempre se obtendrá el mismo objeto.
3.  **Acceso global y protección**: Se exporta una única instancia (`const instance = new StorageManager();`) que ya está inicializada. Además, se utiliza `Object.freeze(instance)` para evitar que el objeto sea modificado o que se le añadan nuevas propiedades, lo que garantiza su inmutabilidad y estabilidad en toda la aplicación.

---

### ¿Qué hace esta implementación?

El Singleton **`StorageManager`** actúa como un punto de acceso centralizado para gestionar el inventario de prendas. Proporciona métodos como **`obtenerPrendas`**, **`guardarPrenda`** y **`eliminarPrenda`** para interactuar de forma segura con los datos.

Gracias a este patrón, toda la aplicación utiliza el **mismo objeto** para interactuar con el almacenamiento, lo que previene la creación de múltiples gestores y asegura la **consistencia de los datos**. Esto evita errores y duplicaciones, garantizando que el estado del inventario sea siempre el mismo, sin importar desde qué parte de la aplicación se acceda a él.