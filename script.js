const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const $score = document.querySelector('.score')
const $highScore = document.querySelector('.high-score')
const $gameBtn = document.querySelector('.game-btn')

let state = {
  score: 0,
  highscore: localStorage.getItem('score') || 0,
  gameover: true,
  direction: 1,
  worm: [
    {x:10, y:10, direction:1},
    {x:10, y:20, direction:1},
    {x:10, y:30, direction:1}
  ],
  food: {x:0, y:0}
}



function drawBackground(){
  ctx.fillStyle='rgb(0, 0, 102)'
  ctx.fillRect(0,0,450,450)
}


function drawWorm(ctx, x, y, head = false) {
  ctx.fillStyle = head ? 'rgba(229, 65, 120, 0.929)' : 'rgba(153, 206, 244, 0.498)'
  ctx.fillRect(x,y,10,10)
}

function makeWorm() {
  for (let i=state.worm.length-1; i>=0; i--) {
    drawWorm(ctx, state.worm[i].x, state.worm[i].y, i === 0)
  }
}


function keyPressed(key) {
  let direction = 0

  switch (key) {
    case 'ArrowRight':
      direction = 1
      break

    case 'ArrowDown':
      direction = 2
      break

    case 'ArrowLeft':
      direction = 3
      break
    
    case 'ArrowUp':
      direction = 4
      break

  }
  return direction
}

document.addEventListener('keydown', (event) => {
  event.preventDefault()


  let direction = keyPressed(event.key)

  if (direction === 1 && state.worm[0].direction !== 3) {
    state.direction = direction
  } else if (direction === 2 && state.worm[0].direction !== 4) {
    state.direction = direction
  } else if (direction === 3 && state.worm[0].direction !== 1) {
    state.direction = direction
  } else if (direction === 4 && state.worm[0].direction !== 2) {
    state.direction = direction
  }
  
})




function moveWorm() {
  let x = state.worm[0].x
  let y = state.worm[0].y
  
  if (state.direction === 1) {
    x += 10
  } else if (state.direction === 2) {
    y += 10
  } else if (state.direction === 3) {
    x -= 10
  } else if (state.direction === 4) {
    y -= 10
  }

  const worm = [{ x, y, direction: state.direction }]
  const wormLength = state.worm.length

  for (let i=1; i<wormLength; i++) {
    worm.push({ ...state.worm[i - 1] })
  }
  state.worm = worm
}



function randomFood() {
  let x = Math.floor(Math.random()*45)*10
  let y = Math.floor(Math.random()*45)*10

  state.food= {x, y}
  console.log(state.food.x, state.food.y)
}

function drawFood(ctx, x, y) {
  ctx.fillStyle = 'rgb(101, 255, 204)'
  ctx.fillRect(x, y, 10, 10)
} 

function eatenFood() {
  let wormX = state.worm[0].x
  let wormY = state.worm[0].y

  let foodX = state.food.x
  let foodY = state.food.y

  if (wormX === foodX && wormY === foodY) {
    randomFood()
    stretchBody()
    state.score++

    $score.innerHTML = `${state.score}`
  }
}

function stretchBody() {
  let body = state.worm[state.worm.length - 1]
  let direction = body.direction

  let x = body.x
  let y = body.y

  if (direction === 1) {
    x += 10
  } else if (direction === 2) {
    y -= 10
  } else if (direction === 3) {
    x -= 10
  } else if (direction === 4) {
    y += 10
  }

  state.worm.push({x, y, direction})  
}

function gameOver() {
  const head = state.worm[0]
    return state.worm.some(
      (body, index) => index !== 0 && head.x === body.x && head.y === body.y
    )
}



let start = 0
function play(timestamp) {
  start++  
  if(gameOver()) {
    return
  }
  if(timestamp - start > 80) {
    drawBackground()
    makeWorm()
    moveWorm()
    drawFood(ctx, state.food.x, state.food.y)
    eatenFood()

    start=timestamp
  }

  window.requestAnimationFrame(play)
}


function gameStart() {
  if(state.gameover) {
    state = {
      score: 0,
      highscore: localStorage.getItem('score') || 0,
      gameover: false,
      direction: 1,
      worm: [
        {x:10, y:10, direction:1},
        {x:10, y:20, direction:1},
        {x:10, y:30, direction:1}
      ],
      food: {x:0, y:0}
    }
    $score.innerHTML = `0`
    $highScore.innerHTML = `${state.highscore}`
    randomFood()
    window.requestAnimationFrame(play)
  }
}



gameStart()