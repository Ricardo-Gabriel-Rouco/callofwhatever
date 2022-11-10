const canvas = document.getElementById('main-canvas')
const c = canvas.getContext('2d')

canvas.width = 720;
canvas.height = 510;

// con esto voy a trabajar en las colisiones, o sea en los limites del mapa

const colisionesMapa = []
// mi mapa es de 75 * 45 patrones
for (let i = 0; i < colisiones.length; i+=75){
    colisionesMapa.push(colisiones.slice(i, 75 + i))
}

class Limite{ //BOundary
    static ancho = 36
    static alto = 36
    constructor({posicion}){
        this.posicion = posicion
        this.ancho = 36
        this.alto = 36
    }

    draw(){
        c.fillStyle = 'rgba(255, 0 , 0 , 0)'
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.alto)
    }
}

const boundaries = [] //boundaries
// esto es por el desplazamiento del mapa. o sea la posicion inicial
const offset = {
    x: -1730,
    y: -980
}
colisionesMapa.forEach((row, i) =>{
    row.forEach((simbol, j)=>{
        if(simbol === 1025){
        boundaries.push(new Limite({
            posicion: {
                x: j * Limite.ancho + offset.x,
                y: i * Limite.alto + offset.y
            }
        }))
    }
    })
})

const image = new Image()
image.src ='./assets/prototipomapa.png'

const playerImage = new Image()
playerImage.src = './assets/playerDown.png'

// creamos la clase que renderiza los sprites/texturas


class texturas{
    constructor({posicion, velocidad, imagen, frames = {max: 1}}){
        this.posicion = posicion
        this.imagen = imagen
        this.frames = frames
        this.imagen.onload = () => {
            this.width = this.imagen.width / this.frames.max
            this.height = this.imagen.height
            console.log(this.width)
            console.log(this.height)

        }
    }

    draw() {
        c.drawImage(
            this.imagen,
            0,
            0,
            this.imagen.width / this.frames.max,
            this.imagen.height,
            this.posicion.x,
            this.posicion.y,              
            this.imagen.width / this.frames.max,
            this.imagen.height )
    }
}

// , 

const player = new texturas({
    posicion: {
        x: canvas.width / 2,
        y: canvas.height /2
    },
    imagen: playerImage,
    frames: {
        max: 4,
    }
}
)

const background = new texturas({
    posicion: {
        x: offset.x, 
        y: offset.y
    }
    ,
    imagen: image
}
    )

// defino las teclas si estan presionadas o no
const keys = {
    w: {
        pressed: false
    },
    
    a: {
        pressed: false
    },
    
    s: {
        pressed: false
    },
    
    d: {
        pressed: false
    }
}

// objetos movibles, o sea que se tienen que desplazar
const movibles = [background, ...boundaries]
// esto es la funcion que revisa las colisiones como tales
function colisionRectangular({rectangulo1, rectangulo2}){
    return(
        rectangulo1.posicion.x + rectangulo1.width >= rectangulo2.posicion.x && 
        rectangulo1.posicion.x <= rectangulo2.posicion.x + rectangulo2.ancho &&
        rectangulo1.posicion.y <= rectangulo2.posicion.y + rectangulo2.alto &&
        rectangulo1.posicion.y + rectangulo1.height >= rectangulo2.posicion.y
    )
}
// loop principal de animacion
function animar(){
    window.requestAnimationFrame(animar)
    background.draw()
    boundaries.forEach(boundary =>{
        boundary.draw()
    }
    )
    
    player.draw()
    let moving = true
    console.log(moving)
    //esta es la parte del moviento
    if(keys.w.pressed && lastKey === 'w'){
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(colisionRectangular({
                rectangulo1: player,
                rectangulo2: {...boundary, posicion:{
                    x: boundary.posicion.x,
                    y: boundary.posicion.y +3
                }}
            })){
                moving = false
                break
            }
            }
        if(moving){
        movibles.forEach(movible => {
            movible.posicion.y += 3
        })
    }
    }
    else if(keys.s.pressed && lastKey === 's'){
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(colisionRectangular({
                rectangulo1: player,
                rectangulo2: {...boundary, posicion:{
                    x: boundary.posicion.x,
                    y: boundary.posicion.y -3
                }}
            })){
                moving = false
                break
            }
            }
        if(moving){
        movibles.forEach(movible => {
            movible.posicion.y -= 3
        })}
    }
    else if(keys.a.pressed && lastKey === 'a') {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(colisionRectangular({
                rectangulo1: player,
                rectangulo2: {...boundary, posicion:{
                    x: boundary.posicion.x +3,
                    y: boundary.posicion.y
                }}
            })){
                moving = false
                break
            }
            }
        if(moving){
        movibles.forEach(movible => {
            movible.posicion.x += 3
        })}
    }
    else if(keys.d.pressed && lastKey === 'd') {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(colisionRectangular({
                rectangulo1: player,
                rectangulo2: {...boundary, posicion:{
                    x: boundary.posicion.x -3,
                    y: boundary.posicion.y
                }}
            })){
                moving = false
                break
            }
            }
        if(moving){
        movibles.forEach(movible => {
            movible.posicion.x -= 3
        })}
    }
}


animar()
// tomo el navegador como objeto y le agrego un escuchador de eventos. esta primera parate es para ver si las teclas se pulsan
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key){
        
        case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
        
        case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
        
        case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break
        
        case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    }
    console.log(keys)
})

window.addEventListener('keyup', (e) => {
    switch(e.key){
        
        case 'w':
        keys.w.pressed = false
        break
        
        case 's':
        keys.s.pressed = false
        break
        
        case 'a':
        keys.a.pressed = false
        break
        
        case 'd':
        keys.d.pressed = false
        break
    }
    console.log(keys)
})