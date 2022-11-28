import { render, toggleComponent } from './functions/render.js';

import {
    renderBooks,
    renderComponent as renderLibreria
} from './components/Libreria.js'
import {
    renderPrestamos,
    renderComponent as renderPrestamosTab
} from './components/Prestamos.js'
import {
    renderUsuarios,
    renderComponent as renderUsuariosTab
} from './components/Usuarios.js'

import * as Biblioteca from './functions/controllers/LibrosController.js';
import Libro from './functions/Libro.js'
import * as Prestamos from './functions/controllers/PrestamosController.js';
import Prestamo from './functions/Prestamo.js'
import * as Clientes from './functions/controllers/ClientesController.js';
import Cliente from './functions/Cliente.js'

import * as UserDatabase from './functions/controllers/UserController.js'
import User from './functions/User.js'

import * as LoginController from './functions/LoginStatus.js'
import * as loginScreen from './components/Login.js'

const mainContent = document.querySelector('#content');

//renderLibreria();
//renderBooks(Biblioteca.libros)

//renderPrestamosTab();
//renderPrestamos(Prestamos.prestamos)

renderUsuariosTab();
renderUsuarios(UserDatabase.userDatabase)

const mobileMenuButton = document.querySelector('#hamburger-icon')
const mobileMenu = document.querySelector('.mobile-menu')
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open')
})

/*LOCALSTORAGE*/


Biblioteca.setBiblioteca(JSON.parse(localStorage.getItem("libros") || "[]").map(o=>(Object.assign(new Libro(), o))))
Prestamos.setPrestamos(JSON.parse(localStorage.getItem("prestamos") || "[]").map(o=>(Object.assign(new Prestamo(), o)))) ;
Clientes.setClientes(JSON.parse(localStorage.getItem("clientes") || "[]").map(o=>(Object.assign(new Cliente(), o))));
UserDatabase.setUserDatabase(JSON.parse(localStorage.getItem("usuarios") || "[]").map(o=>(Object.assign(new User(), o))));

/*NAVBAR*/

const menuLibreria = document.querySelector('#menuLibreria')
const menuPrestamos = document.querySelector('#menuPrestamos')
const menuUsuarios = document.querySelector('#menuUsuarios')
menuLibreria.addEventListener('click', () => {
    renderLibreria();
    renderBooks(Biblioteca.libros)
})
menuPrestamos.addEventListener('click', () => {
    renderPrestamosTab();
    renderPrestamos(Prestamos.prestamos)
})
menuUsuarios.addEventListener('click', () => {
    renderUsuariosTab();
    renderUsuarios(UserDatabase.userDatabase)
})

/*HEADER*/

const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', ()=>{
    render(loginScreen.renderLogin(), mainContent)
    loginScreen.addEventsLogin();
})

const logoutButton = document.querySelector('#logout-button');
toggleComponent(logoutButton)
logoutButton.addEventListener('click', ()=>{
    LoginController.logout();
})


LoginController.signIn(localStorage.getItem("loggedusername"), localStorage.getItem("loggedpassword"));
LoginController.updateUser()