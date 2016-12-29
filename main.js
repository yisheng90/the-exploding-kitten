$(document).ready(function () {
  startGame()
  updateNotice()
  updateCards()

  $('.player1Cards').off('click', 'button')
  $('.player1Cards').on('click', 'button', function () {
    var index = $('.player1Cards button').index(this)
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

  $('.drawingPile').click(function () {
    if (game.currentPlayer === 1) {
      drawCard(0)
      updateDisplay()
      updateNotice()
    }
  })

  $('#restart').click(function () {
    $('.gameOver').hide()
    $('.explosive').hide()
    $('.played-cards').removeAttr('id')
    clearInterval(flashKitten)
    restart()
    checkPlayer = setInterval(function () {
      if (game.currentPlayer === 2) {
        computerPlayer()
      }
    }, 5000)
  })
})

function updateDisplay () {
  if (game.isGameOver === true) {
    $('.gameOver').fadeIn()
  }

  if (game.playedCards.length > 0) {
    $('.played-cards').removeAttr('id')
    .attr('id', game.playedCards[game.playedCards.length - 1].type)
  }

  $('.player1 button').remove()
  $('.player2 button').remove()
  updateCards()
}

var flashKitten
function showExplosive () {
  if (game.currentPlayer === 1) {
    $('.explosive').fadeIn()
  } else {
    flashKitten = setInterval(function () {
      $('.player2Explosive').show()
      .hide()
    }, 200)
  }
}

function hideExplosive () {
  clearInterval(flashKitten)
  $('.player2Explosive').hide()
  if (game.currentPlayer === 1) {
    $('.explosive').hide()
  }
  updateDisplay()
}

function updateNotice () {
  $('.notice h1').text('Player ' + game.currentPlayer + '\'s Turn')
  if (game.noOfTurn !== 0) {
    $('.notice h2').text('Player have ' + game.noOfTurn + ' turn to draw.')
  } else {
    $('.notice h2').text('')
  }

//if (game.player1Moves.length > 0) {
var player
  if (game.noOfTurn === 0) {
     player = 3 - game.currentPlayer

  } else {
    player = game.currentPlayer
  }

  var lastMove = game['player'+ player +'Moves'][0]
  var name  =''
    if (player === 1) {
      name = 'You'
    } else {
      name = 'Player 2'
    }

    if ( lastMove === 'see-the-future') {
      $('.notice h3').text(name+' have seen what the future are...')
    } else if (lastMove === 'skip') {
      $('.notice h3').text(name+' have skipped this round...')
    } else if (lastMove === 'favor') {
      $('.notice h3').text(name+' got a ' + game['player'+player+'Cards'][game['player'+player+'Cards'].length - 1].type + ' card from player 2...')
    } else if (lastMove === 'attack') {
      $('.notice h3').text(name+' have started a war..')
    } else if (lastMove === 'shuffle') {
      $('.notice h3').text(name+' have shuffle the pile...')
    } else if (lastMove === 'shuffle') {
      $('.notice h3').text(name+' drawn a card from bottom...')
    } else if (lastMove === 'draw') {
        $('.notice h3').text(name+' have drawn a card...')
    }
    //else {
      //$('.notice h3').text('')
    //}

  //}
/*

  if (game.playedCards.length > 0) {
    if (game.playedCards[game.playedCards.length - 1].type === game.player1Moves[0]) {
      if (game.player1Moves[0] === 'see-the-future') {
        $('.notice h3').text('You have seen what the future are...')
      } else if (game.player1Moves[0] === 'skip') {
        $('.notice h3').text('You have skipped this round...')
      } else if (game.player1Moves[0] === 'favor') {
        $('.notice h3').text('You got a ' + game.player1Cards[game.player1Cards.length - 1].type + ' card from player 2...')
      } else if (game.player1Moves[0] === 'attack') {
        $('.notice h3').text('You have attacked player 2...')
      } else {
        $('.notice h3').text('')
      }
    }
  }

  $('.explosive-meter h1').text(Math.round(1 / game.drawingPile.length * 100) + ' %')
  */
}


function updateCards () {
  $('.player1Cards').css({
    'width': (50 * (game.player1Cards.length - 2) + 200) + 'px'
  })
  var left = 0
  for (var i = 0; i < game.player1Cards.length; i++) {
    $('.player1Cards').append('<button></button>')

    $('.player1Cards button:nth-child(' + (i + 1) + ')').css({
      'left': left + 'px'
    })
    .attr('id', game.player1Cards[i].type)
    left += 50
  }
  for (var i = 0; i < game.player2Cards.length; i++) {
    $('.player2').append('<button></button>')
  }
}

function updateTime () {
  $('#time').text(Math.ceil(time))
}
