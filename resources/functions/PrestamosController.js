import Prestamo from './Prestamo.js'
import * as Clientes from './ClientesController.js';
import * as Libros from './LibrosController.js';

const Prestamos = [];

function agregarPrestamo(prestamo) {
    Prestamos.push(prestamo);
}
function quitarPrestamo(...prestamo) {
    Prestamos.splice(Prestamos.indexOf(prestamo), 1);
}
function getPrestamosFromCliente(cliente) {
    return Prestamos.filter(prestamo => prestamo.cliente === cliente)
}
function getPrestamoById(id) {
    return Prestamos.find(prestamo => prestamo.id === id)
}
const item1 = new Prestamo(Clientes.getCliente('111'), Libros.getLibro('A Titulo')
                            , new Date(2022, 10, 11), new Date(2022,10, 20))
Clientes.getCliente('111').prestarLibro(Libros.getLibro('A Titulo'));
const item2 = new Prestamo(Clientes.getCliente('222'), Libros.getLibro('B Titulo')
                            , new Date(2022, 10, 8), new Date(2022,10, 14))
Clientes.getCliente('222').prestarLibro(Libros.getLibro('B Titulo'));
const item3 = new Prestamo(Clientes.getCliente('111'), Libros.getLibro('C Titulo')
                            , new Date(2022, 10, 15), new Date(2022,10, 25))
Clientes.getCliente('111').prestarLibro(Libros.getLibro('C Titulo'));

agregarPrestamo(item1);
agregarPrestamo(item2);
agregarPrestamo(item3);

export { Prestamos as prestamos, agregarPrestamo, quitarPrestamo, getPrestamosFromCliente, getPrestamoById };