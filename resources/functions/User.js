export default class User {
    constructor(username, password, rol) {
        this.id = User.incrementId()
        this.username = username
        this.password = password
        this.rol = rol;
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}