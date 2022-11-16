export default class Prestamo {
    constructor(cliente, libro, fecha, fechadevolucion) {
        this.cliente = cliente
        this.libro = libro
        this.fecha = fecha
        this.fechadevolucion = fechadevolucion
    }

    /*addLibro(libro) {
        this.libros.push(libro);
    }
    removeLibro(libro) {
        this.libros.splice(this.libros.indexOf(libro), 1);
    }*/
}