class Cliente {
    constructor(nombre, dni, categoria) {
        this.nombre = nombre;
        this.dni = dni;
        this.categoria = categoria;
    }
    getNombre() { return this.nombre; }
    getDni() { return this.dni; }
    getCategoria() { return this.categoria; }

    setCategoria(nuevaCategoria) {
        this.categoria = nuevaCategoria;
    }
}