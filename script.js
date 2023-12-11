
const express = require('express');
const app = express();
const cors = require('cors');



app.use(express.json());
app.use(cors());

let movies = [
    { id: 1, image:'meg2.jpg', title: 'THE MEG 2', director: 'Jon turtle', actors: 'philipe marcus', description: 'es una película de acción y ciencia ficción dirigida por Jon Turteltaub y estrenada en 2018. La trama gira en torno a un grupo de científicos que deben detener a un megalodón' },
    { id: 2, image:'elhoyo.png' ,title: 'EL HOYO', director: 'Galder Gaztelu-Urrutia', actors: 'Martin Scorsese', description: 'es una película de ciencia ficción española dirigida por Galder Gaztelu-Urrutia, lanzada en 2019. La película se centra en un centro de reclusión vertical donde los prisioneros están dispuestos en celdas apiladas, y una plataforma de comida desciende a través de los niveles, dejando a los prisioneros de los niveles superiores con menos comida.' },
    { id: 3, image: 'mario.png', title: 'SUPER MARIO BROS', director: 'Martin Scorsese', actors: 'Leonardo DiCaprio', description: 'En el colorido Reino Champiñón, Mario y Luigi disfrutan de una vida tranquila como fontaneros hasta que un día, Bowser, el rey de los Koopas, lanza un malévolo plan para robar todos los champiñones mágicos del reino.' },
    { id: 4, image:'granturismo.png',title: 'GRAN TURISMO', director: 'Quentin Tarantino', actors: 'Meryl Streep', description: 'un talentoso piloto de carreras que, después de una serie de eventos inesperados, se encuentra en la oportunidad de su vida: competir en el torneo de carreras "Gran Turismo". ' },
    { id: 5, image:'meg2.jpg', title: 'THE MEG 2', director: 'Alfred Hitchcock', actors: 'philipe marcus', description: 'es una película de acción y ciencia ficción dirigida por Jon Turteltaub y estrenada en 2018. La trama gira en torno a un grupo de científicos que deben detener a un megalodón' },
    { id: 6, image:'elhoyo.png' ,title: 'EL HOYO', director: 'Ben Wheatley', actors: 'Julia Roberts', description: 'es una película de ciencia ficción española dirigida por Galder Gaztelu-Urrutia, lanzada en 2019. La película se centra en un centro de reclusión vertical donde los prisioneros están dispuestos en celdas apiladas, y una plataforma de comida desciende a través de los niveles, dejando a los prisioneros de los niveles superiores con menos comida.' },
    { id: 7, image: 'mario.png', title: 'SUPER MARIO BROS', director: 'Alfred Hitchcock', actors: 'Leonardo DiCaprio', description: 'En el colorido Reino Champiñón, Mario y Luigi disfrutan de una vida tranquila como fontaneros hasta que un día, Bowser, el rey de los Koopas, lanza un malévolo plan para robar todos los champiñones mágicos del reino.' },
    { id: 8, image:'granturismo.png',title: 'GRAN TURISMO', director: 'Quentin Tarantino', actors: 'Meryl Streep', description: 'un talentoso piloto de carreras que, después de una serie de eventos inesperados, se encuentra en la oportunidad de su vida: competir en el torneo de carreras "Gran Turismo".' },
    { id: 9, image: 'mario.png', title: 'SUPERMARIO BROS', director: 'Ben Wheatley', actors: 'Leonardo DiCaprio', description: 'En el colorido Reino Champiñón, Mario y Luigi disfrutan de una vida tranquila como fontaneros hasta que un día, Bowser, el rey de los Koopas, lanza un malévolo plan para robar todos los champiñones mágicos del reino.' },
    { id: 10, image:'granturismo.png',title: 'GRAN TURISMO', director: 'Quentin Tarantino', actors: 'Meryl Streep', description: 'un talentoso piloto de carreras que, después de una serie de eventos inesperados, se encuentra en la oportunidad de su vida: competir en el torneo de carreras "Gran Turismo".' }

];
const butacasOcupadas = [1,5,7,3]

let transactions = [];

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

//la usamos para imprimir todas las imagenes en la HomePage
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

//lo usamos para cargar la imagen especifica en butacas
//la url es lo q se pondra luego en el fetch de js, el id: lo que hace
//es q la pagina sea dinamica, es decir si la pelicula tiene id 1 :id tendra ese id
app.get('/api/movies/:id', (request, response) => {
    //extrae la id y la guarda, como el id es un numero
    //y toda la url es un string number lo convierte a numero
    const movieId = Number(request.params.id);
    //con find busca el id de la peli en el array movies q coincida con el id de la url
    const movie = movies.find(movie => movie.id === movieId);
    //verifica q se haya encontrado
    if (movie) {
        response.json(movie);
    } else {
        response.status(404).json({ error: 'Not Found' });
    }
});

// esto aun no lo usamos
app.delete('/api/movies/:id', (request, response) => {
    const id = request.params.id;
    movies = movies.filter(movie => movie.id != id);
    response.status(204).end();
});

app.post('/api/buy-tickets', (req, res) => {
    const { movieId, quantity } = req.body;
    const movie = movies.find(movie => movie.id === Number(movieId));
    if (!movie) {
        return res.status(404).json({ success: false, message: 'Película no encontrada' });
    }

    const transaction = {
        movie,
        quantity: Number(quantity),
        date: new Date().toLocaleString(),
    };

    transactions.push(transaction);

    res.json({ success: true, message: 'Tickets comprados con éxito', transaction });
});

//
app.get('/api/verificar-butacas', (req, res) => {
    
    const butacasSeleccionadas = req.query.butacas.split(',').map(Number);

    // Verificar si todas las butacas seleccionadas están disponibles
    const todasDisponibles = butacasSeleccionadas.every(butaca => !butacasOcupadas.includes(butaca));
    
    // Si todas las butacas están disponibles, asignarlas a la variable "disponibles"
    const disponibles = todasDisponibles ? butacasSeleccionadas : [];
    
    res.json({ disponibles });

});
