import Cliente from '../Cliente.js'
import * as Prestamos from './PrestamosController.js';

let Clientes = [];

function agregarCliente(cliente) {
    Clientes.push(cliente);
}
function getCliente(ci) {
    return Clientes.find(cliente => (cliente.ci === ci));
}
function setClientes(clientesNuevos) {
    Clientes = clientesNuevos
}
function modificarCliente(clienteViejo, clienteNuevo) {
    clienteNuevo.ci = clienteViejo.ci
    Clientes[Clientes.indexOf(clienteViejo)] = clienteNuevo;
}
function eliminarCliente(cliente) {
    Prestamos.quitarPrestamos(cliente);
    Clientes.splice(Clientes.indexOf(cliente), 1);
 }
const cliente1 = new Cliente('Pedro', 'Apellido', '111')
const cliente2 = new Cliente('Juan', 'Bpellido', '222')
const cliente3 = new Cliente('Angel', 'Cpellido', '333')

agregarCliente(cliente1);
agregarCliente(cliente2);
agregarCliente(cliente3);

export { Clientes as clientes, agregarCliente, eliminarCliente, modificarCliente, getCliente, setClientes };