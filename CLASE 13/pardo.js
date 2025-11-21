/*
JSON 
{
    "nombre":"Daniel",
    "edad":"30",
    "contraseña":"osito123"
}

{
    "nombre":"Carlos",
    "edad": 30,
    "contraseña": "perrito1234",
    "estudios": ["primaria","secundaria","instituto","universidad"]
}

XML
<persona>
    <nombre>Daniel</nombre>
    <edad>30</edad>
    <contraseña>osito123</contraseña>
    <estudios>
        <estudio>primaria</estudio>
        <estudio>secundaria</estudio>
        <estudio>prepa</estudio>
        <estudio>universidad</estudio>
    </estudios>
</persona>
*/

addEventListener('load',inicializarEventos,false);

function inicializarEventos() {
    var ob = document.getElementById('boton1');
    ob.addEventListener('click', presionBoton, false);
}

function presionBoton() {

    var cadena ='{"procesador":"intel",' +
                ' "ram": 16000, ' +
                '"memoria":[10,50]' +
                '}';
    var pc = JSON.parse(cadena);

    alert('procesador = ' + pc.procesador);
    alert('ram = ' + pc.ram);
    alert('memoria 1 = ' + pc.memoria[0]);
    alert('memoria 2 = ' + pc.memoria[1]);
}