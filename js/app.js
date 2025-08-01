// Se obtiene la instancia única del gestor de almacenamiento (Singleton)
const storage = StorageManager.getInstance();

// Clase que representa una prenda de ropa
class Ropa {
    constructor(id, nombre, talla, precio) {
        this.id = id;
        this.nombre = nombre;
        this.talla = talla;
        this.precio = precio;
    }
}

// Clase que maneja la interfaz de usuario (Vista)
class RopaVista {
    constructor() {
        // Elementos del DOM relacionados con la vista
        this.lista = document.getElementById("lista-ropa");
        this.formulario = document.getElementById("formulario-ropa");
        this.tipo = document.getElementById("tipo");
        this.talla = document.getElementById("talla");
        this.precio = document.getElementById("precio");
        this.id = document.getElementById("id");
    }

    // Obtiene los datos ingresados en el formulario
    obtenerDatosFormulario() {
        return {
            id: this.id.value || Date.now().toString(), // Usa timestamp como ID si no hay uno
            tipo: this.tipo.value,
            talla: this.talla.value,
            precio: this.precio.value
        };
    }

    // Limpia todos los campos del formulario
    limpiarFormulario() {
        this.id.value = "";
        this.tipo.value = "";
        this.talla.value = "";
        this.precio.value = "";
    }

    // Muestra las prendas en la tabla
    mostrarRopa(listaRopa) {
        this.lista.innerHTML = ""; // Limpia contenido previo
        listaRopa.forEach(prenda => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${prenda.id}</td>
                <td>${prenda.nombre}</td>
                <td>${prenda.talla}</td>
                <td>${formatearPrecio(prenda.precio)}</td>
                <td>
                    <button class="edit-btn" data-id="${prenda.id}">Editar</button>
                    <button class="delete-btn" data-id="${prenda.id}">Eliminar</button>
                </td>
            `;
            this.lista.appendChild(fila);
        });
    }
}

// Instancia de la vista
const vista = new RopaVista();

// Controlador que maneja los eventos principales
function iniciarControlador() {
    // Evento para manejar el envío del formulario
    vista.formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recargar la página
        const datos = vista.obtenerDatosFormulario();

        const prenda = new Ropa(datos.id, datos.tipo, datos.talla, datos.precio);

        storage.guardarPrenda(prenda); // Guarda la prenda en el almacenamiento
        vista.mostrarRopa(storage.obtenerPrendas()); // Actualiza la vista
        vista.limpiarFormulario(); // Limpia el formulario
        document.getElementById("titulo-formulario").textContent = "Agregar Producto";
    });

    // Evento para editar o eliminar una prenda
    vista.lista.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains("delete-btn")) {
            // Eliminar prenda
            storage.eliminarPrenda(id);
            vista.mostrarRopa(storage.obtenerPrendas());
        } else if (e.target.classList.contains("edit-btn")) {
            // Editar prenda
            const prenda = storage.obtenerPrendas().find(p => p.id === id);
            if (prenda) {
                vista.id.value = prenda.id;
                vista.tipo.value = prenda.nombre;
                vista.talla.value = prenda.talla;
                vista.precio.value = prenda.precio;

                // Lanza el evento 'change' para actualizar las tallas
                const evento = new Event('change');
                vista.tipo.dispatchEvent(evento);

                document.getElementById("titulo-formulario").textContent = "Editar Producto";
            }
        }
    });

    // Mostrar todas las prendas al iniciar
    vista.mostrarRopa(storage.obtenerPrendas());
}

// Objeto que relaciona tipos de prenda con sus tallas disponibles
const tallasPorTipo = {
    sueter: ['S', 'M', 'L', 'XL'],
    pantalon: ['28', '30', '32', '34', '36'],
    camisa: ['XS', 'S', 'M', 'L', 'XL'],
    otra: ['Única']
};

// Formatea un valor numérico como precio en pesos colombianos
function formatearPrecio(valor) {
    return `$ ${parseFloat(valor).toLocaleString('es-CO')}`;
}

// Hace que la función de formatear sea accesible globalmente
window.formatearPrecio = formatearPrecio;

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    iniciarControlador();

    const tipo = document.getElementById('tipo');
    const talla = document.getElementById('talla');
    const formulario = document.getElementById('formulario-ropa');
    const tituloFormulario = document.getElementById('titulo-formulario');

    // Actualiza las tallas disponibles al cambiar el tipo de prenda
    tipo.addEventListener('change', () => {
        const opciones = tallasPorTipo[tipo.value] || [];
        talla.innerHTML = '<option value="" disabled selected>Talla</option>';
        opciones.forEach(t => {
            const option = document.createElement('option');
            option.value = t;
            option.textContent = t;
            talla.appendChild(option);
        });
    });

    // Cambia el título del formulario según sea agregar o editar
    formulario.addEventListener('submit', () => {
        const id = document.getElementById('id').value;
        tituloFormulario.textContent = id ? "Editar producto" : "Agregar producto";
    });

    // Búsqueda por tipo o talla
    document.getElementById("busqueda").addEventListener("input", function () {
        const termino = this.value.toLowerCase();
        const prendas = storage.obtenerPrendas();

        // Filtra prendas que coincidan con el término de búsqueda
        const filtradas = prendas.filter(prenda =>
            prenda.nombre.toLowerCase().includes(termino) ||
            prenda.talla.toLowerCase().includes(termino)
        );

        vista.mostrarRopa(filtradas); // Muestra resultados filtrados
    });
});
