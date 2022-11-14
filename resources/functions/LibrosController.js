import Libro from './Libro.js'

const Biblioteca = [];

function agregarLibro(libro) {
    Biblioteca.push(libro);
}

export { Biblioteca as libros, agregarLibro };