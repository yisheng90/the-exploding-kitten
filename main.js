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
    // game.isGameOver = false
    restart()
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
      $('.player2Explosive').fadeIn()
      .fadeOut().delay(100)
    }, 200)
  }
}

function hideExplosive () {
  clearInterval(flashKitten)
  $('.player2Explosive').css('display', 'none')
  if (game.currentPlayer === 1) {
    $('.explosive').hide()
    updateDisplay()
  }
}

function updateNotice () {
  $('.notice h1').text('Player ' + game.currentPlayer + '\'s Turn')
  if (game.noOfTurn !== 0) {
    $('.notice h2').text('Player have ' + game.noOfTurn + ' to draw.')
  } else {
    $('.notice h2').text('')
  }

  $('.explosive-meter h1').text(Math.round(1 / game.drawingPile.length * 100) + ' %')
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
