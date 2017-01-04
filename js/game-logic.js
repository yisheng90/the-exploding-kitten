// Game
var game = {
  player1Cards: [],
  player2Cards: [],
  drawingPile: [],
  playedCards: [],
  currentPlayer: 1,
  noOfPlayers: 1,
  isGameOver: false,
  noOfTurn: 0,
  explosionStatus: false,
  knownCards: [],
  player1Moves: [],
  player2Moves: [],
  moves: []
}

/*
 *Start the game  by generating cards!
 *1. Drawing Pile
 *  - 4 ShuffleCards
 *  - 4 SkipCards
 *  - 4 SeeTheFutureCards
 *  - 4 AttackCards
 *  - 4 DrawFromBottomCards
 *  - 1 DefuseCards
 *  - 1 Kitten
 *
 *2. Player initial cards
 *  - 4 cards from drawing pile (excluding 'kitten')
 *  - 1 DefuseCards
 */

function startGame () {
  for (var i = 0; i < 4; i++) {
    game.drawingPile.push(new ShuffleCards())
    game.drawingPile.push(new SkipCards())
    game.drawingPile.push(new SeeTheFutureCards())
    game.drawingPile.push(new AttackCards())
    game.drawingPile.push(new DrawFromBottomCards())
    game.drawingPile.push(new FavorCards())

    if (i === 3) {
      game.drawingPile.push(new DefuseCards())
    }
  }

  shuffle()
  for (var i = 0; i < 4; i++) {
    game.player1Cards.push(game.drawingPile[i])
    game.drawingPile.shift()
  }

  for (var i = 0; i < 4; i++) {
    game.player2Cards.push(game.drawingPile[i])
    game.drawingPile.shift()
  }

  game.player1Cards.push(new DefuseCards())
  game.player2Cards.push(new DefuseCards())
  game.drawingPile.push(new ExplodingKittenCards())
  shuffle()
}

/* Shuffle
 * Function: Randomly reshuffle the drawing pile.
 */

function shuffle () {
  var i = game.drawingPile.length - 1
  while (i > 0) {
    num = Math.floor(Math.random() * game.drawingPile.length)
    var temp = game.drawingPile[i]
    game.drawingPile[i] = game.drawingPile[num]
    game.drawingPile[num] = temp
    i--
  }
}

/* playTurn
 * Function: 1. Take player input to play the card.
 *           2. When exploding kitten card is drawn, only defuse can be played.
 *           3. When player play a cards, move the card from player's pile to played cards pile.
 */

function playTurn (choice) {
  if (game.isGameOver === false) {
    if (game.explosionStatus === true) {
      if (game['player' + game.currentPlayer + 'Cards'][choice].type !== 'defuse') {
        return
      }
    }

    game.playedCards.unshift(game['player' + game.currentPlayer + 'Cards'][choice])
    game['player' + game.currentPlayer + 'Moves'].unshift(game['player' + game.currentPlayer + 'Cards'][choice].type)
    var temp = {}
    temp[game.currentPlayer] = game['player' + game.currentPlayer + 'Cards'][choice].type
    game.moves.unshift(temp)
    game['player' + game.currentPlayer + 'Cards'].splice(choice, 1)
    game['playedCards'][0].render()
  }

  updateDisplay()
  updateNotice()
  console.log('playr1', game.player1Moves)
  console.log('playr2', game.player2Moves)
  console.log('moves', game.moves)
}

/* drawCard
 * Function: 1. Draw the card with user input (default index = 0).
 *           2. Move drawn cards to player's pile.
 */
function drawCard (num) {
  console.log('Player', game.currentPlayer, 'drawCard')

  if (game.drawingPile[num].type === 'kitten') {
    game.drawingPile[num].render()
  } else {
    game['player' + game.currentPlayer + 'Cards'].push(game.drawingPile[num])
    game.drawingPile.splice(num, 1)

    if (num === 0) {
      game['player' + game.currentPlayer + 'Moves'].unshift('draw')
      var temp = {}
      temp[game.currentPlayer] = 'draw'
      game.moves.unshift(temp)
    }
    checkTurns()
  }

  if (game.knownCards.length > 0 && num === 0) {
    game.knownCards.shift()
  }

  isGameOver()
  updateDisplay()
  updateNotice()
  console.log('playr1', game.player1Moves)
  console.log('playr2', game.player2Moves)
  console.log('moves', game.moves)
}

/* isGameOver
 * Function : 1. Check if current player's pile is empty and explosive status is true
 *
 */

function isGameOver () {
  if (game.player1Cards.length === 0 || game.player2Cards.length === 0) {
    game.isGameOver = true
  }
  whoWon()
}

function whoWon () {
  if (game.currentPlayer === 1) {
    return 2
  } else if (game.currentPlayer === 2) {
    return 1
  } else {
    return 0
  }
}

function switchPlayer () {
  if (game.currentPlayer === 1) {
    game.currentPlayer = 2
  } else {
    game.currentPlayer = 1
    showYourTurn()
  }
}

function restart () {
  game.player1Cards = []
  game.player2Cards = []
  game.drawingPile = []
  game.playedCards = []
  game.currentPlayer = 1
  game.noOfPlayers = 2
  game.isGameOver = false
  game.whoWon = 0
  game.noOfTurn = 0
  game.explosionStatus = false
  game.player1Moves = []
  game.knownCards = []
  time = 10
  game.player2Moves = []
  game.moves = []
  startGame()
  updateNotice()
  updateDisplay()
}

function checkTurns () {
  if (game.noOfTurn === 0) {
    switchPlayer()
  } else {
    game.noOfTurn -= 1
  }
  return true
}

function insertKitten (index) {
  var temp = game.drawingPile[0]

  if (index >= 0 && index <= 2) {
    game.drawingPile.shift()
    game.drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    game.drawingPile.shift()
    game.drawingPile.push(temp)
  } else if (index === 4) {
    shuffle()
  }
  checkTurns()
}
