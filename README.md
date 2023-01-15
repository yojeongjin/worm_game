# 💻 Project
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/98960420/212526028-085e383c-f4fe-4895-be5a-848514760c0f.gif)
* 제목 : 지렁이 게임
* 기간 : 2022.08.26~2022.09.05
* 목적
  * 바닐라 자바스크립트로 토이 프로젝트를 만들어보며 자바스크립트의 기초 문법을 익히기 위함
  * 웹상에 도형과 같은 그래픽적인 것을 표현 할 때 사용하는 canvas 태그 학습
* 데모페이지
  * https://cheerful-sundae-cb00ce.netlify.app/
  
# 🛠 사용기술
<img src="https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=HTML5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-1F8ACB?style=plastic&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=JavaScript&logoColor=fff" /> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=plastic&logo=Netlify&logoColor=fff" />


# 🐍 지렁이 게임

### 1. 지렁이 그리기 및 움직이기

```JavaScript
function play() {
...
drawBackground()
makeWorm()
moveWorm()
drawFood(ctx, state.food.x, state.food.y)
eatenFood()
...
}

function gameStart() {
...
  window.requestAnimationFrame(play)
...
}

```

수행하기를 원하는 애니메이션들을 함수로 만들고 gameStart 함수에서 window.requestAnimationFrame()을 애니메이션을 콜백으로 전달하여 계속해서 리페인트 시켜주었습니다.

### 2. 지렁이 방향 전환

```JavaScript

function keyPressed(key) {
  let direction = 0

  switch (key) {
    case 'ArrowRight':
      direction = 1
      break
...
    
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
...
  } else if (direction === 4 && state.worm[0].direction !== 2) {
    state.direction = direction
  }
  
})


```

keyPressed 함수를 만들어 눌려진 key의 방향을 숫자로 변환하여 keydown 이벤트 발생 시 if 문의 조건으로 사용하여 지렁이의 방향을 전환시켰습니다.
또한 좌로 진행 중 우로 방향을 전환 할 수 없고 위로 진행 중 아래로 방향을 전환할 수 없는 점을 고려하여 조건문에 추가하였습니다. 

### 3. 먹이 획득

```JavaScript

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


```

지렁이의 머리 위치가 먹이의 위치와 일치하게되면 기존의 먹이는 사라지고 새로운 먹이를 캔버스 상에 놓이게 하였습니다.
또한, 머리와 먹이가 맞닿는 순간이 되면 지렁이 몸통의 배열을 하나 늘려 화면상 지렁이의 몸통이 늘어나는 것처럼 로직을 구현하였습니다.

---

# 마치는 글

canvas와 ctx라는 다소 생소한 개념을 이해하고 내부 api를 학습 할 수 있었던 프로젝트입니다.
또한, 코드를 작성하는 과정에서 switch 문과 if문의 차이점 등과 같은부분을 생각해보며 어떤 것이 지금 상황에 조금 더 적절한지 차이점을 정확히 알고있는지 등에 대해서 생각해보며 조금 더 발전하는 시간을
가질 수 있게 되었습니다. 
