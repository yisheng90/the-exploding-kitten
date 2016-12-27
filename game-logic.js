// Game Methods
function startGame () {
  for (var i = 0; i < 4; i++) {
    game.remainingCards.push(new ShuffleCards())
    game.remainingCards.push(new SkipCards())
    game.remainingCards.push(new SeeTheFutureCards())
    game.remainingCards.push(new AttackCards())
    game.remainingCards.push(new DrawFromBottomCards())

    if (i === 3) {
      game.remainingCards.push(new DefuseCards())
    }
  }

  shuffle()
  for (var i = 0; i < 4; i++) {
    game.player1Cards.push(game.remainingCards[i])
    game.remainingCards.shift()
  }

  for (var i = 0; i < 4; i++) {
    game.player2Cards.push(game.remainingCards[i])
    game.remainingCards.shift()
  }

  game.player1Cards.push(new DefuseCards())
  game.player2Cards.push(new DefuseCards())
  game.remainingCards.push(new ExplodingKittenCards())
  shuffle()
}

function shuffle () {
  var i = game.remainingCards.length - 1
  while (i > 0) {
    num = Math.floor(Math.random() * game.remainingCards.length)
    var temp = game.remainingCards[i]
    game.remainingCards[i] = game.remainingCards[num]
    game.remainingCards[num] = temp
    i--
  }
}

function playTurn (choice) {
  if (game.isGameOver === false) {
    if (game.explosionStatus === true) {
      if (game['player' + game.currentPlayer + 'Cards'][choice].type !== 'defuse') {
        alert('cannot play this card')
        return
      }
    }
      game.playedCards.push(game['player' + game.currentPlayer + 'Cards'][choice])
      game['player' + game.currentPlayer + 'Cards'].splice(choice, 1)
      game['playedCards'][game.playedCards.length - 1].render()
  }

  if (game.currentPlayer === 1) {
    player1Moves.unshift(game['player' + game.currentPlayer + 'Cards'][choice].type)
  }
}

function drawCard (num) {
  console.log('Player', game.currentPlayer, 'drawCard')
  if (game.remainingCards[num].type === 'kitten') {
    game.remainingCards[num].render()
  } else {
    game['player' + game.currentPlayer + 'Cards'].push(game.remainingCards[num])
    game.remainingCards.splice(num, 1)
    if (game.noOfTurn < 1) {
      game.currentPlayer = 3 - game.currentPlayer
    } else {
      game.noOfTurn -= 1
    }
  }

  if (future.length > 0) {
    future.shift()
  }

  if (game.currentPlayer === 1) {
    player1Moves.unshift('draw')
  } else {
    player1Moves = []
  }
}

function isGameOver () {
  if (game.isGameOver === true) {
    alert('Game Over')
  }
}
