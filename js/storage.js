const API_URL = "http://localhost/RopaControl/backend.php";

export async function obtenerPrendas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener prendas");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function guardarPrenda(prenda) {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prenda)
        });
    } catch (error) {
        console.error("Error al guardar prenda:", error);
    }
}

export async function actualizarPrenda(prenda) {
    try {
        await fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prenda)
        });
    } catch (error) {
        console.error("Error al actualizar prenda:", error);
    }
}

export async function eliminarPrenda(id) {
    try {
        await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
    } catch (error) {
        console.error("Error al eliminar prenda:", error);
    }
}
