import * as Biblioteca from '../functions/LibrosController.js';

export default function renderBooks() {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#book-container');
    menuItemContainer.innerHTML = '';
    console.log(Biblioteca.libros)

    Biblioteca.libros.forEach((libro, index) => {
        const itemImage = require(`../images/libros/${item.image}`)
        const itemCard = document.createElement('div');

        // <div class="menu-item" id="item-${index}">
        // </div>
        itemCard.classList.add('container-item')
        itemCard.setAttribute('id', `item-${index}`)

        itemCard.innerHTML = html`
            <div class="item-image">
                <img src="${itemImage}" alt="${item.title}" />
            </div>
            <div class="item-description">
                <h3 id="food-title">${item.title}</h3>
                <p id="food-description">${item.description}</p>
                <p id="food-price">${item.price} $</p>
            </div>  
        `
        
        menuItemContainer.appendChild(itemCard);
        console.log(`rendering ${index}`)
    })
}