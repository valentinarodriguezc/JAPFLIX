document.addEventListener('DOMContentLoaded', function() {
    // Variable para almacenar el listado de películas
    let peliculas = [];

    // Hacer la solicitud fetch a la URL
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            // Almacenar los datos en la variable 'peliculas'
            peliculas = data;
            mostrarPeliculas(peliculas); // Llama a la función para mostrar todas las películas
            //Datos cargados, pero no se muestran en la página
            console.log('Películas cargadas:', peliculas); // Solo para verificar en consola
        })
        .catch(error => console.error('Error al cargar las películas:', error));
});

// Función que se ejecuta cuando la página carga
window.onload = async function () {
  try {
    // Solicitud para obtener los datos de las películas
    const response = await fetch(
      "https://japceibal.github.io/japflix_api/movies-data.json"
    );
    peliculas = await response.json(); // Guardamos las películas en la variable 'peliculas'
  } catch (error) {
    console.error("Error al cargar las películas:", error); // Mostramos un error si la carga falla
  }
};

// Función que se ejecuta cuando se hace clic en el botón de buscar
document.getElementById("btnBuscar").addEventListener("click", function () {
  const inputBuscar = document
    .getElementById("inputBuscar")
    .value.toLowerCase(); // Obtenemos el texto del campo de búsqueda y lo convertimos a minúsculas
  const lista = document.getElementById("lista");
  lista.innerHTML = ""; // Limpiamos la lista antes de mostrar resultados

  if (inputBuscar.trim() !== "") {
    // Solo buscamos si el campo no está vacío
    const resultados = peliculas.filter(
      (pelicula) =>
        pelicula.title.toLowerCase().includes(inputBuscar) ||
        pelicula.genres.join(", ").toLowerCase().includes(inputBuscar) ||
        pelicula.tagline.toLowerCase().includes(inputBuscar) ||
        pelicula.overview.toLowerCase().includes(inputBuscar)
    );

    // Mostramos los resultados en la lista
    resultados.forEach((pelicula) => {
      const item = document.createElement("li");
      item.classList.add("list-group-item", "bg-dark", "text-light");
      item.innerHTML = `
        <h5>${pelicula.title}</h5>
        <p>${pelicula.tagline}</p>
        <p>${renderStars(pelicula.vote_average)}</p>
      `;
      item.addEventListener("click", function () {
        mostrarDetallePelicula(pelicula); // Mostramos los detalles de la película seleccionada
      });
      lista.appendChild(item);
    });
  }
});

// Función para mostrar estrellas según el vote_average
function renderStars(vote) {
  const maxStars = 5;
  const filledStars = Math.round(vote / 2);
  return "★".repeat(filledStars) + "☆".repeat(maxStars - filledStars);
}

// Función para mostrar detalles de la película en un contenedor superior
function mostrarDetallePelicula(pelicula) {
  // Buscamos el contenedor superior o lo creamos si no existe
  let detalleContainer = document.getElementById("detalleContainer");
  if (!detalleContainer) {
    detalleContainer = document.createElement("div");
    detalleContainer.id = "detalleContainer";
    detalleContainer.classList.add("bg-dark", "text-light", "p-3", "fixed-top");
    document.body.prepend(detalleContainer);
  }

  // Limpiamos el contenido anterior del contenedor
  detalleContainer.innerHTML = `
    <div class="d-flex justify-content-between">
      <div>
        <h3>${pelicula.title}</h3>
        <p>${pelicula.overview}</p>
         <p>Géneros: ${pelicula.genres.map(genero => genero.name).join(", ")}</p> <!-- Cambiado aquí -->
            </div>
      <div>
        ${renderDropdown(
          pelicula
        )} <!-- Llamamos a la función para mostrar el botón desplegable -->
      </div>
    </div>
    <button class="btn btn-danger mt-2" id="closeDetalle">Cerrar</button>
  `;

  // Añadimos funcionalidad al botón de cerrar
  document
    .getElementById("closeDetalle")
    .addEventListener("click", function () {
      detalleContainer.remove(); // Eliminamos el contenedor de detalles cuando se cierra
    });
}

// Función para mostrar un dropdown con más información de la película
function renderDropdown(pelicula) {
  return `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Más información
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li><strong>Año de lanzamiento:</strong> ${
          pelicula.release_date.split("-")[0]
        }</li>
        <li><strong>Duración:</strong> ${pelicula.runtime} minutos</li>
        <li><strong>Presupuesto:</strong> $${pelicula.budget.toLocaleString()}</li>
        <li><strong>Ganancias:</strong> $${pelicula.revenue.toLocaleString()}</li>
      </ul>
    </div>
  `;
}
