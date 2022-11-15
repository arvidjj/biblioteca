export default class Libro {
    constructor(titulo, descripcion, autores, anho, categoria, editorial,
        stock, imagen) {
        this.id = Libro.incrementId()
        this.titulo = titulo
        this.descripcion = descripcion
        this.autores = autores
        this.anho = anho
        this.categoria = categoria
        this.editorial = editorial
        this.stock = stock
        this.imagen = imagen
        this.prestado = false;
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}