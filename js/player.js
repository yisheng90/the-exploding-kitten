function Player () {
  this.cards = []
  this.moves = []
}

Player.prototype.playTurn = function (choice) {
  if (game.isGameOver === false) {
    if (game.explosionStatus === true) {
      if (this.cards[choice].type !== 'defuse') {
        return
      }
    }

    game.playedCards.unshift(this.cards[choice])
    this.moves.unshift(this.cards[choice].type)
    var temp = {}
    temp[game.currentPlayer] = this.cards[choice].type
    game.moves.unshift(temp)
    this.cards.splice(choice, 1)
    game.playedCards[0].render()
  }

  console.log('player', game.player[0])
  console.log('game', game)
  updateDisplay()
  updateNotice()
}

Player.prototype.drawCard = function (num) {
  console.log('Player', game.currentPlayer, 'drawCard')

  if (game.drawingPile[num].type === 'kitten') {
    game.drawingPile[num].render()
    game.checkGameOver()
  } else {
    this.cards.push(game.drawingPile[num])
    game.drawingPile.splice(num, 1)

    if (num === 0) {
      this.moves.unshift('draw')
      var temp = {}
      temp[game.currentPlayer] = 'draw'
      game.moves.unshift(temp)
    }
    game.checkTurns()
  }

  if (game.knownCards.length > 0 && num === 0) {
    game.knownCards.shift()
  }

  updateDisplay()
  updateNotice()
}
