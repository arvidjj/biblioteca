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



/*PRESTAMO FORM*/
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

formCiCliente.addEventListener('input', ()=>{
    let clienteEncontrado = Clientes.getCliente(formCiCliente.value);
    if (clienteEncontrado !== undefined) {
        formNombreCliente.value = clienteEncontrado.nombre;
    } else {
        formNombreCliente.value = `No encontrado`;
    }
})

formIdLibro.addEventListener('input', ()=>{
    let libroEncontrado = Biblioteca.getLibroById(+formIdLibro.value);
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


formPrestamo.addEventListener('submit', (e)=>{
    e.preventDefault();

    //CHECKEAR VALIDACION DE CAMPOS
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
    //toggleComponent(formDisplay);
})
formCancelButton.addEventListener('click', (e)=>{
    e.preventDefault();
    toggleComponent(formDisplay);
})