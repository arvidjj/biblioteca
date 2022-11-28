import * as UserDatabase from './controllers/UserController.js'
import { render, toggleComponent } from './render.js';

let currentUser = '';
let isLoggedIn = false;
const logoutButton = document.querySelector('#logout-button');
const loginButton = document.querySelector('#login-button');



//para iniciar sesion
function signIn(user, pass) {
    const userFind = UserDatabase.findUser(user, pass);
    if (userFind) {
        currentUser = userFind;
        isLoggedIn = true;
        toggleComponent(logoutButton)
        toggleComponent(loginButton)
        localStorage.setItem("loggedusername", user);
        localStorage.setItem("loggedpassword", pass);
        return true;
    } else {
        isLoggedIn = false;
        localStorage.setItem("loggedusername", '');
        localStorage.setItem("loggedpassword", '');
        return false;
    }
}
//cerrar sesion
function logout() {
    currentUser = '';
    isLoggedIn = false;
    localStorage.setItem("loggedusername", '');
    localStorage.setItem("loggedpassword", '');
    updateUser()
    toggleComponent(logoutButton)
    toggleComponent(loginButton)
}


function updateUser() {
    const usernameCorner = document.querySelector('#corner-username');
    usernameCorner.textContent = isLoggedIn ? currentUser.username : '';
}

export {currentUser, isLoggedIn, signIn, logout, updateUser};