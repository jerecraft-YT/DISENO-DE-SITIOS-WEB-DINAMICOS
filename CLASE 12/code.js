let recetasData = null;
let actualItem = 0;
let tamañoLista = 0;
let receta = "";
const nombreReceta = document.getElementById("recetaTitulo")
const nombreIngredientes = document.getElementById("Ingredientes")
const nombreProcedimiento = document.getElementById("Procedimiento")
const datoProcedimiento = document.getElementById("procedimiento")
const duracion = document.getElementById("duracion")
const porciones = document.getElementById("porciones")
const datoIngrediente = document.getElementById("ingredientes")
const contenedorGeneral = document.getElementById("ContenedorRecetas")
const elementosContenedor = document.querySelectorAll(".ContenedorElemento")

// Agregar clase para animaciones
contenedorGeneral.classList.add('page-transition');

cargarRecetas()

async function cargarRecetas() {
    try {
        const response = await fetch('./recetas.json');
        recetasData = await response.json();
        inicializarApp();
    } catch (error) {
        console.error('Error cargando JSON:', error);
    }
}

function inicializarApp(){
    tamañoLista = Object.keys(recetasData).length
    updateData()
}

async function back(){
    await cambiarRecetaConAnimacion('back');
}

async function next(){
    await cambiarRecetaConAnimacion('next');
}

async function cambiarRecetaConAnimacion(direccion) {
    // Deshabilitar botones durante la animación
    const botones = document.querySelectorAll('button');
    botones.forEach(boton => {
        boton.style.pointerEvents = 'none';
        boton.style.opacity = '0.7';
    });
    
    // Ocultar contenido actual
    ocultarContenido();
    
    // Esperar un momento para que se oculte
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Cambiar contenido
    if (direccion === 'next') {
        actualItem += 1;
    } else {
        actualItem -= 1;
    }
    detectLimit();
    
    // Esperar a que termine la animación de swipe
    await new Promise(resolve => setTimeout(resolve, 450));
    
    // Actualizar datos
    updateData();
    
    // Mostrar nuevo contenido
    mostrarContenido();
    
    // Habilitar botones
    botones.forEach(boton => {
        boton.style.pointerEvents = 'auto';
        boton.style.opacity = '1';
    });
}

function ocultarContenido() {
    // Aplicar animación de salida
    contenedorGeneral.classList.add('animate');
    
    // Ocultar todos los elementos hijos directos e indirectos
    // Usamos selectores más simples
    const elementosParaOcultar = [
        '#recetaTitulo',
        '.ContenedorElemento',
        '#duracion',
        '#porciones',
        '#ingredientes',
        '#procedimiento',
        "#Ingredientes",
        "#Procedimiento"
    ];
    
    elementosParaOcultar.forEach(selector => {
        const elementos = contenedorGeneral.querySelectorAll(selector);
        elementos.forEach(el => {
            el.classList.add('content-hidden');
            el.classList.remove('content-visible');
        });
    });
}

function mostrarContenido() {
    // Remover animación de swipe
    setTimeout(() => {
        contenedorGeneral.classList.remove('animate');
    }, 100);
    
    // Mostrar contenido con animación
    const elementosParaMostrar = [
        '#recetaTitulo',
        '.ContenedorElemento',
        '#duracion',
        '#porciones',
        '#ingredientes',
        '#procedimiento',
        "#Ingredientes",
        "#Procedimiento"
    ];
    
    elementosParaMostrar.forEach(selector => {
        const elementos = contenedorGeneral.querySelectorAll(selector);
        elementos.forEach(el => {
            el.classList.remove('content-hidden');
            el.classList.add('content-visible');
        });
    });
    
    // Remover clase de visible después de un tiempo
    setTimeout(() => {
        elementosParaMostrar.forEach(selector => {
            const elementos = contenedorGeneral.querySelectorAll(selector);
            elementos.forEach(el => {
                el.classList.remove('content-visible');
            });
        });
    }, 800);
}

function updateData(){
    receta = Object.keys(recetasData)[actualItem]
    nombreReceta.textContent = receta
    duracion.textContent = "Duracion: " + recetasData[receta].Info.duracion
    porciones.textContent = "Porciones: " + recetasData[receta].Info.porciones
    
    const ingredientes = recetasData[receta].Ingredientes;
    const textoIngredientes = ingredientes.map(item => `• ${item}`).join('\n');
    datoIngrediente.textContent = textoIngredientes
    datoIngrediente.style.whiteSpace = 'pre-line';

    const procedimiento = recetasData[receta].Procedimiento;
    const textProcedimiento = procedimiento.map(item => `• ${item}`).join('\n');
    datoProcedimiento.textContent = textProcedimiento
    datoProcedimiento.style.whiteSpace = 'pre-line';

    contenedorGeneral.style.backgroundImage = `url('${recetasData[receta].Imagen}')`

    // Color de los contenedores
    const colorHex = recetasData[receta].color;
    
    if (colorHex) {
        const rgbColor = hexToRgb(colorHex);
        
        if (rgbColor) {
            elementosContenedor.forEach(elemento => {
                elemento.style.backgroundColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`;
            });
        }
    }
}

function detectLimit(){
    if (actualItem < 0){
        actualItem = tamañoLista-1
    }
    if (actualItem > tamañoLista-1){
        actualItem = 0
    }
}

function hexToRgb(hex) {
    const hexValue = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}