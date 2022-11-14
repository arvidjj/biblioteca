import { render, toggleComponent} from './functions/render.js';
import { renderBooks, 
        renderComponent as renderLibreria} 
            from './components/Libreria.js'

import { renderPrestamos, 
    renderComponent as renderPrestamosTab} 
            from './components/Prestamos.js'

import * as Biblioteca from './functions/LibrosController.js';
import * as Prestamos from './functions/PrestamosController.js';

const mainContent = document.querySelector('#content');

// renderLibreria();
// renderBooks(Biblioteca.libros)
// toggleComponent(document.querySelector('.books-display'))
renderPrestamosTab();
renderPrestamos(Prestamos.prestamos)

const mobileMenuButton = document.querySelector('#hamburger-icon')
const mobileMenu = document.querySelector('.mobile-menu')
mobileMenuButton.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open')
})