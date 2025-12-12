class Vehículo {
    constructor(nombre) {
        this.nombre = nombre;
    }

    sonido() {
        console.log("Sonido genérico de vehículo");
    }
}

class Auto extends Vehículo {
    sonido() {
        console.log("Vroom vroom!");
    }
}

const auto = new Auto("Ferrari");

auto.sonido();