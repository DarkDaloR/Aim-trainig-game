const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
let score = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const circleColors = ['#2d0ff5', '#19e3d5', '#19e32d','#e3dc19', '#e37b19', '#8b19e3', '#735887', '#c9b657', '#e82a9c','151b59']
const boardColors = ['#858f8f']

startBtn.addEventListener('click', (event) => {    
    event.preventDefault(event)
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if  (event.target.classList.contains('time-btn'))
  time = parseInt(event.target.getAttribute('data-time'))
  screens[1].classList.add('up')
  startGame()
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){   
    setInterval(decreaseTime, 1000)   
    setTime(time) 
    createRandomCircle()
}



function decreaseTime(){
    if (time === 0) {
        finishGame()
    } else {
        setTime(--time)
    }

}

function setTime(value){
    if (value < 10)  {
        timeEl.innerHTML = `00:0${value}`
    } else {       
        timeEl.innerHTML = `00:${value}`
    }
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(10, 70)
    const {height, width} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size) 
    const y = getRandomNumber(0, height - size)
    const circleColor = circleColors[getRandomNumber(0, circleColors.length - 1)]
    const boardColor = boardColors[getRandomNumber(0, boardColors.length - 1)]
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = circleColor
    board.style.background = boardColor
    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}