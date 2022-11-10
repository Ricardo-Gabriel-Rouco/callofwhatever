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

class Limite{
    static ancho = 36
    static alto = 36
    constructor({ubicacion}){
        this.ubicacion = ubicacion
        this.ancho = 36
        this.alto = 36
    }

    draw(){
        c.fillRect(this.ubicacion.x, this.ubicacion.y, this.ancho, this.alto)
    }
}

const boundaries = []
colisionesMapa.forEach((row, i) =>{
    row.forEach((simbol, j)=>{
        if(simbol === 1025){
        boundaries.push(new Limite({
            ubicacion: {
                x: j * Limite.ancho,
                y: i * Limite.alto
            }
        }))
    }
    })
})

console.log(boundaries)

const image = new Image()
image.src ='./assets/prototipomapa.png'

const playerImage = new Image()
playerImage.src = './assets/playerDown.png'

// creamos la clase que renderiza los sprites/texturas


class texturas{
    constructor({posicion, velocidad, imagen}){
        this.posicion = posicion
        this.imagen = imagen
    }

    draw() {
        c.drawImage(this.imagen, this.posicion.x, this.posicion.y)
    }
}
const background = new texturas({
    posicion: {
        x: -1730, 
        y: -980}
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

// loop principal de animacion
function animar(){
    window.requestAnimationFrame(animar)
    background.draw()
    boundaries.forEach(limite =>{
        limite.draw()
    })
    c.drawImage(playerImage,
        // recorte de imagen
        0,
        0,
        playerImage.width / 4,
        playerImage.height, 
       // aca termina el recorte de imagen
        // aca empieza donde se renderiza la imagen y lo que se renderiza    
        canvas.width / 2, canvas.height /2,
        playerImage.width / 4,
        playerImage.height )
    boundaries.forEach(limite =>{
            console.log(limite)
            limite.draw()
       })

    if(keys.w.pressed && lastKey === 'w') background.posicion.y += 3
    else if(keys.s.pressed && lastKey === 's') background.posicion.y -= 3
    else if(keys.a.pressed && lastKey === 'a') background.posicion.x += 3
    else if(keys.d.pressed && lastKey === 'd') background.posicion.x -= 3
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