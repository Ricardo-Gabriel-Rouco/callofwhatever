const canvas = document.getElementById('main-canvas')
const c = canvas.getContext('2d')
canvas.width = 720;
canvas.height = 510;
c.fillRect(0, 0 , canvas.width, canvas.height)

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
        x: -1750, 
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