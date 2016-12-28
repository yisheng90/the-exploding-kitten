// Check if it is computer AI's turn every 5 seconds
var checkPlayer
checkPlayer = setInterval(function () {
  if (game.currentPlayer === 2) {
    computerPlayer()
  }
}, 5000)

var aiMoves = []
function computerPlayer () {
  alert('Computer')
  console.log('move', player1Moves)
  var currentCards = {}

  for (var i = 0; i < game.player2Cards.length; i++) {
    currentCards[game.player2Cards[i].type] = 0
  }
  currentCards['draw'] = 50

  // Use defuse when explosion status is true
  if (game.explosionStatus === true) {
    if (Object.keys(currentCards).includes('defuse')) {
      currentCards['defuse'] = 1000
    } else {
      clearInterval(checkPlayer)
    }
  }

  // Evaluate probabilty when explosion status is not true
  if (game.explosionStatus !== true) {
    if (player1Moves[0] === 'skip' || player1Moves[0] === 'attack') {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 150 }
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 }
      if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 100 }
      if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 100 }
      if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 100 }
      currentCards['draw'] -= 50
    }

    if (player1Moves.length > 1) {
      if (player1Moves[1] === 'see-the-future' && (player1Moves[0] === 'skip' || player1Moves[0] === 'attack' || player1Moves[0] === 'draw-from-bottom')) {
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 }
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 50 }
        if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 200 }
        if (Object.keys(currentCards).includes('draw')) { currentCards['draw'] -= 200 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 200 }
      }
    }

    if (player1Moves[0] === 'defuse') {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 }
    //  if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 80 }
    }

    if (player1Moves[0] === 'draw') {
      currentCards['draw'] += 100
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 50 }
    }

    if (player1Moves[0] === 'shuffle') {
      currentCards['draw'] += 1000
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] -= 500 }
    }

    if (game.playedCards.length === 0) {
      currentCards['draw'] += 500
    }

    if (1 / game.remainingCards.length > 0.5 && future.length === 0) {
      currentCards['see-the-future'] += 100
    }

    if (future.length > 0) {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] -= 100 }

      if (future[0].type === 'kitten') {
        if (player1Moves.includes('defuse')) {
          if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 900 }
          if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 900 }
        }
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 100 }
        currentCards['draw'] -= 200
      }
    }
  }

  var max = ['', 0]
  for (var key in currentCards) {
    if (currentCards[key] > max[1]) {
      max[0] = key
      max[1] = currentCards[key]
    }
  }

  if (max[0] === 'draw') {
    drawCard(0)
    aiMoves = []
  } else {
    for (var i = 0; i < game.player2Cards.length; i++) {
      if (game.player2Cards[i].type === max[0]) {
        aiMoves.unshift(game.player2Cards[i].type)
        playTurn(i)
        break
      }
    }
  }

  console.log(currentCards)

  updateDisplay()
  updateNotice()
}
// console.log(cards[0]);
