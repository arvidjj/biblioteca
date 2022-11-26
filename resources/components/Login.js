import * as UserDatabase from '../functions/UserController.js'
import * as LoginController from '../functions/LoginStatus.js'
import * as Biblioteca from '../functions/LibrosController.js';
import {
    renderBooks,
    renderComponent as renderLibreria
} from '../components/Libreria.js' //default page para redirect

function renderLogin() {
    const loginScreen = document.createElement('div')
    loginScreen.classList.add('login-screen')
    loginScreen.innerHTML = `
    <h2>Login</h2>
            <form action="" id="login-form">
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
    `
    return loginScreen;
}

function addEventsLogin() {
    const loginForm = document.querySelector('#login-form');
    const loginUser = document.querySelector('#username')
    const loginPassword = document.querySelector('#password')

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        LoginController.signIn(loginUser.value, loginPassword.value)
        LoginController.updateUser()
        if (LoginController.isLoggedIn) {
            renderLibreria();
            renderBooks(Biblioteca.libros);
        }
    })
}

export { renderLogin, addEventsLogin };