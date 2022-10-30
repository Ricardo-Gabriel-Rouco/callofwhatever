const vidabase = 100;
const magicDamage = 10
const phisicDamage = 10
var nombre = null;
var tipo = null;
var ataqueJugador = 0;
var ataqueMonstruo = 0;

class player{
    constructor(){
        this.name = nombre;
        this.nivel = 1;
        this.tipo = tipo;
        this.vida = vidabase * this.nivel;
        this.magicDamage = magicDamage * (this.nivel * 1.25);
        this.phisicDamage = phisicDamage * (this.nivel * 1.5);
    }
}

player.prototype.add = function(nombreepico, tipo){
    this.name = nombreepico;
    this.tipo = tipo;
    if(this.tipo === 'mago'){
        this.phisicDamage = 0;
    }
    if(this.tipo === 'guerrero'){
        this.magicDamage = 0;
    }
}

player.prototype.status = function(){
    return 'Nombre: ' + this.name + ' Clase: ' + this.tipo + ' Vida: ' + this.vida + ' Daño fisico: ' + this.phisicDamage + ' Daño Magico: ' + this.magicDamage
}

player.prototype.attack = function(){
    ataqueJugador = this.phisicDamage + this.magicDamage
}

player.prototype.damageTaken = function(ataqueMonstruo){
    this.vida = this.vida - ataqueMonstruo
    if(this.vida <= 0){return 'Derrotado'}
    return this.vida
}

var jugador = new player()
jugador.add('hola', 'guerrero')
console.log(jugador.status())
// console.log(jugador.damageTaken())