// Variables globales
let hoteles = null;
let hotelActual = 0;
let totalHoteles = 0;

// Elementos del DOM
const vistaCuadricula = document.getElementById('vista-cuadricula');
const vistaDetalle = document.getElementById('vista-detalle');
const tituloHotel = document.getElementById('titulo-receta');
const imagenHotel = document.getElementById('imagen-receta');
const infoDescripcion = document.getElementById('info-duracion');
const infoCategoria = document.getElementById('info-porciones');
const listaServicios = document.getElementById('lista-ingredientes');
const listaUbicacion = document.getElementById('lista-procedimiento');
const contenedorDetalle = document.getElementById('contenedor-detalle');

// Cargar los hoteles al iniciar
cargarHoteles();

async function cargarHoteles() {
    try {
        const respuesta = await fetch('resources/hoteles.json');
        hoteles = await respuesta.json();
        iniciarApp();
    } catch (error) {
        console.log('Error cargando los hoteles:', error);
        // Usar datos de ejemplo si hay error
        hoteles = {
            "Belmond Hotel Monasterio": {
                "Información General": {
                    "descripcion": "Lujoso hotel de 5 estrellas ubicado en un monasterio colonial del siglo XVI declarado monumento nacional.",
                    "categoria": "Lujo - 5 Estrellas",
                    "inauguracion": "1995 (como hotel)",
                    "estilo_arquitectonico": "Colonial / Monasterio restaurado",
                    "certificaciones": ["Relais & Châteaux", "Miembro de Leading Hotels of the World"]
                },
                "Ubicación y Acceso": {
                    "ubicacion_exacta": "Calle Palacio 136, Plazoleta Nazarenas, a 2 cuadras de la Plaza de Armas de Cusco.",
                    "como_llegar_desde_aeropuerto": "Taxi (20-25 minutos) o traslado privado del hotel.",
                    "zona": "Centro Histórico - Zona Tranquila",
                    "cercania_principales_atractivos": "Plaza de Armas (2 min), Coricancha (5 min), Museo de Arte Precolombino (1 min)"
                },
                "Servicios y Comodidades": [
                    "Sistema de oxígeno enriquecido en todas las habitaciones",
                    "Dos restaurantes gourmet",
                    "Capilla barroca original con conciertos privados",
                    "Spa con tratamientos andinos y sauna"
                ],
                "Imagen": "https://media.cntraveler.com/photos/5d6f9b5da8c4bb0008ca76af/master/w_2580%2Cc_limit/Belmond-Hotel-Monasterio_2019_Exterior_EL-007.jpg",
                "color_tema": "#8B4513"
            }
        };
        iniciarApp();
    }
}

function iniciarApp() {
    totalHoteles = Object.keys(hoteles).length;
    mostrarCuadricula();
}

function mostrarCuadricula() {
    vistaCuadricula.innerHTML = '';

    const nombreHoteles = Object.keys(hoteles);

    nombreHoteles.forEach((nombre, indice) => {
        const hotel = hoteles[nombre];
        
        // Crear tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta mostrar';
        tarjeta.style.cursor = 'pointer';
        tarjeta.style.border = '1px solid #e0e0e0';
        tarjeta.style.borderRadius = '8px';
        tarjeta.style.overflow = 'hidden';
        tarjeta.style.backgroundColor = 'white';
        tarjeta.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        tarjeta.style.transition = 'transform 0.3s, box-shadow 0.3s';
        
        // Efecto hover
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.transform = 'translateY(-5px)';
            tarjeta.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
        });
        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transform = 'translateY(0)';
            tarjeta.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        // Imagen
        const imagen = document.createElement('img');
        imagen.src = hotel.Imagen || 'https://via.placeholder.com/300x200?text=Hotel+en+Cusco';
        imagen.alt = nombre;
        imagen.loading = 'lazy';
        imagen.style.objectFit = 'cover';
        imagen.style.height = '200px';
        imagen.style.width = '100%';
        
        // Contenido de la tarjeta
        const contenido = document.createElement('div');
        contenido.className = 'tarjeta-contenido';
        contenido.style.padding = '15px';
        
        // Título
        const titulo = document.createElement('h3');
        titulo.className = 'tarjeta-titulo';
        titulo.textContent = nombre;
        titulo.style.margin = '0 0 10px 0';
        titulo.style.fontSize = '1.2rem';
        titulo.style.color = '#333';
        
        // Categoría y estrellas
        const info = document.createElement('div');
        info.className = 'tarjeta-info';
        info.style.marginBottom = '10px';
        
        const categoria = document.createElement('span');
        categoria.className = 'tarjeta-categoria';
        categoria.textContent = hotel["Información General"]?.categoria || 'Hotel';
        categoria.style.backgroundColor = '#4CAF50';
        categoria.style.color = 'white';
        categoria.style.padding = '4px 8px';
        categoria.style.borderRadius = '4px';
        categoria.style.fontSize = '0.85rem';
        categoria.style.fontWeight = 'bold';
        
        // Añadir icono de estrella según la categoría
        const estrellasMatch = categoria.textContent.match(/(\d+)\s*Estrella/);
        if (estrellasMatch) {
            const numEstrellas = parseInt(estrellasMatch[1]);
            const estrellas = document.createElement('span');
            estrellas.className = 'estrellas';
            estrellas.textContent = ' ★'.repeat(numEstrellas);
            estrellas.style.color = '#FFD700';
            estrellas.style.marginLeft = '5px';
            info.appendChild(categoria);
            info.appendChild(estrellas);
        } else {
            info.appendChild(categoria);
        }
        
        // Descripción breve
        const descripcion = document.createElement('p');
        descripcion.className = 'tarjeta-descripcion';
        const descripcionText = hotel["Información General"]?.descripcion || 'Hotel en Cusco';
        descripcion.textContent = descripcionText.length > 120 
            ? descripcionText.substring(0, 120) + '...' 
            : descripcionText;
        descripcion.style.color = '#666';
        descripcion.style.fontSize = '0.9rem';
        descripcion.style.lineHeight = '1.4';
        descripcion.style.margin = '10px 0 0 0';
        
        // Ubicación breve
        const ubicacion = document.createElement('div');
        ubicacion.className = 'tarjeta-ubicacion';
        ubicacion.innerHTML = `<small>📍 ${hotel["Ubicación y Acceso"]?.zona || 'Cusco Centro'}</small>`;
        ubicacion.style.color = '#888';
        ubicacion.style.fontSize = '0.8rem';
        ubicacion.style.marginTop = '8px';
        
        // Evento de clic
        tarjeta.onclick = function() {
            mostrarDetalle(indice);
        };
        
        // Unir todo
        contenido.appendChild(titulo);
        contenido.appendChild(info);
        contenido.appendChild(descripcion);
        contenido.appendChild(ubicacion);
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);
        vistaCuadricula.appendChild(tarjeta);
    });
}

function mostrarDetalle(indice) {
    hotelActual = indice;
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

function hotelAnterior() {
    hotelActual--;
    if (hotelActual < 0) {
        hotelActual = totalHoteles - 1;
    }
    actualizarDetalle();
    window.scrollTo(0, 0);
}

function hotelSiguiente() {
    hotelActual++;
    if (hotelActual >= totalHoteles) {
        hotelActual = 0;
    }
    actualizarDetalle();
    window.scrollTo(0, 0);
}

function actualizarDetalle() {
    const nombresHoteles = Object.keys(hoteles);
    const nombre = nombresHoteles[hotelActual];
    const hotel = hoteles[nombre];

    // Actualizar título
    tituloHotel.textContent = nombre;

    // Actualizar imagen
    imagenHotel.src = hotel.Imagen || 'https://via.placeholder.com/600x400?text=Hotel+en+Cusco';
    imagenHotel.alt = nombre;

    // Actualizar información general
    infoDescripcion.innerHTML = `<strong>📖 Descripción:</strong> ${hotel["Información General"]?.descripcion || 'Sin descripción disponible'}`;
    
    // Actualizar categoría y detalles
    let categoriaInfo = '';
    if (hotel["Información General"]?.categoria) {
        categoriaInfo += `<strong>⭐ Categoría:</strong> ${hotel["Información General"].categoria}`;
    }
    if (hotel["Información General"]?.inauguracion) {
        categoriaInfo += `<br><strong>📅 Inauguración:</strong> ${hotel["Información General"].inauguracion}`;
    }
    if (hotel["Información General"]?.estilo_arquitectonico) {
        categoriaInfo += `<br><strong>🏛️ Estilo Arquitectónico:</strong> ${hotel["Información General"].estilo_arquitectonico}`;
    }
    infoCategoria.innerHTML = categoriaInfo || '<strong>⭐ Categoría:</strong> No especificada';

    // Agregar información adicional
    let infoExtra = '';
    
    // Certificaciones
    if (hotel["Información General"]?.certificaciones && hotel["Información General"].certificaciones.length > 0) {
        const certificacionesText = hotel["Información General"].certificaciones.join(', ');
        infoExtra += `<div class="info-item"><strong>🏆 Certificaciones:</strong> ${certificacionesText}</div>`;
    }
    
    // Información de ubicación
    if (hotel["Ubicación y Acceso"]?.cercania_principales_atractivos) {
        infoExtra += `<div class="info-item"><strong>📍 Cercanía a atractivos:</strong> ${hotel["Ubicación y Acceso"].cercania_principales_atractivos}</div>`;
    }

    // Agregar información adicional al contenedor
    const contenedorInfo = document.querySelector('.info-receta');
    if (contenedorInfo) {
        contenedorInfo.innerHTML = infoDescripcion.outerHTML + infoCategoria.outerHTML + infoExtra;
    }

    // Actualizar servicios y comodidades
    listaServicios.innerHTML = '';
    if (hotel["Servicios y Comodidades"] && Array.isArray(hotel["Servicios y Comodidades"])) {
        hotel["Servicios y Comodidades"].forEach(servicio => {
            const elemento = document.createElement('li');
            elemento.textContent = servicio;
            elemento.style.padding = '8px 0';
            elemento.style.borderBottom = '1px solid #f0f0f0';
            listaServicios.appendChild(elemento);
        });
    } else {
        const elemento = document.createElement('li');
        elemento.textContent = 'Información de servicios no disponible';
        listaServicios.appendChild(elemento);
    }

    // Actualizar información de ubicación y acceso
    listaUbicacion.innerHTML = '';
    
    const ubicacionInfo = [];
    
    if (hotel["Ubicación y Acceso"]?.ubicacion_exacta) {
        ubicacionInfo.push(`📍 <strong>Dirección:</strong> ${hotel["Ubicación y Acceso"].ubicacion_exacta}`);
    }
    
    if (hotel["Ubicación y Acceso"]?.como_llegar_desde_aeropuerto) {
        ubicacionInfo.push(`✈️ <strong>Desde el aeropuerto:</strong> ${hotel["Ubicación y Acceso"].como_llegar_desde_aeropuerto}`);
    }
    
    if (hotel["Ubicación y Acceso"]?.zona) {
        ubicacionInfo.push(`🗺️ <strong>Zona:</strong> ${hotel["Ubicación y Acceso"].zona}`);
    }

    if (ubicacionInfo.length > 0) {
        ubicacionInfo.forEach(info => {
            const elemento = document.createElement('li');
            elemento.innerHTML = info;
            elemento.style.padding = '8px 0';
            elemento.style.borderBottom = '1px solid #f0f0f0';
            listaUbicacion.appendChild(elemento);
        });
    } else {
        const elemento = document.createElement('li');
        elemento.textContent = 'Información de ubicación no disponible';
        listaUbicacion.appendChild(elemento);
    }

    // Cambiar color de borde según el tema del hotel
    if (hotel.color_tema) {
        contenedorDetalle.style.borderLeft = `5px solid ${hotel.color_tema}`;
    } else {
        contenedorDetalle.style.borderLeft = '5px solid #4CAF50';
    }
    
    // Añadir efectos visuales
    contenedorDetalle.style.transition = 'all 0.3s ease';
    contenedorDetalle.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
}

// Hacer las funciones accesibles globalmente
window.volverACuadricula = volverACuadricula;
window.hotelAnterior = hotelAnterior;
window.hotelSiguiente = hotelSiguiente;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los elementos existan antes de usarlos
    const elementosRequeridos = [
        vistaCuadricula, 
        vistaDetalle, 
        tituloHotel, 
        imagenHotel
    ];
    
    const todosExisten = elementosRequeridos.every(elemento => elemento !== null);
    
    if (todosExisten) {
        cargarHoteles();
    } else {
        console.error('Faltan elementos del DOM requeridos');
        // Mostrar mensaje de error al usuario
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.textContent = 'Error al cargar la aplicación. Por favor, recarga la página.';
        errorDiv.style.cssText = 'background: #f44336; color: white; padding: 20px; margin: 20px; border-radius: 5px; text-align: center;';
        document.body.prepend(errorDiv);
    }
    
    // Añadir estilos básicos si no existen
    if (!document.querySelector('#estilos-dinamicos')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-dinamicos';
        estilos.textContent = `
            .tarjeta {
                transition: all 0.3s ease;
            }
            .tarjeta:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            }
            .info-item {
                margin: 8px 0;
                padding: 8px;
                background: #f9f9f9;
                border-radius: 4px;
            }
            #lista-ingredientes, #lista-procedimiento {
                padding-left: 20px;
            }
            #lista-ingredientes li, #lista-procedimiento li {
                margin-bottom: 8px;
            }
        `;
        document.head.appendChild(estilos);
    }
});