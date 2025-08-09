import StorageManager from '../singleton_ealvarez/singleton.js';

// ========================
// MODELO
// ========================
class Ropa {
    constructor(id, nombre, talla, precio, cantidad, descripcion) {
        this.id = id;
        this.nombre = nombre;
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
            precio: this.precio.value,
            cantidad: this.cantidad.value,
            descripcion: this.descripcion.value
        };
    }

    limpiarFormulario() {
        this.id.value = "";
        this.tipo.value = "";
        this.talla.value = "";
        this.precio.value = "";
        this.cantidad.value = "";
        this.descripcion.value = "";
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

    const prenda = new Ropa(
        datos.id,
        datos.tipo,
        datos.talla,
        datos.precio,
        datos.cantidad,
        datos.descripcion
    );

    const prendas = StorageManager.obtenerPrendas();
    const existe = prendas.some(p => p.id === prenda.id);

    if (existe) {
        mostrarMensaje("Producto editado con éxito", "warning");
    } else {
        mostrarMensaje("Producto guardado correctamente", "success");
    }

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
    mostrarMensaje("Producto eliminado correctamente", "error");
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
                vista.cantidad.value = prenda.cantidad;
                vista.descripcion.value = prenda.descripcion;
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
function mostrarMensaje(texto, tipo = "success") {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.style.display = "none";
    }, 3000);
}
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    // Limpia datos de sesión (si guardaste algo, bórralo aquí)
    // localStorage.removeItem('usuarioActual'); // ← si usas una clave así

    // Simplemente redirige al login
    window.location.href = "login.html";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const formulario = document.getElementById("formulario-ropa");
  const acciones = document.querySelectorAll(".edit-btn, .delete-btn");

  const usuarioActual = localStorage.getItem("usuarioActual");
  if (usuarioActual) {
    const user = JSON.parse(usuarioActual);
    if (user.rol === "empleado") {
      // Oculta formulario de agregar producto
      if (formulario) formulario.style.display = "none";

      // Oculta botones de editar y eliminar después de renderizar productos
      setTimeout(() => {
        document.querySelectorAll(".edit-btn, .delete-btn").forEach(btn => {
          btn.style.display = "none";
        });
      }, 100);
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActual");
      window.location.href = "login.html";
    });
  }
});

  document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    if (usuarioActual && usuarioActual.role === "employee") {
      // Ocultar el formulario
      const formulario = document.getElementById("formulario-ropa");
      if (formulario) formulario.style.display = "none";

      // Ocultar la cabecera de acciones
      const thAcciones = document.querySelector("th.acciones-col");
      if (thAcciones) thAcciones.remove(); // Eliminamos completamente

      // Función para limpiar las acciones de cada fila
      const limpiarAcciones = () => {
        document.querySelectorAll("#lista-ropa tr").forEach(tr => {
          const tdAcciones = tr.querySelector("td:last-child");
          if (tdAcciones) tdAcciones.remove(); // Eliminamos toda la celda
        });
      };

      // Observar cambios en la tabla y limpiar cada vez que se agregue contenido
      const listaRopa = document.getElementById("lista-ropa");

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            limpiarAcciones();
          }
        }
      });

      observer.observe(listaRopa, { childList: true });

      // Llamada inicial por si ya hay datos cargados
      limpiarAcciones();
    }
  });