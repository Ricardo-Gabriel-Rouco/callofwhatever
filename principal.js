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

const foregroundImage = new Image()
foregroundImage.src ='./assets/parte superior.png'

const playerDownImage = new Image()
playerDownImage.src = './assets/playerDown.png'
const playerUpImage = new Image()
playerUpImage.src = './assets/playerUp.png'
const playerLeftImage = new Image()
playerLeftImage.src = './assets/playerLeft.png'
const playerRightImage = new Image()
playerRightImage.src = './assets/playerRight.png'

const player = new texturas({
    posicion: {
        x: canvas.width / 2,
        y: canvas.height /2
    },
    imagen: playerDownImage,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage 
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

const foreground = new texturas({
   posicion: {
       x: offset.x, 
       y: offset.y
   },
   imagen: foregroundImage
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
const movibles = [background, ...boundaries, foreground]
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
    foreground.draw()
    let moving = true
    //esta es la parte del moviento
    player.moving = false
    if(keys.w.pressed && lastKey === 'w'){
        player.moving = true
        player.imagen = player.sprites.up
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
        player.moving = true
        player.imagen = player.sprites.down
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
        player.moving = true
        player.imagen = player.sprites.left
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
            })
        }
    }
    else if(keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.imagen = player.sprites.right
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
})