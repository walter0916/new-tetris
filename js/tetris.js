let gameBoard = document.getElementById('game-board')
let scoreBoard = document.getElementById('scoreboard')
let startButton = document.getElementById('startbtn')
let endButton = document.getElementById('endbtn')
let ctx = gameBoard.getContext('2d')
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
let model = new GameModel(ctx)
let gameInterval 

let score = 0 
startButton.addEventListener('click', () => {
  clearInterval(gameInterval)
  newGameState()
})

endButton.addEventListener('click', () => {
  clearInterval(gameInterval)
  resetGame()
})

let newGameState = () => {
  gameInterval = setInterval(() => {
    fullRow()
    if (model.fallingPiece === null) {
      const randomNum = Math.round(Math.random() * 6) + 1
      const newPiece = new Tetromino(SHAPES[randomNum], ctx)
      model.fallingPiece = newPiece
      model.moveDown()
    } else {
      model.moveDown()
    }
  }, GAME_CLOCK)
}

const resetGame = () => {
  model = new GameModel(ctx)
  score = 0 
  scoreBoard.innerHTML = "Score: 0"
}

const fullRow = () => {
  const allFilled = (row) => {
    for (let x of row) {
      if (x === 0) {
        return false
      }
    }
    return true 
  }
  for (let i = 0; i < model.grid.length; i++) {
    if (allFilled(model.grid[i])) {
      score += SCORE_WORTH 
      model.grid.splice(i, 1)
      model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
    }
  }
  scoreBoard.innerHTML = "Score: " + String(score)
}

document.addEventListener("keydown", (e) => {
  e.preventDefault()
  switch (e.key) {
    case "w":
      model.rotate()
      break
    case "d":
      model.move(true)
      break
    case "s":
      model.moveDown()
      break 
    case "a":
      model.move(false)
      break
    case "ArrowUp":
      model.rotate()
      break
    case "ArrowRight":
      model.move(true)
      break
    case "ArrowDown":
      model.moveDown()
      break 
    case "ArrowLeft":
      model.move(false)
      break
  }
})