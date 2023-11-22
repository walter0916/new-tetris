class Tetromino {
  constructor(shape, ctx) {
    this.shape = shape
    this.ctx = ctx
    this.y = 0 
    this.x = Math.floor((COLS - this.shape[0].length) / 2)
  }
  renderPiece(){
    this.shape.map((row, i) => {
      row.map((cell, j) => {
        if (cell > 0) {
          this.ctx.fillStyle = COLORS[cell]
          this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
        }
      })
    })
  }
  renderPiecePreview(ctx) {
    this.shape.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell > 0) {
          ctx.fillStyle = COLORS[cell]
          ctx.fillRect(j * 20 , i * 20, 20, 20)
        }
      })
    })
  }
}


