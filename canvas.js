
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//establezco variables para colores del canvas y ahorcado
var color01 = '#484848';
var color02 = '#2e0101';
var color03 = '#BF8B67';
var color04 = '#000000';
var color05 = '#008000';
var color06 = '#FF0000';
var color07 = '#f4c2e8';

//funciones creadas para mostrar y ocultar canvas, dibujar horca y hombre ahorcado
function mostrarCanvas() {
    canvas.style.display = "block";
    ctx.fillStyle = color01;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dibujarTriangulo();
    dibujarEspaciosPalabra(palabraSorteada);
}

function ocultarCanvas() {
    canvas.style.display = "none";
}

function dibujarTriangulo() {
    ctx.fillStyle = color02;
    ctx.beginPath();
    ctx.moveTo(50,400);
    ctx.lineTo(150,350)
    ctx.lineTo(250,400)
    ctx.fill();
}

function dibujarHorca() {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(150,360);
    ctx.lineTo(150,50);
    ctx.strokeStyle = color02;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(145,50);
    ctx.lineTo(250,50);
    ctx.strokeStyle = color02;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(245,50);
    ctx.lineTo(245,100);
    ctx.strokeStyle = color02;
    ctx.stroke();
}

function dibujarCabeza() {
    ctx.fillStyle = color04;
    ctx.beginPath();
    ctx.arc(245,130,35,0,2*Math.PI);
    ctx.fill();
}

function dibujarCuerpo() {
    ctx.beginPath();
    ctx.lineWidth = 25;
    ctx.moveTo(245,150);
    ctx.lineTo(245,270);
    ctx.strokeStyle = color04;
    ctx.stroke();
}

function dibujarManoDerecha() {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(245,220);
    ctx.lineTo(295,175);
    ctx.strokeStyle = color04;
    ctx.stroke();
}

function dibujarManoIzquierda() {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(245,220);
    ctx.lineTo(195,175);
    ctx.strokeStyle = color04;
    ctx.stroke();
}

function dibujarPieDerecho() {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(245,250);
    ctx.lineTo(295,330);
    ctx.strokeStyle = color04;
    ctx.stroke();
}

function dibujarPieIzquierdo() {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(245,250);
    ctx.lineTo(195,330);
    ctx.strokeStyle = color04;
    ctx.stroke();
}

function dibujarCara() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(225,120);
    ctx.lineTo(235,130);
    ctx.strokeStyle = color07;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(235,120);
    ctx.lineTo(225,130);
    ctx.strokeStyle = color07;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(255,120);
    ctx.lineTo(265,130);
    ctx.strokeStyle = color07;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(265,120);
    ctx.lineTo(255,130);
    ctx.strokeStyle = color07;
    ctx.stroke();

    ctx.fillStyle = color07;
    ctx.beginPath();
    ctx.arc(245,160,15,1.25*Math.PI,1.75*Math.PI);
    ctx.stroke();
}

function dibujarHombreGano() {    
    ctx.clearRect(50,45,295,360);
    ctx.fillStyle = color01;
    ctx.fillRect(50, 45, 295, 360);

    dibujarCabeza();
    dibujarCuerpo();
    dibujarManoDerecha();
    dibujarManoIzquierda();
    dibujarPieDerecho();
    dibujarPieIzquierdo();

    ctx.fillStyle = color07;
    ctx.beginPath();
    ctx.arc(230,125,5,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = color07;
    ctx.beginPath();
    ctx.arc(260,125,5,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = color07;
    ctx.beginPath();
    ctx.arc(245,125,25,0.25*Math.PI,0.75*Math.PI);
    ctx.fill();    
}

//creo funciones para dibujar espacios, palabras, letras usadas y resultado 
function dibujarEspaciosPalabra(palabraSorteada) {
    for (var i = 0; i < palabraSorteada.length; i++) {        
        ctx.fillStyle = color02;
        ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        var ejeX = i*45 + (canvas.width - palabraSorteada.length * 50) / 2 + 50;
        ctx.fillText('_', ejeX, 465);
    }
}

function reemplazarEspacioPorLetra(letra, index, posicion) {
    ctx.fillStyle = color02;
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    var ejeX = index*45 + (canvas.width - posicion * 50) / 2 + 50;
    ctx.fillText(letra, ejeX, 465);
}

function dibujarLetrasUsadas(letra, index) {
    if(index < 7) {
        ctx.fillStyle = "#c00000";
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        var ejeX = (index-1)*45 + 400;
        ctx.fillText(letra, ejeX, 250);

    } else if(index > 6 && index < 13) {
        ctx.fillStyle = "#c00000";
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        var ejeX = (index-7)*45 + 400;
        ctx.fillText(letra, ejeX, 300);
    } else if(index > 12 && index < 19) {
        ctx.fillStyle = "#c00000";
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        var ejeX = (index-13)*45 + 400;
        ctx.fillText(letra, ejeX, 350);
    }
}

function dibujarResultado(triunfo) {
    if(triunfo) {
        ctx.fillStyle = color05;
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText('Felicidades!,', 520, 110);
        ctx.fillText('Ganaste', 520, 170);
    } else {
        ctx.fillStyle = color06;
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText('Ups!...Perdiste,', 520, 110);

        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(`La palabra era ${palabraSorteada}`, 520, 170);
    }
}

