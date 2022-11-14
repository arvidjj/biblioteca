import * as Biblioteca from '../functions/LibrosController.js';

const filterForm = document.querySelector('#filter-form')
const filterOption = document.querySelector('#filter-select')
const bookList = Biblioteca.libros;

filterForm.addEventListener('submit', (e)=>{
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

export default function renderBooks(booksToRender) {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#book-container');
    menuItemContainer.innerHTML = '';
    console.log(booksToRender)

    booksToRender.forEach((item, index) => {
        const itemImage = `./resources/images/libros/${item.imagen}`
        const itemCard = document.createElement('div');

        // <div class="menu-item" id="item-${index}">
        // </div>
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