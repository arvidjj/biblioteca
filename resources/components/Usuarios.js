import { render, toggleComponent } from '../functions/render.js';

import * as UserDatabase from '../functions/controllers/UserController.js'
import User from '../functions/User.js';
import * as LoginController from '../functions/LoginStatus.js'

const mainContent = document.querySelector('#content');

function renderComponent() {
    const main = document.createElement('main');
    main.innerHTML = `
    <div class="mini-header">
        <h1><strong>Usuarios</strong></h1>
    </div>
        <hr>
            <div class="prestamos-layout">
                <div class="prestamos-options">
                    <h2>Menu</h2>
                    <ul>
                        <li><button id="usuarios-table-button">Usuarios</button></li>
                    </ul>
                </div>
                <div class="usuarios-main">
                    <div class="usuarios-buttons"><button id="registrar-usuario">Registrar Usuario</button></div>
                    <div class="usuarios-container" id="usuarios-container"></div>
        </div>
    </div>
    `
    render(main, mainContent)
    const renderUsuariosButton = document.querySelector('#usuarios-table-button')
    renderUsuariosButton.addEventListener('click', () => {
        renderUsuarios(UserDatabase.userDatabase);
    })
    const registrarUsuario = document.querySelector('#registrar-usuario')
    registrarUsuario.addEventListener('click', () => {
        renderNewUserForm();
    })
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
        <td>${item.rol}</td>
        <td> <button id="eliminar-usuario-${item.id}" style="background-color:darkred">Eliminar</button></td>
        `

        newTableBody.appendChild(itemCell);
        console.log(`rendering ${index}`)
    })
    menuItemContainer.appendChild(newTable)
}

function renderNewUserForm() {
    const newUserScreen = document.createElement('div')
    newUserScreen.classList.add('newuser-screen')
    newUserScreen.innerHTML = `
        <h2>Registrar nuevo usuario</h2>
                <form action="" id="new-user-form">
                    <div class="row-field">
                        <label for="username">Usuario</label>
                        <input type="text" name="username" id="username">
                    </div>
                    <div class="row-field">
                        <label for="password">Contrasena</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <span class="new-user-message"></span>
                    <div class="form-buttons" style="margin-top:10px">
                        <button type="submit">Registrar</button>
                    </div>
                </form>
    `
    render(newUserScreen, document.querySelector('#usuarios-container'));
    const loginForm = document.querySelector('#new-user-form');
    const loginUser = document.querySelector('#username')
    const loginPassword = document.querySelector('#password')
    const loginMessage = document.querySelector('.new-user-message')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoUsuario = new User(loginUser.value, loginPassword.value)
        UserDatabase.addUser(nuevoUsuario)
        renderUsuarios(UserDatabase.userDatabase)

        localStorage.setItem("usuarios", JSON.stringify(UserDatabase.userDatabase));
    })
}

export { renderComponent, renderUsuarios }