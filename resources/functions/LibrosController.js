import Libro from './Libro.js'

const Biblioteca = [];

function agregarLibro(libro) {
    Biblioteca.push(libro);
}
function getLibro(titulo) {
    return Biblioteca.find(libro => titulo === libro.titulo);
}
const item1 = new Libro('B Titulo', 'Un buen libro', 'B autor', '2001', 'editorial',
3, 'libroejemplo.png')
const item2 = new Libro('D Titulo', 'Un mal libro', 'A autor', '2004', 'lairotide',
1, 'libroejemplo.png')
const item3 = new Libro('A Titulo', 'Un libro', 'X autor', '2007', 'lairotide',
1, 'libroejemplo.png')

agregarLibro(item1);
agregarLibro(item2);
agregarLibro(item3);

export { Biblioteca as libros, agregarLibro, getLibro };