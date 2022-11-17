export default class Prestamo {
    constructor(cliente, libro, fecha, fechadevolucion) {
        this.id = Prestamo.incrementId();
        this.cliente = cliente
        this.libro = libro
        this.fecha = fecha
        this.fechadevolucion = fechadevolucion
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
    /*addLibro(libro) {
        this.libros.push(libro);
    }
    removeLibro(libro) {
        this.libros.splice(this.libros.indexOf(libro), 1);
    }*/
}