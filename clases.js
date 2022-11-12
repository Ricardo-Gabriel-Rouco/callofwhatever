// con esto se definen todas las texturas
class texturas {
    constructor({ posicion, velocidad, imagen, frames = { max: 1 }, sprites }) {
        this.posicion = posicion
        this.imagen = imagen
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.sprites = sprites
        this.imagen.onload = () => {
            this.width = this.imagen.width / this.frames.max
            this.height = this.imagen.height
            console.log(this.width)
            console.log(this.height)
        }
        this.moving = false
    }

    draw() {
        c.drawImage(
            this.imagen,
            this.frames.val * this.width,
            0,
            this.imagen.width / this.frames.max,
            this.imagen.height,
            this.posicion.x,
            this.posicion.y,
            this.imagen.width / this.frames.max,
            this.imagen.height)
        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        }
    }
}

//esta es la clase que define las colisiones o limites
class Limite { //BOundary
    static ancho = 36
    static alto = 36
    constructor({ posicion }) {
        this.posicion = posicion
        this.ancho = 36
        this.alto = 36
    }

    draw() {
        c.fillStyle = 'rgba(255, 0 , 0 , 0)'
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.alto)
    }
}
