import { render, toggleComponent } from '../functions/render.js';

import * as UserDatabase from '../functions/controllers/UserController.js'
import * as LoginController from '../functions/LoginStatus.js'

const mainContent = document.querySelector('#content');

function renderComponent() {
    const main = document.createElement('main');
    main.innerHTML = `
    <div class="mini-header">
        <h1><strong>Usuarios</strong></h1>
        <hr>
            <div class="prestamos-layout">
                <div class="prestamos-options">
                    <h2>Menu</h2>
                    <ul>
                        <li><button id="usuarios-table-button">Usuarios</button></li>
                    </ul>
                </div>
                <div class="usuarios-main">
                    <div class="usuarios-container" id="usuarios-container"></div>
            </div>
        </div>
    </div>
    `

    render(main, mainContent)
}

function renderUsuarios(usuariosToRender) {
    console.log('rendering Items...')
    const menuItemContainer = document.querySelector('#usuarios-container');
    menuItemContainer.innerHTML = '<h2 id="titulo-usuarios">Usuarios</h2>';
    const newTable = document.createElement('table');
    const newTableBody = document.createElement('tbody');
    newTable.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Acciones</th>
            </tr>
        </thead>
                        `
    newTable.appendChild(newTableBody)
    usuariosToRender.forEach((item, index) => {
        const itemCell = document.createElement('tr');
        itemCell.setAttribute('id', `item-${index}`)
        itemCell.innerHTML = `
        <td>${index}</td>
        <td>${item.id}</td>
        <td>${item.username}</td>
        <td></td>
        <td></td>
        `

        newTableBody.appendChild(itemCell);
        console.log(`rendering ${index}`)
    })
    menuItemContainer.appendChild(newTable)
}

export {renderComponent, renderUsuarios}