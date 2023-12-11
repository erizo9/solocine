document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    let butacas = [];

    if (movieId) {
        try {
            const response = await fetch(`http://localhost:3001/api/movies/${movieId}`);
            const movieData = await response.json();
            console.log(movieData);

            addImages(movieData, movieId);

            // Ahora que tenemos el movieId, podemos inicializar las butacas
            const contenedorButacas = document.getElementById('contenedorButacas');
            butacas = Array.from(contenedorButacas.querySelectorAll('.butaca'));

            butacas.forEach(butaca => {
                verificarButaca(butaca);
                butaca.addEventListener('click', () => {
                    toggleButaca(butaca);
                    verificarButaca(butaca);
                });
            });

            // Llama a cargarEstadoButacas después de cargar las butacas para la película actual
            cargarEstadoButacas(movieId);
        } catch (error) {
            console.error('Error al obtener la información de la película:', error);
        }
    } else {
        console.error('ID de película no proporcionado en la URL');
    }

    function addImages(movie, movieId) {
        const movieDetails = document.getElementById('movieDetails');
        const titleElement = document.createElement('h1');
        titleElement.textContent = 'Detalles de la Película';

        const img = document.createElement('img');
        img.src = `/imagenes/${movie.image}`;
        img.alt = movie.title;
        img.setAttribute('data-movie-id', movie.id);
        movieDetails.insertBefore(img, movieDetails.firstChild);
    }

    async function verificarButaca(butaca) {
        try {
            const response = await fetch(`http://localhost:3001/api/verificar-butacas?butacas=${butaca.id}`);
            const data = await response.json();

            butaca.classList.toggle('ocupada', data.disponibles.length === 0);
        } catch (error) {
            console.error('Error al verificar butacas:', error);
        }
    }

    let total = 0;

    function toggleButaca(butaca) {
        const precio = 5; // Precio por butaca
    
        if (!butaca.classList.contains('ocupada') && !butaca.classList.contains('comprada')) {
            if (!butaca.classList.contains('selected')) {
                // La butaca no está seleccionada, así que la seleccionamos y sumamos el precio
                butaca.classList.add('selected');
                total += precio;
            } else {
                // La butaca ya está seleccionada, así que la deseleccionamos y restamos el precio
                butaca.classList.remove('selected');
                total -= precio;
            }
        }
    
        actualizarTotal(); // Llama a la función para actualizar el total en la interfaz
    }
    
    function actualizarTotal() {
        // Actualiza el elemento en el que muestras el total
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: ${total}€`;
    }

    function comprarButacas(movieId) {
        const butacasSeleccionadas = butacas.filter(butaca => butaca.classList.contains('selected'));
        const butacasOcupadas = butacasSeleccionadas.filter(butaca => butaca.classList.contains('ocupada'));

        if (butacasSeleccionadas.length === 0) {
            alert('Selecciona al menos una butaca antes de comprar.');
        } else if (butacasOcupadas.length > 0) {
            const ocupadasIds = butacasOcupadas.map(butaca => butaca.id).join(', ');
            alert(`Lo sentimos, las siguientes butacas seleccionadas están ocupadas: ${ocupadasIds}`);
            butacasOcupadas.forEach(butaca => butaca.classList.remove('selected'));
        } else {
            // Obtiene las butacas compradas actuales desde localStorage
            const butacasCompradas = JSON.parse(localStorage.getItem('butacasCompradas')) || {};
            
            // No hay redeclaración aquí
            const seleccionadasIds = butacasSeleccionadas.map(butaca => butaca.id).join(', ');

            alert(`¡Compra exitosa! Butacas seleccionadas: ${seleccionadasIds}\nTotal: ${total}€`);

            // Asegura que butacasCompradas[movieId] sea un array antes de usar push
            if (!Array.isArray(butacasCompradas[movieId])) {
                butacasCompradas[movieId] = [];
            }

            // Agrega las nuevas butacas compradas a la lista de la película actual
            butacasSeleccionadas.forEach(butaca => {
                if (!butacasCompradas[movieId].includes(butaca.id)) {
                    butacasCompradas[movieId].push(butaca.id);
                }
            });

            // Almacena la lista actualizada en localStorage
            localStorage.setItem('butacasCompradas', JSON.stringify(butacasCompradas));

            // Después de la compra, marca las butacas como compradas y deshabilita el evento click
            butacasSeleccionadas.forEach(butaca => {
                butaca.classList.add('comprada');
                butaca.classList.remove('selected');
                butaca.removeEventListener('click', toggleButaca);
            });
            redirectTopay();
        }
    }

    function cargarEstadoButacas(movieId) {
        const butacasCompradas = JSON.parse(localStorage.getItem('butacasCompradas')) || {};
        const butacasCompradasParaPelicula = butacasCompradas[movieId] || [];

        butacas.forEach(butaca => {
            if (butacasCompradasParaPelicula.includes(butaca.id)) {
                butaca.classList.add('comprada');
                butaca.removeEventListener('click', toggleButaca);
            }
        });
    }

    const comprarBtnDesktop = document.getElementById('comprarBtnDesktop');
    comprarBtnDesktop.addEventListener('click', () => comprarButacas(movieId));

    const comprarBtnMobile = document.getElementById('comprarBtnMobile');
    comprarBtnMobile.addEventListener('click', () => comprarButacas(movieId));

    // Función para redirigir a la página pay.html
    function redirectTopay() {
        if (movieId) {
            window.location.href = `/pay.html?movieId=${movieId}`;
        } else {
            console.error('ID de película no proporcionado');
        }
    }
});
