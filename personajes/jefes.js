const vidabase = 1000;
const damage = 100
var nombre = null;
var ataqueJugador = 0;
var ataqueMonstruo = 0;


class monstruosEpicos {
    constructor(){
        this.name = nombre;
        this.nivel = 1;
        this.vida = vidabase * this.nivel;
        this.damage = damage * this.nivel
    }
}

monstruosEpicos.prototype.add = function(nombreepico, level){
    this.name = nombreepico;
    this.nivel = level
}

monstruosEpicos.prototype.status = function(){
    return 'Nombre: ' + this.name + ' Vida: ' + this.vida + ' Daño: ' + this.damage
}

monstruosEpicos.prototype.attack = function(){
    ataqueMonstruo = this.damage
}

monstruosEpicos.prototype.damageTaken = function(ataqueJugador){
    this.vida = this.vida - ataqueJugador
    if(this.vida <= 0){return 'Derrotado'}
    return this.vida
}

var tulu = new monstruosEpicos()
tulu.add('tulu', 2)
console.log(tulu.status())
// console.log(jugador.damageTaken())