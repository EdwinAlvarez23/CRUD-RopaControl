// Implementación del patrón Singleton usando una IIFE (Immediately Invoked Function Expression)
const StorageManager = (function () {
    // Variable privada que almacenará la única instancia del objeto
    let instance;

    // Función que crea la instancia del gestor de almacenamiento
    function createInstance() {
        // Obtiene la lista de prendas almacenadas en localStorage
        function obtenerPrendas() {
            return JSON.parse(localStorage.getItem("ropa")) || [];
        }

        // Guarda una prenda en localStorage
        function guardarPrenda(prenda) {
            let prendas = obtenerPrendas(); // Obtiene la lista actual
            const indice = prendas.findIndex(p => p.id === prenda.id); // Busca si ya existe

            if (indice !== -1) {
                // Si ya existe, actualiza la prenda
                prendas[indice] = prenda;
            } else {
                // Si no existe, la agrega
                prendas.push(prenda);
            }

            // Guarda la lista actualizada en localStorage
            localStorage.setItem("ropa", JSON.stringify(prendas));
        }

        // Elimina una prenda por su ID
        function eliminarPrenda(id) {
            let prendas = obtenerPrendas();
            prendas = prendas.filter(p => p.id !== id); // Filtra las prendas distintas al ID
            localStorage.setItem("ropa", JSON.stringify(prendas)); // Guarda la lista filtrada
        }

        // Devuelve los métodos públicos del gestor
        return {
            obtenerPrendas,
            guardarPrenda,
            eliminarPrenda
        };
    }

    // Devuelve un objeto con el método getInstance
    return {
        // Método público para obtener la instancia única del StorageManager
        getInstance: function () {
            // Si no existe una instancia, la crea
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
