document.addEventListener('DOMContentLoaded', function() {
    // Variable para almacenar el listado de películas
    let peliculas = [];

    // Hacer la solicitud fetch a la URL
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            // Almacenar los datos en la variable 'peliculas'
            peliculas = data;

            //Datos cargados, pero no se muestran en la página
            console.log('Películas cargadas:', peliculas); // Solo para verificar en consola
        })
        .catch(error => console.error('Error al cargar las películas:', error));
});