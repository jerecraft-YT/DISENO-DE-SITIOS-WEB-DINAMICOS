let nota = 75;
let dia = "lunes";

if (nota >= 90) {
    console.log("super aprobado");
} else if (nota >= 70) {
    console.log("aprobado");
} else {
    console.log("reprobado");
}

switch (dia) {
    case "lunes":
        console.log("lunes");
        break;
    case "martes":
        console.log("martes");
        break;
    case "miércoles":
        console.log("miercoles");
        break;
    default:
        console.log("día no valido");
}