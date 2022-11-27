import * as UserDatabase from './controllers/UserController.js'

let currentUser = 'guest';
let isLoggedIn = false;

//para iniciar sesion
function signIn(user, pass) {
    const userFind = UserDatabase.findUser(user, pass);
    if (userFind) {
        currentUser = userFind;
        isLoggedIn = true;
        return true;
    } else {
        isLoggedIn = false;
        return false;
    }
}



function updateUser() {
    const usernameCorner = document.querySelector('#corner-username');
    usernameCorner.textContent = isLoggedIn ? currentUser.username : 'Guest';
}

export {currentUser, isLoggedIn, signIn, updateUser};