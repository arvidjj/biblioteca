import Prestamo from './Prestamo.js'
import * as Clientes from './ClientesController.js';
import * as Libros from './LibrosController.js';

const Prestamos = [];

function agregarPrestamo(prestamo) {
    Prestamos.push(prestamo);
}
function quitarPrestamo(prestamo) {
    Prestamos.splice(Prestamos.indexOf(prestamo), 1);
}
const item1 = new Prestamo(Clientes.getCliente('111'), [Libros.getLibro('A Titulo')], '2022-10-01', '2022-10-05')
Clientes.getCliente('111').prestarLibro(Libros.getLibro('A Titulo'));
//const item2 = new Prestamo(cliente2, libro2, '2022-10-01', '2022-10-05')
//const item3 = new Prestamo(cliente3, libro3, '2022-10-01', '2022-10-05')

agregarPrestamo(item1);
//agregarPrestamo(item2);
//agregarPrestamo(item3);

export { Prestamos as prestamos, agregarPrestamo, quitarPrestamo };