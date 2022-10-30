'use strict'
const modules = require('./personajes/jefes', './personajes/jugadores')

// cargamos el canvas aca
function cargaContextoCanvas(idCanvas){
    var elemento = document.getElementById(idCanvas);
    if(elemento && elemento.getContext()){
        var contexto = elemento.getContext('2d')
        if(contexto){
            return contexto;
        }
    }
    return false;
}

window.onload = function(){
    var ctx = cargaContextoCanvas("pantalla-principal")
    if(ctx){
        var img = new Image()
        img.src = 'assets/azatoth-npbg.png'
        img.onload = function(){
            ctx.drawImage(img, 10, 10)
        }
    }
}

// var azatoth = new Image()
// azatoth.src('C:\Users\Gabriel Rouco\Desktop\proyectos js\call of whatever i want\assets\azatoth-npbg.png')
// azatoth.onload = function(){
//     ctx.drawImage(azatoth, 10, 10)
// }