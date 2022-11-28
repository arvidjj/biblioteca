import Prestamo from '../Prestamo.js'
import * as Clientes from './ClientesController.js';
import * as Libros from './LibrosController.js';

let Prestamos = [];

function agregarPrestamo(prestamo) {
    Clientes.getCliente(prestamo.cliente.ci).prestarLibro(prestamo.libro);
    Prestamos.push(prestamo);
}
function quitarPrestamo(prestamo) {
    Clientes.getCliente(prestamo.cliente.ci).devolverLibro(prestamo.libro); //actualiza libros prestados en clase cliente
    Prestamos.splice(Prestamos.indexOf(prestamo), 1); //actualiza prestamo en clase prestamos
}
function getPrestamosFromCliente(cliente) {
    return Prestamos.filter(prestamo => prestamo.cliente.ci === cliente.ci)
}
function getPrestamoById(id) {
    return Prestamos.find(prestamo => prestamo.id === id)
}
function setPrestamos(prestamosNuevos) {
    Prestamos = prestamosNuevos
}
/**/
const item1 = new Prestamo(Clientes.getCliente('111'), Libros.getLibro('A Titulo')
    , new Date(2022, 10, 11), new Date(2022, 10, 20));

const item2 = new Prestamo(Clientes.getCliente('222'), Libros.getLibro('B Titulo')
    , new Date(2022, 10, 8), new Date(2022, 10, 14));

const item3 = new Prestamo(Clientes.getCliente('111'), Libros.getLibro('C Titulo')
    , new Date(2022, 10, 15), new Date(2022, 11, 25));

agregarPrestamo(item1);
agregarPrestamo(item2);
agregarPrestamo(item3);
/**/

export { Prestamos as prestamos, agregarPrestamo, quitarPrestamo, getPrestamosFromCliente, getPrestamoById, setPrestamos };