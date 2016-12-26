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

function Cards () {
  this.type = 'normal'
  this.render
}

function ShuffleCards () {
  this.type = 'Shuffle'
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

ShuffleCards.prototype.render = function () {
  shuffle()
}

SeeTheFutureCards.prototype.render = function () {
  console.log('SeeTheFuture Started')
  var topThreeCards = game.remainingCards.slice(0, 3)
  alert(JSON.stringify(topThreeCards))
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
  game.explosionStatus === false
  hideExplosive()
  if (game.remainingCards[0].type === 'kitten') {
    shuffle()
  }
  game.currentPlayer = 3 - game.currentPlayer
}

AttackCards.prototype.render = function () {
  console.log('Attack Cards Started')
  if (game.currentPlayer === 1) {
    game.currentPlayer === 2
  } else {
    game.currentPlayer === 1
  }
  game.noOfTurn += 2
  console.log(game.currentPlayer)
}

var countDown
ExplodingKittenCards.prototype.render = function () {
  console.log('Exploding')
  game.explosionStatus === true
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

  console.log(game)
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
  console.log(game.remainingCards)
}

function playTurn (choice) {
  if (game.isGameOver === false) {
    // console.log('Player', game.currentPlayer, 'playTurn')
    // console.log('choice', choice)
    // console.log(game['player' + game.currentPlayer + 'Cards'][choice])
    game.playedCards.push(game['player' + game.currentPlayer + 'Cards'][choice])
    game['player' + game.currentPlayer + 'Cards'].splice(choice, 1)
    game['playedCards'][game.playedCards.length - 1].render()
  //  console.log(game['player' + game.currentPlayer + 'Cards'])
    // console.log(game.playedCards)
    // console.log('renderSuccessful')
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
}

function isGameOver () {
  if (game.isGameOver === true) {
    alert('Game Over')
  }
}

$(document).ready(function () {
  startGame()
  updateNotice()
  updateCards()

  $('.player1Cards').off('click', 'button')
  $('.player1Cards').on('click', 'button', function () {
    var index = $('.player1Cards button').index(this)
    // alert('index ' + index)
    if (game.currentPlayer === 1 && game.isGameOver === false) {
      playTurn((index))
    } else {
      alert('It is not your turn!')
    }
    updateDisplay()
    updateNotice()
  })
/*
  $('.player2').off('click', 'button')
  $('.player2').on('click', 'button', function () {
    var index = $('.player2 button').index(this)
    console.log(index)
    if (game.currentPlayer === 2 && game.isGameOver === false) {
      playTurn((index))
    } else {
      alert('It is not your turn!')
    }
    updateDisplay()
    updateNotice()
  })
*/

  $('.player1Cards button').hover(function () {
    var index = $('.player1Cards button').index(this) + 1
    $('.player1Cards button:nth-child(' + index + ')').css({
      'height': '200px'
    })
  },
  function () {
    var index = $('.player1Cards button').index(this) + 1
    $('.player1Cards button:nth-child(' + index + ')').css({
      'height': '150px'
    })
  }
  )

  $('.remaining-cards').click(function () {
    drawCard(0)
    updateDisplay()
    updateNotice()
  })
})

function updateDisplay () {
  isGameOver()
  if (game.playedCards.length > 0) {
    $('.played-cards').text(game.playedCards[game.playedCards.length - 1].type)
  }

  $('.player1 button').remove()
  $('.player2 button').remove()
  updateCards()

  $('.explosive-meter h1').text(Math.round(1 / game.remainingCards.length * 100) + ' %')
}

function showExplosive () {
  $('.explosive').text('Explosive Kitten')
  .fadeIn()
}

function hideExplosive () {
  $('.explosive').hide()
  updateDisplay()
}

function updateNotice () {
  $('.notice h1').text('Player ' + game.currentPlayer + '\'s Turn')
  if (game.noOfTurn !== 0) {
    $('.notice h2').text('Player have ' + game.noOfTurn + ' to draw.')
  } else {
    $('.notice h2').text('')
  }
}

function updateCards () {
  $('.player1Cards').css({
    'width': (50 * (game.player1Cards.length - 2) + 200) + 'px'
  })
  var left = 0
  for (var i = 0; i < game.player1Cards.length; i++) {
    $('.player1Cards').append('<button>' + game.player1Cards[i].type + '</button>')
    $('.player1Cards button:nth-child(' + (i + 1) + ')').css({
      'left': left + 'px'
    })
    left += 50
  }
  for (var i = 0; i < game.player2Cards.length; i++) {
    $('.player2').append('<button>' + game.player2Cards[i].type + '</button>')
  }
}

var checkPlayer
checkPlayer = setInterval(function () {
  if (game.currentPlayer === 2) {
    computerPlayer()
  }
}, 5000)

function computerPlayer () {
  alert('Computer')
//  var index = Math.floor(Math.random() * (game.player2Cards.length - 1))
  // playTurn(index)
  // drawCard(0)
  var future = []
  // use defuse if explosive kitten is drawn
  if (game.remainingCards[0].type === 'kitten') {
    for (var i = 0; i < game.player2Cards.length; i++) {
      if (game.player2Cards[i].type === 'defuse') {
        playTurn(i)
        break
      } else {
        //clearInterval(checkPlayer)
      }
    }
  } else if ((1 / game.remainingCards.length * 100) > 50) {
    if (future.length === 0) {
      for (var i = 0; i < game.player2Cards.length; i++) {
        if (game.player2Cards[i].type === 'see-the-future') {
          playTurn(i)
          future = game.remainingCards.slice[0, 3]
          break
        }
      }
    } else if (future[0].type === 'kitten') {
      for (var i = 0; i < game.player2Cards.length; i++) {
        if (game.player2Cards[i].type === 'skip') {
          playTurn(i)
          break
        }
      }
    }
  } else {
    drawCard(0)
  }
/*   && future.length === 0) {
    for (var i = 0; i < game.player2Cards.length; i++) {
      if (game.player2Cards[i].type === 'see-the-future') {
        playTurn(i)
        future = game.remainingCards.slice[0, 3]
        break
      }
    }
  } */

  updateDisplay()
  updateNotice()
}
// console.log(cards[0]);
