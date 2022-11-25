export default class Cliente {
    constructor(nombre, apellido, ci) {
        this.nombre = nombre
        this.apellido = apellido
        this.ci = ci
    }
    librosPrestados = [];

    prestarLibro(libro) {
        this.librosPrestados.push(libro)
    }
    devolverLibro(libro) {
        console.log(libro)
        this.librosPrestados.splice(this.librosPrestados.indexOf(libro), 1);
    }
    get librosPrestados() {
        this.librosPrestados;
    }
}