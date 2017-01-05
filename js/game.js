// Game

function Game () {
  this.drawingPile = []
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []
}

Game.prototype.startGame = function () {
  this.player.push(new Player(), new Player())

  for (var i = 0; i < 4; i++) {
    this.drawingPile.push(new ShuffleCard())
    this.drawingPile.push(new SkipCard())
    this.drawingPile.push(new SeeTheFutureCard())
    this.drawingPile.push(new AttackCard())
    this.drawingPile.push(new DrawFromBottomCard())
   this.drawingPile.push(new FavorCard())

    if (i === 3) {
      this.drawingPile.push(new DefuseCard())
    }
  }

  game.shuffle()
  for (var i = 0; i < this.player.length; i++) {
    for (var j = 0; j < 4; j++) {
      this.player[i].cards.push(this.drawingPile[j])
     this.drawingPile.shift()
    }
    this.player[i].cards.push(new DefuseCard())
  }

  this.drawingPile.push(new ExplodingKittenCard())
  game.shuffle()
  console.log(this)
  player1Timer()
}

Game.prototype.shuffle = function () {
  var i = this.drawingPile.length - 1
  while (i > 0) {
    num = Math.floor(Math.random() * this.drawingPile.length)
    var temp = this.drawingPile[i]
    this.drawingPile[i] = this.drawingPile[num]
    this.drawingPile[num] = temp
    i--
  }
}

Game.prototype.checkGameOver = function () {
  if (this.player[game.currentPlayer].cards.length === 0 ) {
    this.isGameOver = true
  }
  return this.isGameOver
}

Game.prototype.whoWon = function () {
  console.log('start');
  return 1 - this.currentPlayer

}

Game.prototype.switchPlayer = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 0
    showYourTurn()
  } else {
    this.currentPlayer = 1
  }
}

Game.prototype.restart = function () {
  this.drawingPile = []
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []
  console.log('before', game)
  this.startGame()
  updateNotice()
  updateDisplay()
  console.log(game)

}

Game.prototype.checkTurns = function () {
  if (this.noOfTurn === 0) {
    this.switchPlayer()
  } else {
    this.noOfTurn -= 1
  }
}

Game.prototype.insertKitten = function (indec) {
  var temp = this.drawingPile[0]

  if (index >= 0 && index <= 2) {
    this.drawingPile.shift()
    this.drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    this.drawingPile.shift()
    this.drawingPile.push(temp)
  } else if (index === 4) {
    this.shuffle()
  }
  this.checkTurns()
}

Game.prototype.insertKitten = function (index) {
  var temp = this.drawingPile[0]

  if (index >= 0 && index <= 2) {
    this.drawingPile.shift()
    this.drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    this.drawingPile.shift()
    this.drawingPile.push(temp)
  } else if (index === 4) {
    this.shuffle()
  }
  this.checkTurns()
}
