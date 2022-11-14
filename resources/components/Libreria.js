import * as Biblioteca from '../functions/LibrosController.js';
import render from '../functions/render.js';

const mainContent = document.querySelector('#content');
const bookList = Biblioteca.libros;

function renderBooks(booksToRender) {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#book-container');
    menuItemContainer.innerHTML = '';
    console.log(booksToRender)

    booksToRender.forEach((item, index) => {
        const itemImage = `./resources/images/libros/${item.imagen}`
        const itemCard = document.createElement('div');
        itemCard.classList.add('container-item')
        itemCard.setAttribute('id', `item-${index}`)

        itemCard.innerHTML = `
        <div class="container-item" id="item-${index}">
            <div class="item-image">
                <img src="${itemImage}" alt="Book">
            </div>
            <div class="item-info">
                <h3 id="info-title">${item.titulo}</h3>
                <p id="info-author">${item.autores}</p>
            </div>
        </div>
        `

        menuItemContainer.appendChild(itemCard);
        console.log(`rendering ${index}`)
    })
}

function renderComponent() {
    const main = document.createElement('main');
    main.innerHTML = `
    <h1><strong>Libreria</strong></h1>
            <hr>
            <div class="book-options">
                <form action="" id="filter-form">
                    <label for="filter-select">Filtrar por:</label>
                    <select name="filter-option" id="filter-select">
                        <option value="titulo">Titulo</option>
                        <option value="autores">Autor</option>
                    </select>
                    <button id="filter-button" style="
                    cursor:pointer;">Filtrar</button>
                </form>
            </div>
            <div class="book-container" id="book-container">
                <div class="container-item" id="item-1">
                    <div class="item-image">
                        <img src="./resources/images/libros/libroejemplo.png" alt="Book">
                    </div>
                    <div class="item-info">
                        <h3 id="info-title">Titulo</h3>
                        <p id="info-author">Autor</p>
                    </div>
                </div>
                <div class="container-item" id="item-2">
                    <div class="item-image">
                        <img src="./resources/images/libros/libroejemplo.png" alt="Book">
                    </div>
                    <div class="item-info">
                        <h3 id="info-title">Titulo</h3>
                        <p id="info-author">Autor</p>
                    </div>
                </div>

            </div>
            `;
    render(main, mainContent); //renderizar el componente
    const filterForm = document.querySelector('#filter-form')
    const filterOption = document.querySelector('#filter-select')
    filterForm.addEventListener('submit', (e) => { //agregar el filtrado
        e.preventDefault()
        let sortedBooks = [];
        const option = filterOption.value;
        if (option === 'titulo') {
            sortedBooks = Biblioteca.libros.sort(
                (b1, b2) => (b1.titulo < b2.titulo) ? -1 : (b1.titulo > b2.titulo) ? 1 : 0);
        } else if (option === 'autores') {
            sortedBooks = Biblioteca.libros.sort(
                (b1, b2) => (b1.autores < b2.autores) ? -1 : (b1.autores > b2.autores) ? 1 : 0);
        }
        renderBooks(sortedBooks);
    })
}

export { renderBooks, renderComponent };