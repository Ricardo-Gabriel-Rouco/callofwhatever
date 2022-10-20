class guerrero{
    constructor(){
        this.dañofisico = 0;
    }
}

class mago{
    constructor(){
        this.dañomagico = 0;
    }
}

class jugador{
    constructor(tipo){
        this.vida = 100;
        this.nivel = 1;
    }
}

jugador.prototype.set = function(clase){
    let player = null;
    if(clase === 'mago'){
        player = new mago()
        this.dañomagico = this.nivel * 10;
        this.vida += this.nivel * (1.25)
    }
    if(clase === 'mago'){
        player = new guerrero()
        this.dañofisico = this.nivel * 10;
        this.vida += this.nivel * (1.5)
    }
}