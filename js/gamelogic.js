let gameMessage = document.getElementById('message')
let gameover = false 
class GameModel {
  constructor(ctx) {
    this.ctx = ctx
    this.fallingPiece = null 
    this.grid = this.makeStartingGrid()
  }
  makeStartingGrid() {
    let grid = []
    for (let i = 0; i < ROWS; i++) {
      grid.push([])
      for (let j = 0; j < COLS; j++){
        grid[grid.length - 1].push(0)
      }
    }
    return grid
  }
  collisions(x, y) {
    const shape = this.fallingPiece.shape 
    const n = shape.length
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (shape[i][j] > 0) {
          let p = x + j 
          let q = y + i
          if (p >= 0 && p < COLS && q < ROWS) {
            if (this.grid[q][p] > 0) {
              return true
            }
          } else {
            return true
          }
        }
      }
    }
    return false 
  }
  renderGameState() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let cell = this.grid[i][j]
        this.ctx.fillStyle = COLORS[cell]
        this.ctx.fillRect(j, i, 1, 1)
      }
    }
    if (this.fallingPiece !== null){
      for (let i = 0; i < this.fallingPiece.shape.length; i++) {
        for (let j = 0; j < this.fallingPiece.shape[i].length; j++) {
          if (this.fallingPiece.shape[i][j] > 0) {
            const colorIndex = this.fallingPiece.shape[i][j]
            gameBoard.style.borderColor = COLORS[colorIndex]
          }
        }
      }
      this.fallingPiece.renderPiece()
    }
  }
  moveDown() {
    if (this.fallingPiece === null) {
      this.renderGameState()
      return
    } else if (this.collisions(this.fallingPiece.x, this.fallingPiece.y + 1)) {
      const shape = this.fallingPiece.shape 
      const x = this.fallingPiece.x 
      const y = this.fallingPiece.y 
      shape.map((row, i) => {
        row.map((cell, j) => {
          let p = x + j 
          let q = y + i 
          if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
            this.grid[q][p] = shape[i][j]
          }
        })
      })
      if (this.fallingPiece.y === 0) {
        gameMessage.textContent = "Game Over!"
        this.grid = this.makeStartingGrid()
        startButton.style.display = "inline"
        endButton.style.display = "none"
        gameover = true
      }
      this.fallingPiece = null 
    } else {
      this.fallingPiece.y += 1
    }
    this.renderGameState()
  }
  move(right) {
    if (this.fallingPiece === null) {
      return
    }
    let x = this.fallingPiece.x 
    let y = this.fallingPiece.y 
    if (right) {
      if (!this.collisions(x + 1, y)) {
        this.fallingPiece.x += 1 
      } 
    } else {
      if (!this.collisions(x - 1, y)) {
        this.fallingPiece.x -= 1 
      }
    }
    this.renderGameState()
  }
  rotate() {
    if (this.fallingPiece !== null) {
      let shape = [...this.fallingPiece.shape.map((row) => [...row])]
      for (let y = 0; y < shape.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]] 
        }
      }
      shape.forEach((row => row.reverse()))
      if (!this.collisions(this.fallingPiece.x, this.fallingPiece.y, shape)) {
        this.fallingPiece.shape = shape
      }
    }
    this.renderGameState()
  }
  generateNextPiece() {
    if (!this.nextPiece) {
      const randomNum = Math.round(Math.random() * 6) + 1
      this.nextPiece = new Tetromino(SHAPES[randomNum], this.ctx)
    }
    return this.nextPiece
  }
}