document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    if (movieId) {
        try {
            const response = await fetch(`http://localhost:3001/api/movies/${movieId}`);
            const movieData = await response.json();

            // Actualizar el contenido de la página con la información de la película
            updateMovieDetails(movieData);
        } catch (error) {
            console.error('Error al obtener la información de la película:', error);
        }
    } else {
        console.error('ID de película no proporcionado en la URL');
    }

    function updateMovieDetails(movie) {
        const movieDetails = document.getElementById('movieDetails');

        // Limpiar el contenido actual del contenedor
        movieDetails.innerHTML = '';

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        // Crear elementos para mostrar la información detallada
        const titleElement = document.createElement('h1');
        titleElement.textContent = movie.title;
        titleElement.classList.add('peliculatitulo');

        const directorElement = document.createElement('p');
        directorElement.textContent = `Director: ${movie.director}`;
        directorElement.classList.add('info');

        const actorsElement = document.createElement('p');
        actorsElement.textContent = `Actores: ${movie.actors}`;
        actorsElement.classList.add('info');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = movie.description;
        descriptionElement.classList.add('info');

        // Agregar elementos al contenedor de texto
        textContainer.appendChild(titleElement);
        textContainer.appendChild(directorElement);
        textContainer.appendChild(actorsElement);
        textContainer.appendChild(descriptionElement);

        // Agregar el contenedor de texto al contenedor principal
        movieDetails.appendChild(textContainer);

        // Agregar la imagen
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.alt = movie.title;
        img.classList.add('image');



        // Establecer la imagen como fondo de la página
        document.body.style.backgroundImage = `url(/imagenes/${movie.image}), linear-gradient(to left, transparent, rgba(0, 0, 0, 1))`;
        document.body.style.backgroundPosition = 'right';
        document.body.style.backgroundAttachment = 'fixed'; // Esto evita que la imagen de fondo se desplace con el contenido
        document.body.style.backgroundRepeat = 'no-repeat';

        // Verificar si es un dispositivo móvil y aplicar 'cover' en ese caso
        if (isMobileDevice()) {
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        } else {
            // Si no es un dispositivo móvil, aplicar 'contain'
            document.body.style.backgroundSize = 'contain';
        }

        // Crear el botón y agregarlo a movieDetails
        const button = document.createElement('button');
        button.textContent = 'Comprar';
        button.id = 'boton';
        movieDetails.appendChild(button);

        // Llama a la función redirectToVerificarButacas cuando se hace clic en el botón
        button.onclick = redirectToVerificarButacas;
    }

    function redirectToVerificarButacas() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movieId');

        if (movieId) {
            window.location.href = `/verificarButacas.html?movieId=${movieId}`;
        } else {
            console.error('ID de película no proporcionado');
        }
    }

    // Función para verificar si es un dispositivo móvil
    function isMobileDevice() {
        return window.innerWidth <= 767 && window.innerHeight <= 767;
    }
});
