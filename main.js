var canvas = document.getElementById('main-canvas')
var c = canvas.getContext('2d')
canvas.width = 720;
canvas.height = 510;
c.fillRect(0, 0 , canvas.width, canvas.height)

var image = new Image()
image.src ='./assets/prototipomapa.png'

var playerImage = new Image()
playerImage.src = './assets/playerDown.png'

// renderizo mapa y jugador
image.onload = () => {
    c.drawImage(image, -900, -450)
}

playerImage.onload = () => {
    c.drawImage(playerImage,
        // recorte de imagen
        0,
        0,
        playerImage.width / 4,
        playerImage.height, 
       // aca termina el recorte de imagen
        // aca empieza donde se renderiza la imagen y lo que se renderiza    
        480, 350,
        playerImage.width / 4,
        playerImage.height )    
}

// tomo el navegador como objeto y le agrego un escuchador de eventos
window.addEventListener('keydown', () => {

})