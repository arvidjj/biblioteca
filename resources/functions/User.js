export default class User {
    constructor(username, password) {
        this.id = User.incrementId()
        this.username = username
        this.password = password
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}