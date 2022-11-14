import Cliente from './Cliente.js'

const Clientes = [];

function agregarCliente(cliente) {
    Clientes.push(cliente);
}
function getCliente(ci) {
    return Clientes.find(cliente => (cliente.ci === ci));
}

const cliente1 = new Cliente('Pedro', 'Apellido', '111')
const cliente2 = new Cliente('Juan', 'Bpellido', '222')
const cliente3 = new Cliente('Angel', 'Cpellido', '333')

agregarCliente(cliente1);
agregarCliente(cliente2);
agregarCliente(cliente3);

console.log(getCliente('111'))

export { Clientes as clientes, agregarCliente, getCliente };