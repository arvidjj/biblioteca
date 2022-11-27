import * as Biblioteca from '../functions/controllers/LibrosController.js';
import * as Prestamos from '../functions/controllers/PrestamosController.js';
import Prestamo from '../functions/Prestamo.js'
import * as Clientes from '../functions/controllers/ClientesController.js';

import { render, toggleComponent } from '../functions/render.js';

function addEventListeners() {
    const formDisplay = document.querySelector('.nuevo-prestamo')
    const formPrestamo = document.querySelector('.nuevo-prestamo-form')

    const formCiCliente = document.querySelector('#formci')
    const formCiError = document.querySelector('#info-cliente')
    const formIdLibro = document.querySelector('#formid')
    const formLibroError = document.querySelector('#info-libro')
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
            formNombreCliente.value = `${clienteEncontrado.nombre} ${clienteEncontrado.apellido}`;
            formCiError.textContent = ''
        } else {
            formNombreCliente.value = `No encontrado`;
        }
    })

    formIdLibro.addEventListener('input', () => {
        let libroEncontrado = Biblioteca.getLibroById(+formIdLibro.value);
        if (libroEncontrado !== undefined) {
            formTituloLibro.value = libroEncontrado.titulo;
            formAnhoLibro.value = libroEncontrado.anho;
            formGeneroLibro.value = libroEncontrado.categoria;
            formLibroError.textContent = ''
        } else {
            formTituloLibro.value = `No encontrado`;
            formAnhoLibro.value = `No encontrado`;
            formGeneroLibro.value = `No encontrado`;
        }
    })


    formPrestamo.addEventListener('submit', (e) => {
        e.preventDefault();

        //CHECKEAR VALIDACION DE CAMPOS
        let clienteEncontrado = Clientes.getCliente(formCiCliente.value);
        if (formCiCliente.value === '' || clienteEncontrado === undefined) {
            formCiError.textContent = 'Cliente Invalido'
            return
        }
        let libroEncontrado = Biblioteca.getLibroById(+formIdLibro.value);
        if (formIdLibro.value === '' || libroEncontrado === undefined) {
            formLibroError.textContent = 'Libro Invalido'
            return
        }
        /**/
        const hoy = new Date();
        const vencimiento = new Date()
        vencimiento.setDate(hoy.getDate() + +formDiasLibro.value); //obtener fecha de vencimiento
        const nuevoPrestamo = new Prestamo //SE GENERA NUEVO PRESTAMO
            (Clientes.getCliente(formCiCliente.value), [Biblioteca.getLibroById(+formIdLibro.value)]
                , hoy, vencimiento);
        /**/
        console.log(nuevoPrestamo)
        Prestamos.agregarPrestamo(nuevoPrestamo);
        toggleComponent(formDisplay);
    })

    formCancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleComponent(formDisplay);
    })
}

function renderForm() {
    const nuevoPrestamo = document.createElement('div');
    nuevoPrestamo.classList.add('nuevo-prestamo')

    nuevoPrestamo.innerHTML = `
            <h1>Nuevo Prestamo</h1>
            <form action="" class="nuevo-prestamo-form">
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
                <div class="form-row">
                    <div class="row-field">
                        <label for="formid">ID de Libro</label>
                        <input type="text" name="formid" id="formid">
                        <span id="info-libro"></span>
                    </div>
                    <div class="row-field">
                        <label for="formdias">Dias de Prestamo</label>
                        <input type="text" name="formdias" id="formdias">
                        <span id="info-dias"></span>
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
                <div class="form-buttons">
                    <button id="prestamo-accept">Confirmar Prestamo</button>
                    <button id="prestamo-cancel">Cancelar</button>
                </div>
            </form>`
    return nuevoPrestamo;
}

export { renderForm, addEventListeners };
