var canvas = document.getElementById('main-canvas')
var c = canvas.getContext('2d')
canvas.width = 640;
canvas.height = 480;

var image = new Image()
image.src ='./assets/prototipomapa.png'
c.fillRect(0, 0 , canvas.width, canvas.height)

image.onload = () => {
    c.drawImage(image, -900, -460)
}