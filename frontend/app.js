let idEnEdicion = null;

function mostrarConsolas(consolas) {
  const contenedor = document.getElementById('lista-consolas');
  contenedor.innerHTML = '';

  consolas.forEach(function(consola) {
    const card = document.createElement('div');
    card.className = 'card';

    const imagen = document.createElement('img');
    imagen.src = consola.imagen;
    imagen.alt = consola.nombre;

    const titulo = document.createElement('h3');
    titulo.textContent = consola.nombre;

    const parrafoAño = document.createElement('p');
    parrafoAño.textContent = `Año: ${consola.año}`;

    const parrafoFabricante = document.createElement('p');
    parrafoFabricante.textContent = `Fabricante: ${consola.fabricante}`;

    const parrafoTipo = document.createElement('p');
    parrafoTipo.textContent = `Tipo: ${consola.tipo}`;

    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(parrafoAño);
    card.appendChild(parrafoFabricante);
    card.appendChild(parrafoTipo);

    contenedor.appendChild(card);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function() {
      const confirmado = confirm(`¿Seguro que quieres eliminar la consola "${consola.nombre}"?`);

      if (confirmado) {
        fetch(`http://localhost:3000/consolas/${consola.id}`, {
          method: "DELETE"
        })
        .then(function(respuesta) {
          return respuesta.json();
        })
        .then(function() {
          cargarConsolas();
        });
      }
    });

    card.appendChild(botonEliminar);

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';

    botonEditar.addEventListener('click', function() {
      document.getElementById("nombre").value = consola.nombre;
      document.getElementById("año").value = consola.año;
      document.getElementById("fabricante").value = consola.fabricante;
      document.getElementById("tipo").value = consola.tipo;
      document.getElementById("imagen").value = consola.imagen;

      idEnEdicion = consola.id;
      document.getElementById("btn-submit-form").textContent = "Guardar cambios";

      document.getElementById("form-consola").classList.remove("oculto");
      document.getElementById("form-consola").scrollIntoView({ behavior: 'smooth' });
    });

    card.appendChild(botonEditar);
  });
}

function cargarConsolas() {
  fetch('http://localhost:3000/consolas')
    .then(function(response) {
      return response.json();
    })
    .then(function(consolas) {
      mostrarConsolas(consolas);
    });
}

cargarConsolas();

document.getElementById("form-consola").addEventListener("submit", function(evento) {
  evento.preventDefault();

  const datosConsola = {
    nombre: document.getElementById("nombre").value,
    año: document.getElementById("año").value,
    fabricante: document.getElementById("fabricante").value,
    tipo: document.getElementById("tipo").value,
    imagen: document.getElementById("imagen").value
  };

  const url = idEnEdicion
    ? `http://localhost:3000/consolas/${idEnEdicion}`
    : "http://localhost:3000/consolas";

  const metodo = idEnEdicion ? "PUT" : "POST";

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosConsola)
  })
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function() {
      document.getElementById("form-consola").reset();
      document.getElementById("form-consola").classList.add("oculto");
      document.getElementById("btn-submit-form").textContent = "Agregar consola";
      idEnEdicion = null;
      cargarConsolas();
    });
});

document.getElementById("btn-mostrar-form").addEventListener("click", function() {
  document.getElementById("form-consola").classList.toggle("oculto");
});