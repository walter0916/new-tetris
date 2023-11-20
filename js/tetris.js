let gameBoard = document.getElementById('game-board')
let scoreBoard = document.getElementById('scoreboard')
let ctx = gameBoard.getContext('2d')
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
let model = new GameModel(ctx)

let score = 0 
setInterval(() => {
  newGameState()
}, GAME_CLOCK)

let newGameState = () => {
  fullRow()
  if (model.fallingPiece === null) {
    const randomNum = Math.round(Math.random() * 6) + 1
    const newPiece = new Tetromino(SHAPES[randomNum], ctx)
    model.fallingPiece = newPiece
    model.moveDown()
  } else {
    model.moveDown()
  }
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
  scoreBoard.innerHTML = "Score:" + String(score)
}