import { render, toggleComponent} from './functions/render.js';
import { renderBooks, 
        renderComponent as renderLibreria} 
            from './components/Libreria.js'

import { renderPrestamos, 
    renderComponent as renderPrestamosTab} 
            from './components/Prestamos.js'

import * as Biblioteca from './functions/LibrosController.js';
import * as Prestamos from './functions/PrestamosController.js';
import Prestamo from './functions/Prestamo.js'
import * as Clientes from './functions/ClientesController.js';

const mainContent = document.querySelector('#content');

// renderLibreria();
// renderBooks(Biblioteca.libros)

// renderPrestamosTab();
// renderPrestamos(Prestamos.prestamos)

// toggleComponent(document.querySelector('.prestamos-layout'))


const mobileMenuButton = document.querySelector('#hamburger-icon')
const mobileMenu = document.querySelector('.mobile-menu')
mobileMenuButton.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open')
})

/*NAVBAR*/

const menuLibreria = document.querySelector('#menuLibreria')
const menuPrestamos = document.querySelector('#menuPrestamos')
menuLibreria.addEventListener('click', ()=>{
    renderLibreria();
    renderBooks(Biblioteca.libros)
})
menuPrestamos.addEventListener('click', ()=>{
    renderPrestamosTab();
    renderPrestamos(Prestamos.prestamos)
})



/*DEVOLUCION FORM*/
const formDisplay = document.querySelector('.nuevo-prestamo')
const formPrestamo = document.querySelector('.nuevo-prestamo-form')

const formCiCliente = document.querySelector('#formci')
const formIdLibro = document.querySelector('#formid')
const formDiasLibro = document.querySelector('#formdias')

const formNombreCliente = document.querySelector('#formnombre')

const formTituloLibro = document.querySelector('#formtitulo')
const formAnhoLibro = document.querySelector('#formanho')
const formGeneroLibro = document.querySelector('#formgenero')

const formConfirmButton = document.querySelector('#prestamo-accept')
const formCancelButton = document.querySelector('#prestamo-cancel')

formCiCliente.addEventListener('input', () => {
    let clienteEncontrado = Clientes.getCliente(formCiCliente.value);
    if (clienteEncontrado !== undefined) {
        formNombreCliente.value = clienteEncontrado.nombre;
        renderDevolucionTable(clienteEncontrado)
    } else {
        formNombreCliente.value = `No encontrado`;
    }
})


function renderDevolucionTable(cliente) {
    console.log('rendering Items...')
    const prestamosDeCliente = Prestamos.getPrestamosFromCliente(cliente);
    const menuItemContainer = document.querySelector('#devolucion-container');
    menuItemContainer.innerHTML = ''
    console.log(prestamosDeCliente)
    const clienteLabel = document.querySelector('#devolucion-cliente')
    clienteLabel.textContent = `Cliente: ${cliente.nombre} ${cliente.apellido}`
    const newTable = document.createElement('table');
    const newTableBody = document.createElement('tbody');
    newTable.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Libro</th>
                <th>Fecha de Prestamo</th>
                <th>Fecha de Devolucion</th>
                <th>Vencido</th>
                <th>Acciones</th>
            </tr>
        </thead>
                        `
    newTable.appendChild(newTableBody)
    prestamosDeCliente.forEach((item, index) => {
        const itemCell = document.createElement('tr');
        itemCell.classList.add('hoverable')
        itemCell.setAttribute('id', `item-${index}`)
        itemCell.innerHTML = `
        <td>${index}</td>
        <td>${item.libro.titulo}</td>
        <td>${item.fecha.getDate()}/${item.fecha.getMonth() + 1}/${item.fecha.getFullYear()}</td>
        <td>${item.fechadevolucion.getDate()}/${item.fechadevolucion.getMonth() + 1}/${item.fechadevolucion.getFullYear()}</td>
        <td>nose</td>
        <td><button onclick="devolverLibro(${item.libro})">Devolver</button></td>
        `

        newTableBody.appendChild(itemCell);
        console.log(`rendering ${index}`)
    })
    menuItemContainer.appendChild(newTable)
    addTableEventListeners();
    //newTable.innerHTML += `</tbody></table>`
}

function addTableEventListeners() {

}