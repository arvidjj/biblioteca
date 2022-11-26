import { render, toggleComponent } from './functions/render.js';
import {
    renderBooks,
    renderComponent as renderLibreria
} from './components/Libreria.js'

import {
    renderPrestamos,
    renderComponent as renderPrestamosTab
} from './components/Prestamos.js'

import * as Biblioteca from './functions/LibrosController.js';
import * as Prestamos from './functions/PrestamosController.js';
import Prestamo from './functions/Prestamo.js'
import * as Clientes from './functions/ClientesController.js';

import * as UserDatabase from './functions/UserController.js'
import * as LoginController from './functions/LoginStatus.js'
import * as loginScreen from './components/Login.js'

const mainContent = document.querySelector('#content');

//renderLibreria();
//renderBooks(Biblioteca.libros)

renderPrestamosTab();
renderPrestamos(Prestamos.prestamos)

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

/*HEADER*/

const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', ()=>{
    render(loginScreen.renderLogin(), mainContent)
    loginScreen.addEventsLogin();
})

function checkLoginButtons(){
    if (LoginController.isLoggedIn) {
        toggleComponent(loginButton)
    }
}

