class Calculador{
    sumar(x , y){
        return x + y
    }
}

const Calculadora = new Calculador()

console.log("-- EJEMPLO 1: Objeto Math Nativo --");

console.log("El valor de PI es:", Math.PI);

console.log("Redondeo de 4.2:", Math.round(4.2));

console.log("El número mayor entre 10, 50 y 5 es:", Math.max(10, 50, 5));

console.log("\n");

console.log("-- EJEMPLO 2: Método Estético Personalizado --");

console.log("Suma estática (5 + 10):", Calculadora.sumar(5, 10));