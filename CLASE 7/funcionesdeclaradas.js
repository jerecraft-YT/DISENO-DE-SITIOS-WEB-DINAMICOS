// 1. LA LLAMAMOS ANTES DE DEFINIRLA
// Esto funciona perfectamente gracias al "hoisting".
let resultadoSuma = sumar(20, 5);

console.log("Resultado de la suma:", resultadoSuma); // Muestra: 15

// 2. LA DEFINIMOS (DECLARAMOS) DESPUÉS
function sumar(a, b) {
  return a + b;
}


// 1. SI INTENTAMOS LLAMARLA ANTES
// let resultadoResta = restar(10, 2); // <-- ESTO DARÍA UN ERROR
// Error: "Cannot access 'restar' before initialization" (si se usa const/let)

// 2. LA DEFINIMOS (EXPRESAMOS)
// Creamos una función anónima y la guardamos en la constante 'restar'
const restar = function(a, b) {
  return a - b;
};

// 3. LA LLAMAMOS DESPUÉS
let resultadoResta = restar(10, 2);

console.log("Resultado de la resta:", resultadoResta); // Muestra: 8


//FUNCION DE FLECHAS
// 1. LA DEFINIMOS
const multiplicar = (a, b) => {
  return a * b;
};

// 2. LA LLAMAMOS
let resultadoMult = multiplicar(5, 5);

console.log("Resultado de la multiplicación:", resultadoMult); // Muestra: 25

// Si la función es de una sola línea, puede ser aún más corta:
const dividir = (a, b) => a / b;

console.log("Resultado de la división:", dividir(100, 4)); // Muestra: 25