// Cards and Cards' Methods

// Cards properties
var cardsProperties = {
  'kitten': 'Unless you have a DEFUSE CARD, you\'re dead.',
  'attack': 'End your turn(s) without drawing and force the next player to take 2 turns in a row. (If the victim of an ATTACK CARD plays an ATTACK CARD, their turns are immediately over, and the next player must take 2 turns.)',
  'skip': 'Immediately end your turn without drawing a card. If you play a SKIP CARD as a defense against an ATTACK CARD, it only ends one of the two turns. Two SKIP CARDS would end both turns.',
  'favor': 'Force any other player to give you 1 card from their hand. The cards is randomly assigned.',
  'shuffle': 'Shuffle the Draw Pile without viewing the cards until told to stop. (Useful when you know there\'s an EXPLODING KITTEN coming.)',
  'see-the-future': 'Peek at the top 3 cards from the Draw Pile.',
  'draw-from-bottom': 'Draw a card from the bottom of Draw Pile.',
  'defuse': 'Save yourself from exploding.'
}

function ShuffleCard () {
  this.type = 'shuffle'
}

function ExplodingKittenCard () {
  this.type = 'kitten'
}

function DefuseCard () {
  this.type = 'defuse'
}

function SkipCard () {
  this.type = 'skip'
}

function AttackCard () {
  this.type = 'attack'
}

function SeeTheFutureCard () {
  this.type = 'see-the-future'
}

function DrawFromBottomCard () {
  this.type = 'draw-from-bottom'
}

function FavorCard () {
  this.type = 'favor'
}

// Cards Methods
ShuffleCard.prototype.render = function () {
  game.shuffle()
}

SeeTheFutureCard.prototype.render = function () {
  console.log('SeeTheFuture Started')

  if (game.currentPlayer === 0) {
    showTopCards()
  } else {
    game.knownCards = game.drawingPile.slice(0, 3)
  }
}

SkipCard.prototype.render = function () {
  console.log('Skip Cards Started')
  game.checkTurns()
  console.log('Skip Cards Ended, current player is', game.currentPlayer)
}

DefuseCard.prototype.render = function () {
  console.log('Defuse Cards Started')

  clearInterval(countDown)
  game.explosionStatus = false
  hideExplosive()

  if (game.drawingPile[0].type === 'kitten') {
    if (game.currentPlayer === 0) {
      showSelect()
    } else {
      game.shuffle()
      game.checkTurns()
    }
  }
  console.log('Defuse Cards Ended')
}

AttackCard.prototype.render = function () {
  console.log('Attack Cards Started')
  game.switchPlayer()
  if (game.noOfTurn === 0) {
    game.noOfTurn += 1
  } else {
    game.noOfTurn += 2
  }
  console.log('Attack Cards Ended, current player is', game.currentPlayer)
}

var countDown
var time
ExplodingKittenCard.prototype.render = function () {
  console.log('Exploding Started')

  game.explosionStatus = true
  playAudio(0)
  showExplosive()

  time = 10
  clearInterval(countDown)
  countDown = setInterval(function () {
    time -= 0.1
    updateTime()
    console.log(time);
    if (time < 0) {
      game.isGameOver = true
      playAudio(1)
      game.whoWon()
      clearInterval(flashKitten)
      hideExplosive()
       clearInterval(countDown)
      updateDisplay()
    }
  }, 100)

  console.log('Explosing Ended')
}

DrawFromBottomCard.prototype.render = function () {
  console.log('draw', this)
  console.log('Draw From Bottom Started')
  game.player[game.currentPlayer].drawCard(game.drawingPile.length - 1)
  console.log('Draw From Bottom  Ended')
}

FavorCard.prototype.render = function () {
  console.log('Favor Cards Started')
  var num = Math.floor((Math.random()) * game.player[1 - game.currentPlayer].cards.length)

  game.player[game.currentPlayer].cards.push(game.player[1 - game.currentPlayer].cards[num])
  game.player[1 - game.currentPlayer].cards.splice(num, 1)
  console.log('Ended Started')
}
