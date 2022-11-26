import * as UserDatabase from './UserController.js'

let currentUser = 'guest';
let isLoggedIn = false;

//para iniciar sesion
function signIn(user, pass) {
    const userFind = UserDatabase.findUser(user, pass);
    if (userFind) {
        alert("Welcome " + userFind.username)
        currentUser = userFind;
        isLoggedIn = true;
    } else {
        alert("Wrong username or password!")
        isLoggedIn = false;
    }
}



function updateUser() {
    const usernameCorner = document.querySelector('#corner-username');
    usernameCorner.textContent = isLoggedIn ? currentUser.username : 'Guest';
}

export {currentUser, isLoggedIn, signIn, updateUser};