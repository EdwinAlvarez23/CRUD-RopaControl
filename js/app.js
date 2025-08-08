import StorageManager from '../singleton_ealvarez/singleton.js';

// ========================
// MODELO
// ========================
class Ropa {
    constructor(id, nombre, talla, precio) {
        this.id = id;
        this.nombre = nombre;
        this.talla = talla;
        this.precio = precio;
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
        this.id = document.getElementById("id");
    }

    obtenerDatosFormulario() {
        return {
            id: this.id.value || Date.now().toString(),
            tipo: this.tipo.value,
            talla: this.talla.value,
            precio: this.precio.value
        };
    }

    limpiarFormulario() {
        this.id.value = "";
        this.tipo.value = "";
        this.talla.value = "";
        this.precio.value = "";
    }

    mostrarRopa(listaRopa) {
        this.lista.innerHTML = "";
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

// ========================
// CONTROLADOR
// ========================
const vista = new RopaVista();

function iniciarControlador() {
    vista.formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const datos = vista.obtenerDatosFormulario();

        const prenda = new Ropa(datos.id, datos.tipo, datos.talla, datos.precio);
        StorageManager.guardarPrenda(prenda);
        vista.mostrarRopa(StorageManager.obtenerPrendas());
        vista.limpiarFormulario();
        document.getElementById("titulo-formulario").textContent = "Agregar Producto";
    });

    vista.lista.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains("delete-btn")) {
            StorageManager.eliminarPrenda(id);
            vista.mostrarRopa(StorageManager.obtenerPrendas());
        } else if (e.target.classList.contains("edit-btn")) {
            const prenda = StorageManager.obtenerPrendas().find(p => p.id === id);
            if (prenda) {
                vista.id.value = prenda.id;
                vista.tipo.value = prenda.nombre;

                const evento = new Event('change');
                vista.tipo.dispatchEvent(evento);

                setTimeout(() => {
                    vista.talla.value = prenda.talla;
                }, 0);

                vista.precio.value = prenda.precio;
                document.getElementById("titulo-formulario").textContent = "Editar Producto";
            }
        }
    });

    vista.mostrarRopa(StorageManager.obtenerPrendas());
}

// ========================
// INICIALIZACIÓN
// ========================
const tallasPorTipo = {
    sueter: ['S', 'M', 'L', 'XL'],
    pantalon: ['28', '30', '32', '34', '36'],
    camisa: ['XS', 'S', 'M', 'L', 'XL'],
    otra: ['Única']
};

function formatearPrecio(valor) {
    return `$ ${parseFloat(valor).toLocaleString('es-CO')}`;
}

document.addEventListener("DOMContentLoaded", () => {
    iniciarControlador();

    const tipo = document.getElementById('tipo');
    const talla = document.getElementById('talla');
    const formulario = document.getElementById('formulario-ropa');
    const tituloFormulario = document.getElementById('titulo-formulario');

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

    formulario.addEventListener('submit', () => {
        const id = document.getElementById('id').value;
        tituloFormulario.textContent = id ? "Editar producto" : "Agregar producto";
    });

    document.getElementById("busqueda").addEventListener("input", function () {
        const termino = this.value.toLowerCase();
        const prendas = StorageManager.obtenerPrendas();

        const filtradas = prendas.filter(prenda =>
            prenda.nombre.toLowerCase().includes(termino) ||
            prenda.talla.toLowerCase().includes(termino)
        );

        vista.mostrarRopa(filtradas);
    });
});
