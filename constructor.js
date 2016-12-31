//Cards and Cards' Methods

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
    game.currentPlayer = 3 - game.currentPlayer
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
      game.whoWon = 3 - game.currentPlayer
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
