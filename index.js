
//scroll down
document.addEventListener('DOMContentLoaded', function() {
    const botonHome = document.querySelector('.botonhome');
    const peliculasSection = document.querySelector('.peliculas');

    botonHome.addEventListener('click', function() {
      peliculasSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

document.addEventListener('DOMContentLoaded', async function () {
    // const urlParams = new URLSearchParams(window.location.search);
    // const movieId = urlParams.get('movieId');

    // // Hacer la solicitud para obtener la información de la película según el ID
    // if (movieId) {
    //     const response = await fetch(`http://localhost:3001/api/movies/${movieId}`);
    //     const movieData = await response.json();

    //     // Haz lo que necesites con la información de la película (puede ser mostrarla en la página)
    //     console.log(movieData);
    // } else {
    //     console.error('ID de película no proporcionado en la URL');
    // }




      


    try {
        const response = await fetch('http://localhost:3001/api/movies');
        const data = await response.json();
        const movieContainer = document.getElementById('movieContainer');
        let moviesAdded = 0; // Variable para rastrear la cantidad de películas agregadas
    
        data.forEach((movie, index) => {
            // Crear y agregar el subtítulo después de la primera fila de películas
            if (index === 5) {
                const subtitulo = document.createElement('p');
                subtitulo.classList.add('subtitulo1cartelera');
                subtitulo.textContent = 'NUEVAS PELÍCULAS';
                movieContainer.appendChild(subtitulo);
    
                // Crear y agregar la línea roja después del subtítulo
                const linearoja = document.createElement('div');
                linearoja.classList.add('linearoja');
                movieContainer.appendChild(linearoja);
            }
    
            // Agregar la imagen
            const img = document.createElement('img');
            img.src = `/imagenes/${movie.image}`;
            img.alt = movie.title;
            img.setAttribute('data-movie-id', movie.id);
            img.addEventListener('click', () => redirectToinfoPeli(movie.id));
    
            // Agregar una clase a cada imagen para aplicar estilos específicos
            img.classList.add('movie-image', 'rounded-image'); // Agregar clase 'rounded-image'
            movieContainer.appendChild(img);
    
            // Incrementar la variable después de agregar la película
            moviesAdded++;
        });
    
    } catch (error) {
        console.error(error);
    }
    

    

    function redirectToinfoPeli(movieId){
        window.location.href = `/infopeli.html?movieId=${movieId}`;
    }

    function redirectToVerificarButacas(movieId) {
        // Puedes realizar algún trabajo adicional aquí si es necesario
        window.location.href = `/verificarButacas.html?movieId=${movieId}`;
    }
}

    // Función para comprar boletos
    // window.buyTickets = async () => {
    //     const movieId = movieDropdown.value;
    //     const quantity = document.getElementById('quantity').value;

    //     try {
    //         // Hacer solicitud al servidor para comprar boletos
    //         const response = await fetch('http://localhost:3001/api/buy-tickets', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ movieId, quantity }),
    //         });

    //         const data = await response.json();

    //         // Mostrar mensaje y actualizar historial de transacciones
    //         alert(data.message);

    //         // Redirigir a la página de verificar butacas después de comprar
    //         window.location.href = '/verificarButacas.html';
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // Función asincrónica para cargar el historial de transacciones
    // const transactionHistory = document.getElementById('transactionHistory');

    // Limpiar el historial antes de agregar nuevas transacciones
    // transactionHistory.innerHTML = '';

//     try {
//         const response = await fetch('http://localhost:3001/api/transactions');
//         const data = await response.json();

//         // Agregar transacciones al historial
//         data.forEach(transaction => {
//             const transactionInfo = document.createElement('div');
//             transactionInfo.innerHTML = `
//                 <p>${transaction.movie.title} - Cantidad: ${transaction.quantity} - Fecha: ${transaction.date}</p>
//                 <hr>
//             `;
//             transactionHistory.appendChild(transactionInfo);
//         });
//     } catch (error) {
//         console.error(error);
//     }
 );