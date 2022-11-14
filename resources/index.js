import render from './functions/render.js';
import { renderBooks, 
        renderComponent as renderLibreria} 
            from './components/Libreria.js'

import * as Biblioteca from './functions/LibrosController.js';

const mainContent = document.querySelector('#content');

renderLibreria();
renderBooks(Biblioteca.libros)

const mobileMenuButton = document.querySelector('#hamburger-icon')
const mobileMenu = document.querySelector('.mobile-menu')
mobileMenuButton.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open')
})