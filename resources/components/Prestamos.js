import * as Biblioteca from '../functions/LibrosController.js';
import * as Prestamos from '../functions/PrestamosController.js';
import * as Clientes from '../functions/ClientesController.js';

import * as PrestamoForm from './NuevoPrestamoController.js';
import * as DevolucionForm from './NuevaDevolucionController.js';

import render from '../functions/render.js';

const mainContent = document.querySelector('#content');
const prestamosList = Prestamos.prestamos;

function renderPrestamos(prestamosToRender) {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#prestamos-container');
    menuItemContainer.innerHTML = '<h2>Prestamos</h2>';
    const newTable = document.createElement('table');
    const newTableBody = document.createElement('tbody');
    newTable.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Libros</th>
                <th>Cliente</th>
                <th>Fecha de Prestamo</th>
                <th>Fecha de Devolucion</th>
                <th>Vencido</th>
            </tr>
        </thead>
                        `
    newTable.appendChild(newTableBody)
    prestamosToRender.forEach((item, index) => {
        const itemCell = document.createElement('tr');
        itemCell.setAttribute('id', `item-${index}`)
        const vencido = (item.fechadevolucion < new Date()) ? `Si` : `No`;
        itemCell.innerHTML = `
        <td>${index}</td>
        <td>${item.libro.titulo}</td>
        <td>${item.cliente.nombre} ${item.cliente.apellido}</td>
        <td>${item.fecha.getDate()}/${item.fecha.getMonth() + 1}/${item.fecha.getFullYear()}</td>
        <td>${item.fechadevolucion.getDate()}/${item.fechadevolucion.getMonth() + 1}/${item.fechadevolucion.getFullYear()}</td>
        <td>${vencido}</td>
        `

        newTableBody.appendChild(itemCell);
        console.log(`rendering ${index}`)
    })
    menuItemContainer.appendChild(newTable)
    //newTable.innerHTML += `</tbody></table>`
}

function renderClientes(clientes) {
    console.log('rendering Items...')

    const menuItemContainer = document.querySelector('#prestamos-container');
    menuItemContainer.innerHTML = '<h2>Clientes</h2>';
    const newTable = document.createElement('table');
    const newTableBody = document.createElement('tbody');
    newTable.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>CI</th>
                <th>Libros Prestados</th>
                <th>Multa</th>
            </tr>
        </thead>
                        `
    newTable.appendChild(newTableBody)
    clientes.forEach((item, index) => {
        const itemCell = document.createElement('tr');
        itemCell.setAttribute('id', `item-${index}`)
        itemCell.innerHTML = `
        <td>${index}</td>
        <td>${item.nombre}</td>
        <td>${item.apellido}</td>
        <td>${item.ci}</td>
        <td>${item.librosPrestados.length}</td>
        <td>0</td>
        `

        newTableBody.appendChild(itemCell);
        console.log(`rendering ${index}`)
    })
    menuItemContainer.appendChild(newTable)
    //newTable.innerHTML += `</tbody></table>`
}

function renderComponent() {
    const main = document.createElement('main');
    main.innerHTML = `
    <h1><strong>Prestamos</strong></h1>
            <hr>
            <div class="prestamos-layout">
                <div class="prestamos-options">
                    <h2>Menu</h2>
                    <ul>
                        <li><button id="prestamos-table-button">Prestamos</button></li>
                        <li><button id="clientes-table-button">Clientes</button></li>
                    </ul>
                </div>
                <div class="prestamos-main">
                    <button class="btn2" id="nuevo-prestamo">Nuevo Prestamo</button>
                    <button class="btn2" id="nuevo-devolucion">Devolucion</button>
                    <div class="prestamos-container" id="prestamos-container">
                    </div>
                </div>
            </div>
            `;
    render(main, mainContent); //renderizar el componente
    const prestamosButton = document.querySelector('#prestamos-table-button')
    const clientesButton = document.querySelector('#clientes-table-button')
    const nuevoPrestamoButton = document.querySelector('#nuevo-prestamo')
    const nuevoDevolucionButton = document.querySelector('#nuevo-devolucion')
    prestamosButton.addEventListener('click', ()=>{
        renderPrestamos(Prestamos.prestamos);
    })
    clientesButton.addEventListener('click', ()=>{
        renderClientes(Clientes.clientes);
    })
    nuevoPrestamoButton.addEventListener('click', ()=>{
        render(PrestamoForm.renderForm(), document.querySelector('.prestamos-container'));
        PrestamoForm.addEventListeners();
    })
    nuevoDevolucionButton.addEventListener('click', ()=>{
        render(DevolucionForm.renderForm(), document.querySelector('.prestamos-container'));
        DevolucionForm.addEventListeners();
    })
}

export { renderPrestamos, renderComponent };