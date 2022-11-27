import * as Biblioteca from '../functions/controllers/LibrosController.js';
import * as Prestamos from '../functions/controllers/PrestamosController.js';
import * as Clientes from '../functions/controllers/ClientesController.js';
import Cliente from '../functions/Cliente.js' //para agregar

import * as PrestamoForm from './NuevoPrestamoController.js';
import * as DevolucionForm from './NuevaDevolucionController.js';

import render from '../functions/render.js';

const mainContent = document.querySelector('#content');
const prestamosList = Prestamos.prestamos;

function renderComponent() {
    const main = document.createElement('main');
    main.innerHTML = `
    <div class="mini-header">
        <h1><strong>Prestamos</strong></h1>
    </div>
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
                    <div class="prestamos-buttons"></div>
                    <div class="prestamos-container" id="prestamos-container"></div>
                </div>
            </div>
            `;
    render(main, mainContent); //renderizar el componente
    const prestamosButton = document.querySelector('#prestamos-table-button')
    const clientesButton = document.querySelector('#clientes-table-button')
    prestamosButton.addEventListener('click', () => {
        renderPrestamos(Prestamos.prestamos);
    })
    clientesButton.addEventListener('click', () => {
        renderClientes(Clientes.clientes);
    })
}

/////////////////
/*Prestamos TAB*/
/////////////////
function renderPrestamos(prestamosToRender) {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#prestamos-container');
    menuItemContainer.innerHTML = '<h2 id="titulo-prestamos">Prestamos</h2>';
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
    const prestamosButtons = document.querySelector('.prestamos-buttons')
    prestamosButtons.innerHTML = `<button class="btn2" id="nuevo-prestamo"><span class="material-symbols-outlined">
    arrow_circle_right
    </span>Nuevo Prestamo</button>
    <button class="btn2" id="nuevo-devolucion"><span class="material-symbols-outlined">
    arrow_circle_left
    </span>Devolucion</button>
    <button class="btn2" id="buscar-rango-fecha"><span class="material-symbols-outlined">
    date_range
    </span>Prestamos por rango de fecha</button>`
    const nuevoPrestamoButton = document.querySelector('#nuevo-prestamo')
    const nuevoDevolucionButton = document.querySelector('#nuevo-devolucion')
    const rangoFechaButton = document.querySelector('#buscar-rango-fecha')
    nuevoPrestamoButton.addEventListener('click', () => {
        render(PrestamoForm.renderForm(), document.querySelector('.prestamos-container'));
        PrestamoForm.addEventListeners();
    })
    nuevoDevolucionButton.addEventListener('click', () => {
        render(DevolucionForm.renderForm(), document.querySelector('.prestamos-container'));
        DevolucionForm.addEventListeners();
    })
    rangoFechaButton.addEventListener('click', () => {
        renderDateFilter()
    })
}

function renderDateFilter() {
    const filterDiv = document.createElement('div')
    filterDiv.classList.add('filter-fecha')
    filterDiv.innerHTML = `
    <h2>Buscar Prestamos por rango de fecha</h2>
        <form action="" id="fecha-form">
            <p>Prestamos del </p>
            <input type="date" name="fechainicial" id="fechainicial">
            <p>al</p>
            <input type="date" name="fechafinal" id="fechafinal">
            <button>Buscar</button>
       </form>
    `
    render(filterDiv, document.querySelector('.prestamos-container'));

    const filterForm = document.querySelector('#fecha-form')
    const fechaInicial = document.querySelector('#fechainicial')
    const fechaFinal = document.querySelector('#fechafinal')
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (fechaInicial.value !== '' && fechaFinal.value !== '') {
            let [yearInicial, monthInicial, dayInicial] = fechaInicial.value.split('-');
            monthInicial = monthInicial - 1;
            const transformedInicial = new Date(+yearInicial, +monthInicial, +dayInicial);

            let [yearFinal, monthFinal, dayFinal] = fechaFinal.value.split('-');
            monthFinal = monthFinal - 1;
            const transformedFinal = new Date(+yearFinal, +monthFinal, +dayFinal);

            renderPrestamos(sortPrestamos(transformedInicial, transformedFinal));
            document.querySelector('#titulo-prestamos').textContent = `
                Prestamos entre el ${fechaInicial.value} al ${fechaFinal.value}
            `
        }
    })
}

//SORT POR FECHA
function sortPrestamos(inicial, final) {
    let sortedPrestamos = []
    sortedPrestamos = Prestamos.prestamos.filter(prestamo =>
        ((prestamo.fecha >= inicial) && (prestamo.fecha <= final))
    )
    return sortedPrestamos;
}

////////////////
/*CLIENTES TAB*/
////////////////
function renderClientes(clientes) {
    console.log('rendering Items...')

    const menuItemContainer = document.querySelector('#prestamos-container');
    menuItemContainer.innerHTML = '<h2 id="titulo-clientes">Clientes</h2>';
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
    const prestamosButtons = document.querySelector('.prestamos-buttons')
    prestamosButtons.innerHTML = `
    <button class="btn2" id="nuevo-cliente"><span class="material-symbols-outlined">
    person_add</span>Nuevo cliente</button>
    
    <button class="btn2" id="buscar-prestamos-vencidos"><span class="material-symbols-outlined">
    dangerous</span>Clientes con prestamos Vencidos</button>`
    const prestamosVencidosButton = document.querySelector('#buscar-prestamos-vencidos')
    prestamosVencidosButton.addEventListener('click', () => {
        renderClientesVencidos();
    })
    const newClienteButton = document.querySelector('#nuevo-cliente')
    newClienteButton.addEventListener('click', () => {
        renderNewClienteForm();
    })
}

function renderClientesVencidos() {
    const prestamosVencidos = Prestamos.prestamos.filter(prestamo => prestamo.fechadevolucion < new Date())
    const clientesVencidos = prestamosVencidos.map(prestamo => prestamo.cliente)
    renderClientes(clientesVencidos)
    document.querySelector('#titulo-clientes').textContent = `
                Clientes con prestamos vencidos
            `
}

function renderNewClienteForm() {
    const newClienteDiv = document.createElement('div')
    newClienteDiv.classList.add('crearcliente-div')
    newClienteDiv.innerHTML = `
    <h2>Agregar Cliente</h2>
    <form action="" id="new-cliente-form">
    
        <div class="form-row">
            <div class="form-column">
                <label for="new-nombre">Nombre</label>
                <input type="text" name="new-nombre" id="new-nombre">
            </div>
            <div class="form-column">
                <label for="new-apellido">Apellido</label>
                <input type="text" name="new-apellido" id="new-apellido">
            </div>
        </div>
    
        <div class="row-field">
            <label for="new-ci">CI</label>
            <input type="text" name="new-ci" id="new-ci">
        </div>


        <div class="form-buttons" style="margin-top:10px;">
            <button type="submit">Agregar</button>
            <button id="cancelar-agregar">Cancelar</button>
        </div>
    </form>
    `
    render(newClienteDiv, document.querySelector('.prestamos-container'))

    const agregarForm = document.querySelector('#new-cliente-form')
    const cancelarForm = document.querySelector('#cancelar-agregar')

    const newNombre = document.querySelector('#new-nombre')
    const newApellido = document.querySelector('#new-apellido')
    const newCi = document.querySelector('#new-ci')
    cancelarForm.addEventListener('click', (e) => {
        e.preventDefault();
        renderClientes(Clientes.clientes);
    })
    agregarForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const nuevoCliente = new Cliente(
            newNombre.value,
            newApellido.value,
            newCi.value
        )
        Clientes.agregarCliente(nuevoCliente)
        renderClientes(Clientes.clientes);
    })
}


export { renderPrestamos, renderComponent };