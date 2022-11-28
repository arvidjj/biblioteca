import * as UserDatabase from '../functions/controllers/UserController.js'
import * as LoginController from '../functions/LoginStatus.js'
import * as Biblioteca from '../functions/controllers/LibrosController.js';
import {
    renderBooks,
    renderComponent as renderLibreria
} from '../components/Libreria.js' //default page para redirect
import { render, toggleComponent } from '../functions/render.js';


function renderLogin() {
    const loginScreen = document.createElement('div')
    loginScreen.classList.add('login-screen')
    loginScreen.innerHTML = `
    <div class="login-container">
        <h2>Login</h2>
                <form action="" id="login-form">
                    <span class="login-message"></span>
                    <div class="login-row">
                        <label for="username">Usuario</label>
                        <input type="text" name="username" id="username">
                    </div>
                    <div class="login-row">
                        <label for="password">Contrasena</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <button type="submit">Iniciar Sesion</button>
                </form>
    </div>
    `
    return loginScreen;
}

function addEventsLogin() {
    const loginForm = document.querySelector('#login-form');
    const loginUser = document.querySelector('#username')
    const loginPassword = document.querySelector('#password')
    const loginMessage = document.querySelector('.login-message')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!(LoginController.signIn(loginUser.value, loginPassword.value))) {
            loginMessage.textContent = 'Usuario o contraseña invalidos.'
        } else {
            LoginController.updateUser()
            renderLibreria();
            renderBooks(Biblioteca.libros);
        }
    })
}

export { renderLogin, addEventsLogin };