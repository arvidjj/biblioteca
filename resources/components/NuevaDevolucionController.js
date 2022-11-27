import * as Biblioteca from '../functions/controllers/LibrosController.js';
import * as Prestamos from '../functions/controllers/PrestamosController.js';
import Prestamo from '../functions/Prestamo.js'
import * as Clientes from '../functions/controllers/ClientesController.js';

import {renderComponent as renderPrestamosTab,
            renderPrestamos} from './Prestamos.js'

import { render, toggleComponent } from '../functions/render.js';

function addEventListeners() {
    const formDisplay = document.querySelector('.nuevo-devolucion')
    const formPrestamo = document.querySelector('.nuevo-prestamo-form')

    const formCiCliente = document.querySelector('#formci')
    const formCiError = document.querySelector('#info-cliente')
    const formIdLibro = document.querySelector('#formid')
    const formDiasLibro = document.querySelector('#formdias')

    const formNombreCliente = document.querySelector('#formnombre')

    const formConfirmButton = document.querySelector('#devolucion-devolver')
    const formCancelButton = document.querySelector('#devolucion-cancel')

    formCiCliente.addEventListener('input', () => {
        let clienteEncontrado = Clientes.getCliente(formCiCliente.value);
        if (clienteEncontrado !== undefined) {
            formNombreCliente.value = `${clienteEncontrado.nombre} ${clienteEncontrado.apellido}`;
            renderDevolucionTable(clienteEncontrado)
            formCiError.textContent = ''
        } else {
            formNombreCliente.value = `No encontrado`;
        }
    })
    formConfirmButton.addEventListener('click', () => {
        //validacion
        let clienteEncontrado = Clientes.getCliente(formCiCliente.value);
        if (formCiCliente.value === '' || clienteEncontrado === undefined) {
            formCiError.textContent = 'Cliente Invalido'
            return
        }

        const prestamosCheckboxes = Array.from(document.querySelectorAll('.book-checkbox'))
        const prestamos = prestamosCheckboxes.filter(checkbox => checkbox.checked)
        prestamos.forEach(prestamo => { //RETORNA LOS LIBROS SELECCIONADOS
            const id = +prestamo.value.split("-")[1];
            const prestamoSeleccionado = Prestamos.getPrestamoById(id)
            console.log(prestamoSeleccionado)
            Prestamos.quitarPrestamo(prestamoSeleccionado);
        })

        toggleComponent(formDisplay);
        renderPrestamos(Prestamos.prestamos)
    });

    formCancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleComponent(formDisplay);
        renderPrestamos(Prestamos.prestamos)
    });
}

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
        const formTituloLibro = document.querySelector('#formtitulo')
        const formAnhoLibro = document.querySelector('#formanho')
        const formGeneroLibro = document.querySelector('#formgenero')
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

    //newTable.innerHTML += `</tbody></table>`
}

function renderForm() {
    const nuevaDevolucion = document.createElement('div');
    nuevaDevolucion.classList.add('nuevo-devolucion')

    nuevaDevolucion.innerHTML = `
    <div class="form-data">
    <form action="" class="nuevo-devolucion-form">
        <h1>Devolucion</h1>
        <div class="left-column-form">
            <div class="form-row">
                <div class="row-field">
                    <label for="formci">CI del Cliente</label>
                    <input type="text" name="formci" id="formci">
                    <span id="info-cliente"></span>
                </div>
                <div class="row-field">
                    <label for="formnombre">Cliente</label>
                    <input type="text" name="formnombre" id="formnombre" disabled>
                </div>
            </div>
            <p>Informacion de libro</p>
            <div class="form-column">
                <label for="formtitulo">Titulo</label>
                <input type="text" name="formtitulo" id="formtitulo" disabled>
                <label for="formanho">Anho</label>
                <input type="text" name="formanho" id="formanho" disabled>
                <label for="formgenero">Genero</label>
                <input type="text" name="formgenero" id="formgenero" disabled>
            </div>
        </div>
    </form>
    <div class="right-column-form">
        <h2 id="devolucion-cliente"></h2>
        <div id="devolucion-container">
        </div>
    </div>
</div>
<div class="form-buttons">
    <button id="devolucion-cancel">Cancelar</button>
    <button id="devolucion-devolver">Confirmar Devolucion</button>
</div>`
    return nuevaDevolucion;
}

export { renderForm, addEventListeners };
