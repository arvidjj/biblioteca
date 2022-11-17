import { render, toggleComponent } from './functions/render.js';
import {
    renderBooks,
    renderComponent as renderLibreria
}
    from './components/Libreria.js'

import {
    renderPrestamos,
    renderComponent as renderPrestamosTab
}
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
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open')
})

/*NAVBAR*/

const menuLibreria = document.querySelector('#menuLibreria')
const menuPrestamos = document.querySelector('#menuPrestamos')
menuLibreria.addEventListener('click', () => {
    renderLibreria();
    renderBooks(Biblioteca.libros)
})
menuPrestamos.addEventListener('click', () => {
    renderPrestamosTab();
    renderPrestamos(Prestamos.prestamos)
})



/*DEVOLUCION FORM*/
const formDisplay = document.querySelector('.nuevo-devolucion')
const formPrestamo = document.querySelector('.nuevo-prestamo-form')

const formCiCliente = document.querySelector('#formci')
const formIdLibro = document.querySelector('#formid')
const formDiasLibro = document.querySelector('#formdias')

const formNombreCliente = document.querySelector('#formnombre')

const formTituloLibro = document.querySelector('#formtitulo')
const formAnhoLibro = document.querySelector('#formanho')
const formGeneroLibro = document.querySelector('#formgenero')

const formConfirmButton = document.querySelector('#devolucion-devolver')
const formCancelButton = document.querySelector('#devolucion-cancel')

formCiCliente.addEventListener('input', () => {
    let clienteEncontrado = Clientes.getCliente(formCiCliente.value);
    if (clienteEncontrado !== undefined) {
        formNombreCliente.value = `${clienteEncontrado.nombre} ${clienteEncontrado.apellido}`;
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
        itemCell.addEventListener('click', () => {
            let libroEncontrado = Biblioteca.getLibroById(item.libro.id);
            if (libroEncontrado !== undefined) {
                formTituloLibro.value = libroEncontrado.titulo;
                formAnhoLibro.value = libroEncontrado.anho;
                formGeneroLibro.value = libroEncontrado.categoria;
            } else {
                formTituloLibro.value = `No encontrado`;
                formAnhoLibro.value = `No encontrado`;
                formGeneroLibro.value = `No encontrado`;
            }
        })
        itemCell.style.cursor = "pointer";
        const vencido = (item.fechadevolucion < new Date()) ? `Si` : `No`;
        itemCell.innerHTML = `
        <td>${index}</td>
        <td>${item.libro.titulo}</td>
        <td>${item.fecha.getDate()}/${item.fecha.getMonth() + 1}/${item.fecha.getFullYear()}</td>
        <td>${item.fechadevolucion.getDate()}/${item.fechadevolucion.getMonth() + 1}/${item.fechadevolucion.getFullYear()}</td>
        <td>${vencido}</td>
        <td>
            <input type="checkbox" id="devolver-${index}" value="devolver-${item.id}" class="book-checkbox"> 
            <label for="devolver-${item.id}">Devolver</label>
        </td>
        `

        newTableBody.appendChild(itemCell);
        console.log(`rendering ${index}`)
    })
    menuItemContainer.appendChild(newTable)
    addTableEventListeners();
    //newTable.innerHTML += `</tbody></table>`
}

function addTableEventListeners() {
    formConfirmButton.addEventListener('click', () => {
        const prestamosCheckboxes = Array.from(document.querySelectorAll('.book-checkbox'))
        const prestamos = prestamosCheckboxes.filter(checkbox => checkbox.checked)
        //CHECKEAR VALIDACION DE CAMPOS
        /**/
        
        /**/
        prestamos.forEach(prestamo => { //RETORNA LOS LIBROS SELECCIONADOS
            const id = +prestamo.value.split("-")[1];
            const prestamoSeleccionado = Prestamos.getPrestamoById(id)
            Prestamos.quitarPrestamo(prestamoSeleccionado);
        })
        
        toggleComponent(formDisplay);
    });
    
    formCancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleComponent(formDisplay);
    });
}