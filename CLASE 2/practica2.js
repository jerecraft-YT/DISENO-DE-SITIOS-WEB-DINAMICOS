console.log("este es un mensaje informativo");


console.error("ocurrió un error inesperado");

const datos =[ { nombre: "Juan", edad: 30, sexo: "m" },
                { nombre: "María", edad: 25, sexo: "f" },
                { nombre: "Areliz", edad: 14, sexo: "f" },
];
console.table(datos);
console.error("!hola espia¡");
const espia = [
    { nombre: "Julian", edad: 70},
    { nombre: "Ester", edad: 25},
];
console.table(espia);
console.table(datos, ["nombre", "edad"]);