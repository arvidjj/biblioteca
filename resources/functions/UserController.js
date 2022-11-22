import User from './User.js';

const userDatabase = [];

function addUser(user) {
    userDatabase.push(user);
}

//retorna usuario de la lista
function findUser(user, pass) {
    return userDatabase.find((data) => data.username === user && data.password === pass)
}

const user1 = new User('angel', '123');
addUser(user1);

export {userDatabase, addUser, findUser};