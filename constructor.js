// This describe the cards constructor
var game = {
  player1Cards: [],
  player2Cards: [],
  remainingCards: [],
  playedCards: [],
  currentPlayer: 1,
  noOfPlayers: 2,
  isGameOver: false,
  whoWon: 0,
  noOfTurn: 0,
  explosionStatus: false
}

var future = []
var player1Moves = []

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

// Cards Methods
ShuffleCards.prototype.render = function () {
  shuffle()
}

SeeTheFutureCards.prototype.render = function () {
  console.log('SeeTheFuture Started')
  var topThreeCards = game.remainingCards.slice(0, 3)

  if (game.currentPlayer === 1) {
    alert(JSON.stringify(topThreeCards))
  } else {
    future = topThreeCards
  }
}

SkipCards.prototype.render = function () {
  console.log('Skip Cards Started')
  if (game.currentPlayer < game.noOfPlayers) {
    game.currentPlayer += 1
  } else {
    game.currentPlayer = 1
  }

  if (game.noOfTurn !== 0) {
    game.noOfTurn += 1
  }
  console.log(game.currentPlayer)
}
/* var card1 = new ShuffleCards()
var future = new SeeTheFutureCards()
var skip = new SkipCards()
card1.render()
future.render()
skip.render()
skip.render() */

DefuseCards.prototype.render = function () {
  clearInterval(countDown)
  game.explosionStatus = false
  hideExplosive()
  if (game.remainingCards[0].type === 'kitten') {
    shuffle()
  }

  if (game.noOfTurn === 0) {
    game.currentPlayer = 3 - game.currentPlayer
  } else {
    game.noOfTurn -= 1
  }
}

AttackCards.prototype.render = function () {
  console.log('Attack Cards Started')
  if (game.currentPlayer === 1) {
    game.currentPlayer = 2
  } else {
    game.currentPlayer = 1
  }
  game.noOfTurn += 2
  console.log(game.currentPlayer)
}

var countDown
ExplodingKittenCards.prototype.render = function () {
  console.log('Exploding')
  game.explosionStatus = true
  showExplosive()
  var time = 10
  countDown = setInterval(function () {
    time -= 0.1
    console.log(time)
    if (time <= 0) {
      clearInterval(countDown)
      game.isGameOver = true
      game.whoWon = 3 - game.currentPlayer
    }
  }, 100)
}

DrawFromBottomCards.prototype.render = function () {
  drawCard(game.remainingCards.length - 1)
}
