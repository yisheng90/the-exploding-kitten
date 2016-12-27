// Check if it is computer AI's turn every 5 seconds
var checkPlayer
checkPlayer = setInterval(function () {
  if (game.currentPlayer === 2) {
    computerPlayer()
  }
}, 5000)

function computerPlayer () {
  alert('Computer')
  var currentCards = {}

  for (var i = 0; i < game.player2Cards.length; i++) {
    currentCards[game.player2Cards[i].type] = 0
  }
  currentCards['draw'] = 0

  // Use defuse when explosion status is true
  if (game.explosionStatus === true) {
    if (Object.keys(currentCards).includes('defuse')) {
      currentCards['defuse'] = 100
    } else {
      clearInterval(checkPlayer)
    }
  }

  // Evaluate probabilty when explosion status is not true
  if (game.explosionStatus !== true) {
    if (game.playedCards.length > 1) {
      if (game.playedCards[game.playedCards.length - 2].type === 'see-the-future') {
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 90 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 80 }
        if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 60 }
        if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 50 }
      }
    }

    if (game.playedCards.length > 0) {
      if (game.playedCards[game.playedCards.length - 1].type === 'skip' || game.playedCards[game.playedCards.length - 1].type === 'attack') {
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 90 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 80 }
        if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 60 }
        if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 50 }
      }

      if (game.playedCards[game.playedCards.length - 1].type === 'see-the-future') {
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 90 }
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 50 }
        if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 20 }
        if (Object.keys(currentCards).includes('draw')) { currentCards['draw'] += 80 }
      }

      if (game.playedCards[game.playedCards.length - 1].type === 'defuse') {
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 80 }
      }
    }

    if (game.playedCards.length === 0) {
      currentCards['draw'] += 100
    }

    if (1 / game.remainingCards.length > 0.5) {
      currentCards['see-the-future'] += 70
    }

    if (future.length > 0) {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] -= 200 }

      if (future[0].type === 'kitten') {
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 80 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 80 }
        if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 100 }
        if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 900 }
        currentPlayer['draw'] -= 200
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
  } else {
    for (var i = 0; i < game.player2Cards.length; i++) {
      if (game.player2Cards[i].type === max[0]) {
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
