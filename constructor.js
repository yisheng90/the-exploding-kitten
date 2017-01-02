//Cards and Cards' Methods

var cardsProperties = {
  'kitten': 'Unless you have a DEFUSE CARD, you\'re dead.',
  'attack': 'End your turn(s) without drawing and force the next player to take 2 turns in a row. (If the victim of an ATTACK CARD plays an ATTACK CARD, their turns are immediately over, and the next player must take 2 turns.)',
  'skip':'Immediately end your turn without drawing a card. If you play a SKIP CARD as a defense against an ATTACK CARD, it only ends one of the two turns. Two SKIP CARDS would end both turns.',
  'favor': 'Force any other player to give you 1 card from their hand. The cards is randomly assigned.',
  'shuffle': 'Shuffle the Draw Pile without viewing the cards until told to stop. (Useful when you know there\'s an EXPLODING KITTEN coming.)',
  'see-the-future': 'Peek at the top 3 cards from the Draw Pile.',
  'draw-from-bottom': 'Draw a card from the bottom of Draw Pile.',
  'defuse': 'Save yourself from exploding.'
}

function Cards () {
  this.type = 'normal'
  this.render
}

function ShuffleCards () {
  this.type = 'shuffle'
  this.render
}

function ExplodingKittenCards () {
  this.type = 'kitten'
  this.render
}

function DefuseCards () {
  this.type = 'defuse'
  this.render
}

function SkipCards () {
  this.type = 'skip'
  this.render
}

function AttackCards () {
  this.type = 'attack'
  this.render
}

function SeeTheFutureCards () {
  this.type = 'see-the-future'
  this.render
}

function DrawFromBottomCards () {
  this.type = 'draw-from-bottom'
}

function FavorCards () {
  this.type = 'favor'
}

// Cards Methods
ShuffleCards.prototype.render = function () {
  shuffle()
}

SeeTheFutureCards.prototype.render = function () {
  console.log('SeeTheFuture Started')
  var topThreeCards = game.drawingPile.slice(0, 3)

  if (game.currentPlayer === 1) {
    showTopCards()
  } else {
    game.knownCards = topThreeCards
  }
}

SkipCards.prototype.render = function () {
  console.log('Skip Cards Started')
  switchPlayer()
  console.log('Skip Cards Ended, current player is', game.currentPlayer)
}

DefuseCards.prototype.render = function () {
  console.log('Defuse Cards Started')

  clearInterval(countDown)
  game.explosionStatus = false
  hideExplosive()

  if (game.drawingPile[0].type === 'kitten') {
    shuffle()
  }

  if (game.noOfTurn === 0) {
    switchPlayer()
  } else {
    game.noOfTurn -= 1
  }

  console.log('Defuse Cards Ended')
}

AttackCards.prototype.render = function () {
  console.log('Attack Cards Started')
  switchPlayer()
  game.noOfTurn += 2
  console.log('Skip Cards Ended, current player is', game.currentPlayer)
}

var countDown
var time
ExplodingKittenCards.prototype.render = function () {
  console.log('Exploding Started')

  game.explosionStatus = true
  showExplosive()

  time =10
  countDown = setInterval(function () {
    time -= 0.1
    updateTime()
    console.log(time);
    if (time <= 0) {
      clearInterval(countDown)
      game.isGameOver = true
      whoWon()
      clearInterval(flashKitten)
      hideExplosive()
      //alert(game.whoWon)
      updateDisplay()
    }

  }, 100)



  console.log('Explosing Ended');
}

DrawFromBottomCards.prototype.render = function () {
  console.log('Draw From Bottom Started')
  drawCard(game.drawingPile.length - 1)
  console.log('Draw From Bottom  Ended');
}

FavorCards.prototype.render = function () {
  console.log('Favor Cards Started')
  var num = Math.floor((Math.random())* game['player' + (3 - game.currentPlayer) + 'Cards'].length)

  game['player' + (game.currentPlayer) + 'Cards'].push(game['player' + (3 - game.currentPlayer) + 'Cards'][num])
  game['player' + (3 - game.currentPlayer) + 'Cards'].splice(num,1)
  console.log('Ended Started')
}
