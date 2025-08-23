import StorageManager from '../singleton_ealvarez/singleton.js';

// ========================
// MODELO
// ========================
class Ropa {
    constructor(id, tipo, talla, precio, cantidad, descripcion) {
        this.id = id;
        this.tipo = tipo;
        this.talla = talla;
        this.precio = precio;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }
}

// ========================
// VISTA
// ========================
class RopaVista {
    constructor() {
        this.lista = document.getElementById("lista-ropa");
        this.formulario = document.getElementById("formulario-ropa");
        this.tipo = document.getElementById("tipo");
        this.talla = document.getElementById("talla");
        this.precio = document.getElementById("precio");
        this.cantidad = document.getElementById("cantidad");
        this.descripcion = document.getElementById("descripcion");
        this.id = document.getElementById("id");
    }

    obtenerDatosFormulario() {
        return {
            id: this.id.value || Date.now().toString(),
            tipo: this.tipo.value,
            talla: this.talla.value,
            precio: parseFloat(this.precio.value) || 0,
            cantidad: parseInt(this.cantidad.value) || 0,
            descripcion: this.descripcion.value
        };
    }

    limpiarFormulario() {
        this.id.value = "";
        this.tipo.value = "";
        this.talla.innerHTML = '<option value="" disabled selected>Talla</option>';
        this.precio.value = "";
        this.cantidad.value = "";
        this.descripcion.value = "";
    }

    mostrarRopa(listaRopa, esEmpleado = false) {
        this.lista.innerHTML = "";

        // Ocultar la columna de acciones si es empleado
        const thAcciones = document.querySelector("th.acciones-col");
        if (esEmpleado && thAcciones) {
            thAcciones.remove();
        }

        listaRopa.forEach(prenda => {
            const fila = document.createElement("tr");

            if (esEmpleado) {
                // Solo mostrar datos básicos sin acciones
                fila.innerHTML = `
                    <td>${prenda.id}</td>
                    <td>${prenda.tipo}</td>
                    <td>${prenda.talla}</td>
                    <td>${formatearPrecio(prenda.precio)}</td>
                    <td>${prenda.cantidad}</td>
                    <td>${prenda.descripcion}</td>
                `;
            } else {
                // Mostrar tabla completa con botones
                fila.innerHTML = `
                    <td>${prenda.id}</td>
                    <td>${prenda.tipo}</td>
                    <td>${prenda.talla}</td>
                    <td>${formatearPrecio(prenda.precio)}</td>
                    <td>${prenda.cantidad}</td>
                    <td>${prenda.descripcion}</td>
                    <td>
                        <button class="edit-btn" data-id="${prenda.id}">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="delete-btn" data-id="${prenda.id}">
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                    </td>
                `;
            }

            this.lista.appendChild(fila);
        });
    }
}

// ========================
// CONTROLADOR
// ========================
const vista = new RopaVista();
const tallasPorTipo = {
    sueter: ['S', 'M', 'L', 'XL'],
    pantalon: ['28', '30', '32', '34', '36'],
    camisa: ['XS', 'S', 'M', 'L', 'XL'],
    otra: ['Única']
};

function formatearPrecio(valor) {
    return `$ ${parseFloat(valor).toLocaleString('es-CO')}`;
}

// Función para controlar visibilidad según rol
async function controlarVisibilidadPorRol() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    const esEmpleado = usuarioActual && (usuarioActual.rol === "empleado" || usuarioActual.role === "employee");

    // Ocultar formulario si es empleado
    if (esEmpleado && vista.formulario) {
        vista.formulario.style.display = "none";
    }

    // Obtener prendas
    const listaPrendas = await StorageManager.obtenerPrendas();
    vista.mostrarRopa(listaPrendas, esEmpleado);
}

// Iniciar controlador para admin
async function iniciarControlador() {
    // Cambio de tipo -> actualizar tallas
    vista.tipo.addEventListener("change", () => {
        const opciones = tallasPorTipo[vista.tipo.value] || [];
        vista.talla.innerHTML = '<option value="" disabled selected>Talla</option>';
        opciones.forEach(t => {
            const option = document.createElement('option');
            option.value = t;
            option.textContent = t;
            vista.talla.appendChild(option);
        });
    });

    // Guardar o editar prenda
    vista.formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = vista.obtenerDatosFormulario();
        const prenda = new Ropa(datos.id, datos.tipo, datos.talla, datos.precio, datos.cantidad, datos.descripcion);

        const listaPrendas = await StorageManager.obtenerPrendas();
        const existe = listaPrendas.some(p => p.id === prenda.id);

        if (existe) {
            await StorageManager.actualizarPrenda(prenda);
            mostrarMensaje("Producto editado con éxito", "warning");
        } else {
            await StorageManager.guardarPrenda(prenda);
            mostrarMensaje("Producto guardado correctamente", "success");
        }

        // Refrescar lista
        const listaActualizada = await StorageManager.obtenerPrendas();
        vista.mostrarRopa(listaActualizada);
        vista.limpiarFormulario();
        document.getElementById("titulo-formulario").textContent = "Agregar Producto";
    });

    // Editar o eliminar desde la lista
    vista.lista.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains("delete-btn")) {
            await StorageManager.eliminarPrenda(id);
            const listaActualizada = await StorageManager.obtenerPrendas();
            vista.mostrarRopa(listaActualizada);
            mostrarMensaje("Producto eliminado correctamente", "error");
        }

        if (e.target.classList.contains("edit-btn")) {
            const prenda = (await StorageManager.obtenerPrendas()).find(p => p.id === id);
            if (!prenda) return;

            vista.id.value = prenda.id;
            vista.tipo.value = prenda.tipo;

            // Llenar tallas según tipo
            const evento = new Event('change');
            vista.tipo.dispatchEvent(evento);

            // Seleccionar la talla correspondiente
            vista.talla.value = prenda.talla;

            vista.precio.value = prenda.precio;
            vista.cantidad.value = prenda.cantidad;
            vista.descripcion.value = prenda.descripcion;
            document.getElementById("titulo-formulario").textContent = "Editar Producto";
        }
    });

    // Buscador
    document.getElementById("busqueda").addEventListener("input", async function () {
        const termino = this.value.toLowerCase();
        const prendas = await StorageManager.obtenerPrendas();

        const filtradas = prendas.filter(prenda =>
            prenda.tipo.toLowerCase().includes(termino) ||
            prenda.talla.toLowerCase().includes(termino)
        );

        const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
        const esEmpleado = usuarioActual && (usuarioActual.rol === "empleado" || usuarioActual.role === "employee");

        vista.mostrarRopa(filtradas, esEmpleado);
    });
}

// ========================
// MENSAJES
// ========================
function mostrarMensaje(texto, tipo = "success") {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.style.display = "none";
    }, 3000);
}

// ========================
// INICIALIZACIÓN
// ========================
document.addEventListener("DOMContentLoaded", async () => {
    await controlarVisibilidadPorRol(); // Control de visibilidad según rol
    await iniciarControlador();         // Inicializar eventos

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioActual");
            window.location.href = "login.html";
        });
    }
});
