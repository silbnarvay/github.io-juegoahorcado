//variable que contiene palabras aleatorias del juego

var palabras = ["MAGIA", "PERSEVERA", "VIAJAR", "AMANECER", "DESCONFIANZA", "ALEGRIA", "ANOCHECER", "NOSTALGIA", "PATAGONIA", "TEMOR", "MENDIGO", "GATO", "FESTEJO", "MATE", "PHYTON", "EUFORIA"]

//variables creadas para el funcionamiento del juego
var btnIniciarJuego = document.getElementById('iniciar-juego');
var contenedorPrincipal = document.getElementById('contenedor-principal');
var inputOculto = document.getElementById('input-oculto');
var btnNuevaPalabra = document.getElementById('nueva-palabra');
var inputNuevaPalabra = document.getElementById('input-nueva-palabra');
var contenedorCanvas = document.getElementById('contenedor-canvas');
var divBotones = document.getElementById('botones');
var btnReiniciarJuego = document.getElementById('btn-reiniciar');
var btnVolverInicio = document.getElementById('btn-inicio');
var listaPalabras = palabras.map((palabra) => palabra.toUpperCase());

var palabraSorteada = '';
var soloLetras ='^[A-ZÑ]+$';
var letrasUsadas = [];
var letrasAcertadas = 0;
var vidas = 8;
var juegoIniciado = false;

iniciarApp();

//funciones con eventos para el juego
function iniciarApp() {
    agregarEventListeners();
    ocultarCanvas();
    divBotones.style.display = 'none';
};

function agregarEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        btnIniciarJuego.addEventListener('click', iniciarJuego);
        btnReiniciarJuego.addEventListener('click', reiniciarJuego);
        btnVolverInicio.addEventListener('click', volverInicio);
        contenedorCanvas.addEventListener("click", focusInput);  
        btnNuevaPalabra.addEventListener("click", agregarPalabras);  
        inputOculto.addEventListener("input", (e)=> {teclaPresionada(e)});
    });
}

function iniciarJuego() {
    ocultarInicio();
    juegoIniciado = true;
    divBotones.style.display = 'none';
    palabraSorteada = sortearPalabra();
    mostrarCanvas();
    abrirTeclado();
}

function focusInput() {
    inputOculto.focus();
}

function ocultarInicio() {
    contenedorPrincipal.style.display = "none";
}

function sortearPalabra() {
    var random = Math.floor(Math.random() * listaPalabras.length);
    return listaPalabras[random];
}

function abrirTeclado() {
    inputOculto.disabled = false;    
    inputOculto.focus();
}

function teclaPresionada(e) {
    inputOculto.blur();
    if(juegoIniciado === false) {
        return;
    }
    
    var letra = e.target.value.toUpperCase();
    verificarLetra(letra);
    inputOculto.value = '';  
    inputOculto.focus();  
}

function verificarLetra(letra) {    
    var acierto = false;
    
    if(letra.match(soloLetras) != null){
        if(agregarLetrasUsadas(letra)){
            for (var i = 0; i < palabraSorteada.length; i++) {
                if (palabraSorteada[i] === letra) {                
                    reemplazarEspacioPorLetra(letra, i, palabraSorteada.length);
                    letrasAcertadas++;
                    acierto = true;
                }
            }
            if(acierto === false) {
                vidas--;
            }
            
            comenzarDibujo(vidas);
            verifcarVictoria();
        };
    } else {
        mensajeError();
    }
}

function agregarLetrasUsadas(letra) {
    if(letrasUsadas.includes(letra)){        
        return false;
    } else {
        letrasUsadas.push(letra);        
        dibujarLetrasUsadas(letra, letrasUsadas.length);
        return true;
    }
}

function verifcarVictoria(){
    if(vidas === 0) {        
        juegoIniciado = false;
        inputOculto.disabled = true;    
        dibujarResultado(false);
        divBotones.style.display = 'block';

    } else if (letrasAcertadas === palabraSorteada.length) {
        juegoIniciado = false;
        inputOculto.disabled = true;    
        dibujarResultado(true);
        dibujarHombreGano();
        divBotones.style.display = 'block';        
    }
}
//Utilicé el condional switch para las opciones de las vidas del juego
function comenzarDibujo(vidas) {
    switch(vidas) {
        case 8:
            break;
        case 7:
            dibujarHorca();
            break;
        case 6:
            dibujarCabeza();
            break;
        case 5:
            dibujarCuerpo();
            break;
        case 4:
            dibujarManoDerecha();
            break;
        case 3:
            dibujarManoIzquierda();
            break;
        case 2:
            dibujarPieDerecho();
            break;
        case 1:
            dibujarPieIzquierdo();
            break;
        case 0:
            dibujarCara();
            break;
        default:
            break;
    }
}

function cerrarTeclado() {
    inputOculto.disabled = true; 
    inputOculto.blur();
}

function reiniciarJuego() {    
    palabraSorteada = '';    
    letrasUsadas = [];
    letrasAcertadas = 0;
    vidas = 8;
    juegoIniciado = false;
    canvas.width = canvas.width;
    iniciarJuego();
}

function volverInicio() {
    window.location.reload();    
}

function agregarPalabras() {
    var nuevaPalabra = inputNuevaPalabra.value.toUpperCase();

    if(nuevaPalabra.match(soloLetras)!=null && nuevaPalabra.length > 3 && nuevaPalabra.length < 13){    
        palabras.push(nuevaPalabra);
        inputNuevaPalabra.value = "";

        var mensajeNuevaPalabra = document.querySelector('.mensaje');

        if(!mensajeNuevaPalabra) {
            inputNuevaPalabra.classList.add('input-oculto');
            mensajePalabraAgregada('exito');
        } 

    } else {
        inputNuevaPalabra.value = "";
        inputNuevaPalabra.classList.add('input-oculto');
        mensajePalabraAgregada('error');
    }
}

function mensajePalabraAgregada(tipo) {
    var divBotonesInput = document.getElementById('botones-input');
    var divMensaje = document.createElement('div');
    divMensaje.classList.add('mensaje');    

    if(tipo === 'exito') {
        divMensaje.classList.add('mensaje-exito');    
        divMensaje.textContent = 'La palabra fue agregada exitosamente';            
        divBotonesInput.appendChild(divMensaje);

    } else if (tipo === 'error') {
        divMensaje.classList.add('mensaje-error');    
        divMensaje.textContent = 'Solo mayúsculas, sin caracteres especiales';            
        divBotonesInput.appendChild(divMensaje);
    }    

    btnNuevaPalabra.disabled = true;
    
    setTimeout(()=> {
        divMensaje.remove();
        btnNuevaPalabra.disabled = false;
        inputNuevaPalabra.classList.remove('input-oculto');
    }, 3000);
}

function mensajeError() {
    var mensajeError = document.querySelector('.mensaje-error');
    
    if(!mensajeError) {            
        var divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje-error');    
        divMensaje.textContent = 'No se permiten números, espacios ni caracteres especiales';            
        contenedorCanvas.appendChild(divMensaje);
        inputOculto.disabled = true;
        
        setTimeout(()=> {
            divMensaje.remove();
            inputOculto.disabled = false;
            inputOculto.focus();
        }, 3000);
    }
}