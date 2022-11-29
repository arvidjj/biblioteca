import * as Biblioteca from '../functions/controllers/LibrosController.js';
import { render, toggleComponent} from '../functions/render.js';
import Libro from '../functions/Libro.js'

const mainContent = document.querySelector('#content');

function renderBooks(booksToRender) {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#book-container');
    menuItemContainer.innerHTML = '';

    booksToRender.forEach((item, index) => {
        const itemImage = item.imagen//getBase64(item.image) //obtener imagen
        const itemCard = document.createElement('div');
        const estado = item.stock === 0 ? `Sin stock: ${item.stock}` : `En stock: ${item.stock}`
        itemCard.classList.add('container-item')
        itemCard.setAttribute('id', `item-${item.id}`)
        itemCard.innerHTML = `
            <div class="item-image">
                <img src="${itemImage}" alt="Book">
            </div>
            <div class="item-info">
                <h3 id="info-title">${item.titulo}</h3>
                <p id="info-author">${item.autores}</p>
                <div class="item-stock" style="display:flex; justify-content:space-between;">
                    <p>${estado}</p>
                    <p>ID: ${item.id}</p>
                </div>
                <button id="modificar-libro-${item.id}">Modificar</button>
                <button id="eliminar-libro-${item.id}" style="background-color:darkred">Eliminar</button>
            </div>
        `

        menuItemContainer.appendChild(itemCard);
        console.log(`rendering ${index}`)
        const modificarLibro = document.querySelector(`#modificar-libro-${item.id}`)
        modificarLibro.addEventListener('click', ()=>{
            renderModificar(item)
        })
        const eliminarLibroButton = document.querySelector(`#eliminar-libro-${item.id}`)
        eliminarLibroButton.addEventListener('click', ()=>{
            eliminarLibro(item);
        })
    })
}

function renderComponent() {
    const main = document.createElement('main');
    main.setAttribute('id', 'main-libreria');
    main.innerHTML = `
    <div class="mini-header">
        <h1><strong>Libreria</strong></h1>
    </div>
            <hr>
            <div class="books-display">
                <div class="book-options">
                <button id="add-book-button">Agregar Libro</button>
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
                </div>
            </div>
            `;
    render(main, mainContent); //renderizar el componente
    const filterForm = document.querySelector('#filter-form')
    const filterOption = document.querySelector('#filter-select')
    filterForm.addEventListener('submit', (e) => { //agregar el filtrado
        e.preventDefault()
        const option = filterOption.value;
        renderBooks(sortBooks(option));
    })
    const addBookButton = document.querySelector('#add-book-button')
    addBookButton.addEventListener('click', () => {
        renderCrearBook();
    })
}

function sortBooks(parameter = 'titulo') { //por defecto titulo
    let sortedBooks = [];
    if (parameter === 'titulo') {
        sortedBooks = Biblioteca.libros.sort(
            (b1, b2) => (b1.titulo < b2.titulo) ? -1 : (b1.titulo > b2.titulo) ? 1 : 0);
    } else if (parameter === 'autores') {
        sortedBooks = Biblioteca.libros.sort(
            (b1, b2) => (b1.autores < b2.autores) ? -1 : (b1.autores > b2.autores) ? 1 : 0);
    }
    return sortedBooks;
}

function renderCrearBook() {
    const crearBookDiv = document.createElement('div')
    crearBookDiv.setAttribute('id', 'crearbook-screen')
    crearBookDiv.innerHTML = `
        <h2>Agregar Nuevo Libro</h2>
        <form action="" id="crear-book-form">
            <div class="form-row">
                <label for="new-titulo">Titulo</label>
                <input type="text" name="new-titulo" id="new-titulo">
            </div>
            <div class="form-row">
                <label for="new-descripcion">Descripcion</label>
                <textarea name="new-descripcion" id="new-descripcion"></textarea>
            </div>
            <div class="form-row">
                <label for="new-autores">Autores</label>
                <input type="text" name="new-autores" id="new-autores">
            </div>
            <div class="form-row">
                <label for="new-anho">Año</label>
                <input type="number" name="new-anho" id="new-anho">
            </div>
            <div class="form-row">
                <label for="new-categoria">Categoria</label>
                <input type="text" name="new-categoria" id="new-categoria">
            </div>
            <div class="form-row">
                <label for="new-editorial">Editorial</label>
                <input type="text" name="new-editorial" id="new-editorial">
            </div>
            <div class="form-row">
                <label for="new-stock">Stock</label>
                <input type="number" name="new-stock" id="new-stock">
            </div>
            <div class="form-row">
                <label for="new-imagen">Imagen</label>
                <input type="file" accept="image/png, image/gif, image/jpeg" name="new-imagen" id="new-imagen"
                >
            </div>

            <div class="form-buttons">
                <button type="submit">Agregar</button>
                <button id="cancelar-agregar">Cancelar</button>
            </div>
        </form>
    `

    render(crearBookDiv, document.querySelector('.book-container'));

    const agregarForm = document.querySelector('#crear-book-form')
    const cancelarForm = document.querySelector('#cancelar-agregar')

    const inputTitulo = document.querySelector('#new-titulo')
    const inputDescripcion = document.querySelector('#new-descripcion')
    const inputAutores = document.querySelector('#new-autores')
    const inputAnho = document.querySelector('#new-anho')
    const inputCategoria = document.querySelector('#new-categoria')
    const inputEditorial = document.querySelector('#new-editorial')
    const inputStock = document.querySelector('#new-stock')
    const inputImagen = document.querySelector('#new-imagen')
    //transformar imagen a string
    cancelarForm.addEventListener('click', (e) => {
        e.preventDefault();
        renderBooks(Biblioteca.libros);
    })
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          return reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
    agregarForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const imagen = '../resources/images/libros/libroejemplo.png'//getBase64(inputImagen.files[0]);
        const nuevoBook = new Libro(
            inputTitulo.value,
            inputDescripcion.value,
            inputAutores.value,
            inputAnho.value,
            inputCategoria.value,
            inputEditorial.value,
            inputStock.value,
            imagen
            
        )
        Biblioteca.agregarLibro(nuevoBook);
        renderBooks(Biblioteca.libros);

        localStorage.setItem("libros", JSON.stringify(Biblioteca.libros));
    })
}

//modificar libro a traves de objeto, no id
function renderModificar(libro){
    //const libro = Biblioteca.getLibroById(libroId);
    const modificarBookDiv = document.createElement('div')
    modificarBookDiv.setAttribute('id', 'crearbook-screen')
    modificarBookDiv.innerHTML = `
        <h2>Modificar Libro ID: ${libro.id}</h2>
        <form action="" id="modificar-libro-form">
        <div class="form-row">
                <label for="new-titulo">Titulo</label>
                <input type="text" name="new-titulo" id="new-titulo" value="${libro.titulo}">
            </div>
            <div class="form-row">
                <label for="new-descripcion">Descripcion</label>
                <textarea name="new-descripcion" id="new-descripcion">${libro.descripcion}</textarea>
            </div>
            <div class="form-row">
                <label for="new-autores">Autores</label>
                <input type="text" name="new-autores" id="new-autores" value="${libro.autores}">
            </div>
            <div class="form-row">
                <label for="new-anho">Año</label>
                <input type="number" name="new-anho" id="new-anho" value="${libro.anho}">
            </div>
            <div class="form-row">
                <label for="new-categoria">Categoria</label>
                <input type="text" name="new-categoria" id="new-categoria" value="${libro.categoria}">
            </div>
            <div class="form-row">
                <label for="new-editorial">Editorial</label>
                <input type="text" name="new-editorial" id="new-editorial" value="${libro.editorial}">
            </div>
            <div class="form-row">
                <label for="new-stock">Stock</label>
                <input type="number" name="new-stock" id="new-stock" value="${libro.stock}">
            </div>
            <div class="form-row">
                <label for="new-imagen">Imagen</label>
                <input type="file" accept="image/png, image/gif, image/jpeg" name="new-imagen" id="new-imagen"
                >
            </div>

            <div class="form-buttons">
                <button type="submit">Guardar Modificacion</button>
                <button id="cancelar-modificar">Cancelar</button>
            </div>
        </form>
    `
    render(modificarBookDiv, document.querySelector('.book-container'));

    const guardarForm = document.querySelector('#modificar-libro-form')
    const cancelarForm = document.querySelector('#cancelar-modificar')

    const inputTitulo = document.querySelector('#new-titulo')
    const inputDescripcion = document.querySelector('#new-descripcion')
    const inputAutores = document.querySelector('#new-autores')
    const inputAnho = document.querySelector('#new-anho')
    const inputCategoria = document.querySelector('#new-categoria')
    const inputEditorial = document.querySelector('#new-editorial')
    const inputStock = document.querySelector('#new-stock')
    const inputImagen = document.querySelector('#new-imagen')

    cancelarForm.addEventListener('click', (e) => {
        e.preventDefault();
        renderBooks(Biblioteca.libros);
    })
    guardarForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const imagen = '../resources/images/libros/libroejemplo.png'//getBase64(inputImagen.files[0]);
        const nuevoBook = new Libro(
            inputTitulo.value,
            inputDescripcion.value,
            inputAutores.value,
            inputAnho.value,
            inputCategoria.value,
            inputEditorial.value,
            inputStock.value,
            imagen
            
        )
        Biblioteca.modificarLibro(libro ,nuevoBook);
        renderBooks(Biblioteca.libros);
        localStorage.setItem("libros", JSON.stringify(Biblioteca.libros));
    })
}

function eliminarLibro(libro){
    Biblioteca.quitarLibro(libro)
    renderBooks(Biblioteca.libros);
    localStorage.setItem("libros", JSON.stringify(Biblioteca.libros));
}

export { renderBooks, renderComponent };