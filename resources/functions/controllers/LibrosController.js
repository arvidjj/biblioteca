import Libro from '../Libro.js'

let Biblioteca = [];

function agregarLibro(libro) {
    Biblioteca.push(libro);
}
function modificarLibro(libroViejo, libroNuevo) {
    libroNuevo.id = libroViejo.id
    Biblioteca[Biblioteca.indexOf(libroViejo)] = libroNuevo;
}
function getLibro(titulo) {
    return Biblioteca.find(libro => titulo === libro.titulo);
}
function getLibroById(id) {
    return Biblioteca.find(libro => id === libro.id);
}
function setBiblioteca(bibliotecaNueva) {
    Biblioteca = bibliotecaNueva
}
const item1 = new Libro('B Titulo', 'Un buen libro', 'B autor', '2001', 'Genero1', 'editorial',
3, '../resources/images/libros/libroejemplo.png')
const item2 = new Libro('D Titulo', 'Un mal libro', 'A autor', '2004', 'Genero1', 'lairotide',
1, '../resources/images/libros/libroejemplo.png')
const item3 = new Libro('A Titulo', 'Un libro', 'X autor', '2007', 'Genero2', 'lairotide',
1, '../resources/images/libros/libroejemplo.png')
const item4 = new Libro('C Titulo', 'Genial libro', 'Y autor', '2010', 'Genero3', 'lairotide',
2, '../resources/images/libros/libroejemplo.png')
//
agregarLibro(item1);
agregarLibro(item2);
agregarLibro(item3);
agregarLibro(item4);

export { Biblioteca as libros, agregarLibro, modificarLibro, getLibro, getLibroById, setBiblioteca };