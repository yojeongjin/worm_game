# ๐ป Project
* ์ ๋ชฉ : ์ง๋ ์ด ๊ฒ์
* ๊ธฐ๊ฐ : 2022.08.26~2022.09.05
* ๋ชฉ์ 
  * ๋ฐ๋๋ผ ์๋ฐ์คํฌ๋ฆฝํธ๋ก ํ ์ด ํ๋ก์ ํธ๋ฅผ ๋ง๋ค์ด๋ณด๋ฉฐ ์๋ฐ์คํฌ๋ฆฝํธ์ ๊ธฐ์ด ๋ฌธ๋ฒ์ ์ตํ๊ธฐ ์ํจ
  * ์น์์ ๋ํ๊ณผ ๊ฐ์ ๊ทธ๋ํฝ์ ์ธ ๊ฒ์ ํํ ํ  ๋ ์ฌ์ฉํ๋ canvas ํ๊ทธ ํ์ต
* ๋ฐ๋ชจํ์ด์ง
  * https://cheerful-sundae-cb00ce.netlify.app/
  
# ๐  ์ฌ์ฉ๊ธฐ์ 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=HTML5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-1F8ACB?style=plastic&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=JavaScript&logoColor=fff" /> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=plastic&logo=Netlify&logoColor=fff" />


# ๐ ์ง๋ ์ด ๊ฒ์

### 1. ์ง๋ ์ด ๊ทธ๋ฆฌ๊ธฐ ๋ฐ ์์ง์ด๊ธฐ

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

์ํํ๊ธฐ๋ฅผ ์ํ๋ ์ ๋๋ฉ์ด์๋ค์ ํจ์๋ก ๋ง๋ค๊ณ  gameStart ํจ์์์ window.requestAnimationFrame()์ ์ ๋๋ฉ์ด์์ ์ฝ๋ฐฑ์ผ๋ก ์ ๋ฌํ์ฌ ๊ณ์ํด์ ๋ฆฌํ์ธํธ ์์ผ์ฃผ์์ต๋๋ค.

### 2. ์ง๋ ์ด ๋ฐฉํฅ ์ ํ

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

keyPressed ํจ์๋ฅผ ๋ง๋ค์ด ๋๋ ค์ง key์ ๋ฐฉํฅ์ ์ซ์๋ก ๋ณํํ์ฌ keydown ์ด๋ฒคํธ ๋ฐ์ ์ if ๋ฌธ์ ์กฐ๊ฑด์ผ๋ก ์ฌ์ฉํ์ฌ ์ง๋ ์ด์ ๋ฐฉํฅ์ ์ ํ์์ผฐ์ต๋๋ค.
๋ํ ์ข๋ก ์งํ ์ค ์ฐ๋ก ๋ฐฉํฅ์ ์ ํ ํ  ์ ์๊ณ  ์๋ก ์งํ ์ค ์๋๋ก ๋ฐฉํฅ์ ์ ํํ  ์ ์๋ ์ ์ ๊ณ ๋ คํ์ฌ ์กฐ๊ฑด๋ฌธ์ ์ถ๊ฐํ์์ต๋๋ค. 

### 3. ๋จน์ด ํ๋

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

์ง๋ ์ด์ ๋จธ๋ฆฌ ์์น๊ฐ ๋จน์ด์ ์์น์ ์ผ์นํ๊ฒ๋๋ฉด ๊ธฐ์กด์ ๋จน์ด๋ ์ฌ๋ผ์ง๊ณ  ์๋ก์ด ๋จน์ด๋ฅผ ์บ๋ฒ์ค ์์ ๋์ด๊ฒ ํ์์ต๋๋ค.
๋ํ, ๋จธ๋ฆฌ์ ๋จน์ด๊ฐ ๋ง๋ฟ๋ ์๊ฐ์ด ๋๋ฉด ์ง๋ ์ด ๋ชธํต์ ๋ฐฐ์ด์ ํ๋ ๋๋ ค ํ๋ฉด์ ์ง๋ ์ด์ ๋ชธํต์ด ๋์ด๋๋ ๊ฒ์ฒ๋ผ ๋ก์ง์ ๊ตฌํํ์์ต๋๋ค.

---

# ๋ง์น๋ ๊ธ

canvas์ ctx๋ผ๋ ๋ค์ ์์ํ ๊ฐ๋์ ์ดํดํ๊ณ  ๋ด๋ถ api๋ฅผ ํ์ต ํ  ์ ์์๋ ํ๋ก์ ํธ์๋๋ค.
๋ํ, ์ฝ๋๋ฅผ ์์ฑํ๋ ๊ณผ์ ์์ switch ๋ฌธ๊ณผ if๋ฌธ์ ์ฐจ์ด์  ๋ฑ๊ณผ ๊ฐ์๋ถ๋ถ์ ์๊ฐํด๋ณด๋ฉฐ ์ด๋ค ๊ฒ์ด ์ง๊ธ ์ํฉ์ ์กฐ๊ธ ๋ ์ ์ ํ์ง ์ฐจ์ด์ ์ ์ ํํ ์๊ณ ์๋์ง ๋ฑ์ ๋ํด์ ์๊ฐํด๋ณด๋ฉฐ ์กฐ๊ธ ๋ ๋ฐ์ ํ๋ ์๊ฐ์
๊ฐ์ง ์ ์๊ฒ ๋์์ต๋๋ค. 
