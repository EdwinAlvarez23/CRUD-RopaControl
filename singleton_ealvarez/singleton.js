const API_URL = "http://localhost/RopaControl/backend.php";

class StorageManager {
    constructor() {
        // Patrón Singleton: si ya existe una instancia, retorna esa misma
        if (!StorageManager.instance) StorageManager.instance = this;
        return StorageManager.instance;
    }

    // Obtener todas las prendas desde el backend
    async obtenerPrendas() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Error al obtener prendas");
            return await res.json();
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // Guardar una prenda nueva
    async guardarPrenda(prenda) {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prenda)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            console.error("Error al guardar prenda:", err);
            return { success: false, error: err.message };
        }
    }

    // Actualizar una prenda existente
    async actualizarPrenda(prenda) {
        try {
            const res = await fetch(API_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prenda)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            console.error("Error al actualizar prenda:", err);
            return { success: false, error: err.message };
        }
    }

    // Eliminar una prenda por ID
    async eliminarPrenda(id) {
        try {
            const res = await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            console.error("Error al eliminar prenda:", err);
            return { success: false, error: err.message };
        }
    }
}

// Exporta una instancia del Singleton
export default new StorageManager();
