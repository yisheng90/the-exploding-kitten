// Check if it is computer AI's turn every 5 seconds
var checkPlayer
checkPlayer = setInterval(function () {
  if (game.currentPlayer === 2) {
    computerPlayer()
  }
}, 5000)


function computerPlayer () {
//  alert('Computer')
  console.log('move', game.player1Moves)
  var currentCards = {}

  for (var i = 0; i < game.player2Cards.length; i++) {
    currentCards[game.player2Cards[i].type] = 0
  }
  currentCards['draw'] = 20

  // Use defuse when explosion status is true
  if (game.explosionStatus === true) {
    if (Object.keys(currentCards).includes('defuse')) {
      currentCards['defuse'] = 1000
    } else {
      //clearInterval(checkPlayer)
      clearInterval(countDown)
      clearInterval(flashKitten)
      game.isGameOver = true
    }
  }

  // Evaluate probabilty when explosion status is not true
  if (game.explosionStatus !== true) {
    if (game.player1Moves[0] === 'skip' || game.player1Moves[0] === 'attack') {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 150 * randomness() }
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 * randomness() }
      if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 100 * randomness() }
      if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 100 * randomness() }
      if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 100 * randomness() }
      currentCards['draw'] += 80 * randomness()
    }

    if (game.player1Moves.length > 1) {
      if (game.player1Moves[1] === 'see-the-future' && (game.player1Moves[0] === 'skip' || game.player1Moves[0] === 'attack' || game.player1Moves[0] === 'draw-from-bottom')) {
        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 200 * randomness() }
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 50 * randomness() }
        if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 200 * randomness() }
        if (Object.keys(currentCards).includes('draw')) { currentCards['draw'] -= 200 }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 200 * randomness() }
      }
    }

    if (game.player1Moves[0] === 'defuse') {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 * randomness() }
      if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 80 * randomness() }
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 * randomness() }
      currentCards['draw'] += 80 * randomness()
    }

    if (game.player1Moves[0] === 'draw') {
      currentCards['draw'] += 50 * randomness()
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 * randomness() }
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 * randomness() }
    }

    if (game.player1Moves[0] === 'shuffle') {
      currentCards['draw'] += 1000
      if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] -= 500 * randomness() }
    }

    if (game.playedCards.length === 0) {
      currentCards['draw'] += 10
    }

    if (1 / game.drawingPile.length > 0.20 && game.knownCards.length === 0) {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 * randomness() }
    }

    if (game.knownCards.length > 0) {
      if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] -= 100 * randomness() }

      if (game.knownCards[0].type === 'kitten') {
        if (game.player1Moves.includes('defuse')) {
          if (Object.keys(currentCards).includes('skip')) { currentCards['skip'] += 200 * randomness() }
          if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 200 * randomness() }
        } else {
          if (Object.keys(currentCards).includes('favor')) { currentCards['favor'] += 200 * randomness() }
        }


        if (Object.keys(currentCards).includes('shuffle')) { currentCards['shuffle'] += 100 * randomness() }
        if (Object.keys(currentCards).includes('draw-from-bottom')) { currentCards['draw-from-bottom'] += 100 * randomness() }
        currentCards['draw'] -= 200
      }

      if (game.player1Cards.length < 4) {
        if (Object.keys(currentCards).includes('favor')) { currentCards['favor'] += 200 * randomness() }
      }

      if(Object.keys(currentCards).includes('defuse') !== true){
        if (Object.keys(currentCards).includes('favor')) { currentCards['favor'] += 300 * randomness() }
      }
    }

    if (1 / game.drawingPile.length === 1) {
      currentCards['draw'] -= 200

    }
  }

  var max = ['', -500]
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

  //updateDisplay()
  //updateNotice()
}
// console.log(cards[0]);

function randomness () {
  var randomValue = Math.random()
  if (randomValue < 0.5) {
    randomValue += 0.5
  }
  return randomValue
}
