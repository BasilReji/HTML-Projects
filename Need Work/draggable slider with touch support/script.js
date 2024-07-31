const cards = document.querySelector('.cards')

let pressed = false
let startX = 0

cards.addEventListener('mousedown', function (e) {
    pressed = true
    startX = e.clientX
    this.style.cursor = 'grabbing'
    console.log(startX)
})

cards.addEventListener('mouseleave', function (e) {
    pressed = false
})


window.addEventListener('mouseup', function (e) {
    pressed = false
    cards.style.cursor = 'grab'
})

cards.addEventListener('mousemove', function (e) {
if(!pressed){
    return
}
this.scrollLeft += startX - e.clientX
})
