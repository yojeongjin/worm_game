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
  state.worm = worm
}

gameBtn.onClick = () => {
  window.requestAnimationFrame(play)
}


let start = 0
function play(timestamp) {
  start ++
  if (timestamp-start > 80) {
    drawBackground()
    makeWorm()
    moveWorm()

    
    start = timestamp
  }
  window.requestAnimationFrame(play)
}

