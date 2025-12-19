// Variables globales
let lugares = null;
let lugarActual = 0;
let totalLugares = 0;

// Elementos del DOM
const vistaCuadricula = document.getElementById('vista-cuadricula');
const vistaDetalle = document.getElementById('vista-detalle');
const tituloLugar = document.getElementById('titulo-receta'); // Este ID se mantiene igual pero ahora muestra lugares
const imagenLugar = document.getElementById('imagen-receta'); // Este ID se mantiene igual pero ahora muestra lugares
const infoDescripcion = document.getElementById('info-duracion'); // Cambiar contenido
const infoTipo = document.getElementById('info-porciones'); // Cambiar contenido
const listaAtractivos = document.getElementById('lista-ingredientes'); // Ahora muestra atractivos
const listaUbicacion = document.getElementById('lista-procedimiento'); // Ahora muestra información de ubicación
const contenedorDetalle = document.getElementById('contenedor-detalle');

// Cargar los lugares al iniciar
cargarLugares();

async function cargarLugares() {
    try {
        const respuesta = await fetch('resources/lugares.json');
        lugares = await respuesta.json();
        iniciarApp();
    } catch (error) {
        console.log('Error cargando los lugares:', error);
        // Usar datos de ejemplo si hay error
        lugares = {
            "Machu Picchu": {
                "Información General": {
                    "descripcion": "La ciudadela inca más famosa del mundo, enclavada en lo alto de una montaña entre los Andes y la Amazonía. Declarada Patrimonio de la Humanidad por la UNESCO y una de las Nuevas Siete Maravillas del Mundo Moderno.",
                    "tipo": "Ciudadela Inca / Sitio Arqueológico",
                    "época": "Siglo XV (Imperio Inca)",
                    "altitud": "2,430 msnm",
                    "patrimonio_unesco": true
                },
                "Ubicación y Acceso": {
                    "ubicacion_exacta": "Distrito de Machupicchu, provincia de Urubamba, a 80 km al noroeste del Cusco.",
                    "como_llegar": "1) Tren desde Cusco u Ollantaytambo hasta Aguas Calientes + bus. 2) Camino Inca (trekking de 4 días).",
                    "boleto_turistico": "NO está incluido en el Boleto Turístico del Cusco. La entrada se compra por separado, con cupos limitados y es obligatoria la reserva anticipada. Hay diferentes circuitos.",
                    "horario_recomendado": "Ingreso por turnos (mañana o tarde). Se recomienda llegar a primera hora para evitar nubes."
                },
                "Atractivos Principales": [
                    "Intihuatana: 'Reloj solar' o piedra ritual para medir el tiempo y las estaciones.",
                    "Templo del Sol: Edificación semicircular con ventanas trapezoidales y fina mampostería.",
                    "Templo de las Tres Ventanas: Ofrece una vista panorámica espectacular de las montañas.",
                    "Habitación del Guardian: El punto clásico para la foto postal de toda la ciudadela.",
                    "Puerta del Sol (Inti Punku): Antiguo acceso principal y mirador para los que hacen el Camino Inca."
                ],
                "Imagen": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
                "color_tema": "#2F4F4F"
            }
        };
        iniciarApp();
    }
}

function iniciarApp() {
    totalLugares = Object.keys(lugares).length;
    mostrarCuadricula();
}

function mostrarCuadricula() {
    vistaCuadricula.innerHTML = '';

    const nombreLugares = Object.keys(lugares);

    nombreLugares.forEach((nombre, indice) => {
        const lugar = lugares[nombre];
        
        // Crear tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta mostrar';
        tarjeta.style.cursor = 'pointer';
        
        // Imagen
        const imagen = document.createElement('img');
        imagen.src = lugar.Imagen || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
        imagen.alt = nombre;
        imagen.loading = 'lazy';
        imagen.style.objectFit = 'cover';
        imagen.style.height = '180px';
        imagen.style.width = '100%';
        
        // Contenido de la tarjeta
        const contenido = document.createElement('div');
        contenido.className = 'tarjeta-contenido';
        
        // Título
        const titulo = document.createElement('h3');
        titulo.className = 'tarjeta-titulo';
        titulo.textContent = nombre;
        
        // Información básica
        const info = document.createElement('div');
        info.className = 'tarjeta-info';
        
        // Tipo de lugar
        const tipo = document.createElement('span');
        tipo.className = 'tarjeta-tipo';
        tipo.textContent = lugar["Información General"]?.tipo || 'Lugar Turístico';
        
        // Época (si existe)
        if (lugar["Información General"]?.época) {
            const epoca = document.createElement('span');
            epoca.className = 'tarjeta-epoca';
            epoca.textContent = ` | ${lugar["Información General"].época}`;
            info.appendChild(tipo);
            info.appendChild(epoca);
        } else {
            info.appendChild(tipo);
        }
        
        // Descripción breve
        const descripcion = document.createElement('p');
        descripcion.className = 'tarjeta-descripcion';
        const descripcionText = lugar["Información General"]?.descripcion || 'Lugar turístico de Cusco';
        descripcion.textContent = descripcionText.length > 120 
            ? descripcionText.substring(0, 120) + '...' 
            : descripcionText;
        
        // Evento de clic
        tarjeta.onclick = function() {
            mostrarDetalle(indice);
        };
        
        // Unir todo
        contenido.appendChild(titulo);
        contenido.appendChild(info);
        contenido.appendChild(descripcion);
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);
        vistaCuadricula.appendChild(tarjeta);
    });
}

function mostrarDetalle(indice) {
    lugarActual = indice;
    actualizarDetalle();

    // Cambiar vistas
    vistaCuadricula.style.display = 'none';
    vistaDetalle.style.display = 'block';
    contenedorDetalle.classList.add('mostrar');

    // Ir al inicio de la página
    window.scrollTo(0, 0);
}

function volverACuadricula() {
    vistaDetalle.style.display = 'none';
    vistaCuadricula.style.display = 'grid';
}

function lugarAnterior() {
    lugarActual--;
    if (lugarActual < 0) {
        lugarActual = totalLugares - 1;
    }
    actualizarDetalle();
    window.scrollTo(0, 0);
}

function lugarSiguiente() {
    lugarActual++;
    if (lugarActual >= totalLugares) {
        lugarActual = 0;
    }
    actualizarDetalle();
    window.scrollTo(0, 0);
}

function actualizarDetalle() {
    const nombresLugares = Object.keys(lugares);
    const nombre = nombresLugares[lugarActual];
    const lugar = lugares[nombre];

    // Actualizar título
    tituloLugar.textContent = nombre;

    // Actualizar imagen
    imagenLugar.src = lugar.Imagen || 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    imagenLugar.alt = nombre;

    // Actualizar información general
    infoDescripcion.innerHTML = `<strong>📖 Descripción:</strong> ${lugar["Información General"]?.descripcion || 'Sin descripción disponible'}`;
    
    // Actualizar tipo y época
    let tipoInfo = '';
    if (lugar["Información General"]?.tipo) {
        tipoInfo += `<strong>🏛️ Tipo:</strong> ${lugar["Información General"].tipo}`;
    }
    if (lugar["Información General"]?.época) {
        tipoInfo += `<br><strong>⏳ Época:</strong> ${lugar["Información General"].época}`;
    }
    infoTipo.innerHTML = tipoInfo || '<strong>🏛️ Tipo:</strong> No especificado';

    // Agregar información adicional
    let infoExtra = '';
    
    if (lugar["Información General"]?.altitud) {
        infoExtra += `<div class="info-item"><strong>🗻 Altitud:</strong> ${lugar["Información General"].altitud}</div>`;
    }
    
    if (lugar["Información General"]?.patrimonio_unesco !== undefined) {
        const esPatrimonio = lugar["Información General"].patrimonio_unesco ? 'Sí' : 'No';
        infoExtra += `<div class="info-item"><strong>🏛️ Patrimonio UNESCO:</strong> ${esPatrimonio}</div>`;
    }
    
    if (lugar["Ubicación y Acceso"]?.boleto_turistico) {
        infoExtra += `<div class="info-item"><strong>🎫 Boleto Turístico:</strong> ${lugar["Ubicación y Acceso"].boleto_turistico}</div>`;
    }
    
    if (lugar["Ubicación y Acceso"]?.horario_recomendado) {
        infoExtra += `<div class="info-item"><strong>🕐 Horario Recomendado:</strong> ${lugar["Ubicación y Acceso"].horario_recomendado}</div>`;
    }

    // Agregar información adicional al contenedor
    const contenedorInfo = document.querySelector('.info-receta');
    if (contenedorInfo) {
        contenedorInfo.innerHTML = infoDescripcion.outerHTML + infoTipo.outerHTML + infoExtra;
    }

    // Actualizar atractivos principales
    listaAtractivos.innerHTML = '';
    if (lugar["Atractivos Principales"] && Array.isArray(lugar["Atractivos Principales"])) {
        lugar["Atractivos Principales"].forEach(atractivo => {
            const elemento = document.createElement('li');
            elemento.textContent = atractivo;
            listaAtractivos.appendChild(elemento);
        });
    } else {
        const elemento = document.createElement('li');
        elemento.textContent = 'Información de atractivos no disponible';
        listaAtractivos.appendChild(elemento);
    }

    // Actualizar información de ubicación y acceso
    listaUbicacion.innerHTML = '';
    
    const ubicacionInfo = [
        lugar["Ubicación y Acceso"]?.ubicacion_exacta && `📍 Ubicación: ${lugar["Ubicación y Acceso"].ubicacion_exacta}`,
        lugar["Ubicación y Acceso"]?.como_llegar && `🚗 Cómo llegar: ${lugar["Ubicación y Acceso"].como_llegar}`
    ].filter(Boolean); // Filtrar elementos null/undefined

    if (ubicacionInfo.length > 0) {
        ubicacionInfo.forEach(info => {
            const elemento = document.createElement('li');
            elemento.textContent = info;
            listaUbicacion.appendChild(elemento);
        });
    } else {
        const elemento = document.createElement('li');
        elemento.textContent = 'Información de ubicación no disponible';
        listaUbicacion.appendChild(elemento);
    }

    // Cambiar color de fondo si existe
    if (lugar.color_tema) {
        contenedorDetalle.style.borderLeft = `5px solid ${lugar.color_tema}`;
    } else {
        contenedorDetalle.style.borderLeft = '5px solid #4CAF50';
    }
}

// Hacer las funciones accesibles globalmente
window.volverACuadricula = volverACuadricula;
window.lugarAnterior = lugarAnterior;
window.lugarSiguiente = lugarSiguiente;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los elementos existan antes de usarlos
    const elementosRequeridos = [
        vistaCuadricula, 
        vistaDetalle, 
        tituloLugar, 
        imagenLugar
    ];
    
    const todosExisten = elementosRequeridos.every(elemento => elemento !== null);
    
    if (todosExisten) {
        cargarLugares();
    } else {
        console.error('Faltan elementos del DOM requeridos');
        // Mostrar mensaje de error al usuario
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.textContent = 'Error al cargar la aplicación. Por favor, recarga la página.';
        errorDiv.style.cssText = 'background: #f44336; color: white; padding: 20px; margin: 20px; border-radius: 5px; text-align: center;';
        document.body.prepend(errorDiv);
    }
});