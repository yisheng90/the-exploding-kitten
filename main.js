$(document).ready(function () {
  startGame()
  updateNotice()
  updateCards()

  // Player 1 Cards click
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



  // DrawingPile click
  $('.drawingPile').click(function () {
    if (game.currentPlayer === 1) {
      drawCard(0)
      updateDisplay()
      updateNotice()
    }
  })

  // Restart
  $('#restart').click(function () {
    $('.gameOver').hide()
    $('.explosive').hide()
    $('.played-cards').removeAttr('id')
    $('#avatar1').removeAttr('style')
    $('#avatar2').removeAttr('style')
    clearInterval(flashKitten)
    restart()
    checkPlayer = setInterval(function () {
      if (game.currentPlayer === 2) {
        computerPlayer()
      }
    }, 5000)
  })
})

// Update Game Interface
function updateDisplay () {
  if (game.isGameOver === true) {
    $('.gameOver').fadeIn()

    if (game.whoWon === 1) {
      $('#avatar1').css({
        'width': '300px',
        'height': '300px'
      })
    } else {
      $('#avatar2').css({
        'width': '300px',
        'height': '300px'
      })
    }
  }

  if (game.playedCards.length > 0) {
    $('.played-cards').removeAttr('id')
    .attr('id', game.playedCards[0].type)
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
      .fadeOut()
    }, 500)
  }
}

function hideExplosive () {
  clearInterval(flashKitten)

  if (game.currentPlayer === 1) {
    $('.explosive').hide()
  } else {
    $('.player2Explosive').fadeOut()
  }
  // updateDisplay()
}

function updateNotice () {
  var player = game.currentPlayer
  var lastMove = game['player' + player + 'Moves'][0]
  var name = ''

  $('.notice h1').text('Player ' + player + '\'s Turn')


  if (game.noOfTurn !== 0) {
    $('.notice h2').text('X' + game.noOfTurn)
  } else {
    $('.notice h2').text('')
  }




  if (player === 1) {
    name = 'You'
  } else {
    name = 'Player 2'
  }

  if (lastMove === 'see-the-future') {
    $('.notice h3').text(name + ' have seen what the future are...')
  } else if (lastMove === 'skip') {
    $('.notice h3').text(name + ' have skipped this round...')
  } else if (lastMove === 'favor') {
    $('.notice h3').text(name + ' got a ' + game['player' + player + 'Cards'][game['player' + player + 'Cards'].length - 1].type + ' card')
  } else if (lastMove === 'attack') {
    $('.notice h3').text(name + ' have started a war..')
  } else if (lastMove === 'shuffle') {
    $('.notice h3').text(name + ' have shuffle the pile...')
  } else if (lastMove === 'draw-from-bottom') {
    $('.notice h3').text(name + ' drawn a card from bottom...')
  } else {
    $('.notice h3').text('')
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
    $('.player2').prepend('<button></button>')
  }

  // Player 1 hover
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
  })
}

function updateTime () {
  $('#time').text(Math.ceil(time))
}

function showTopCards () {
  console.log('showing');
  for (var i =0; i <=3; i++) {
    if (game.drawingPile[i] !== undefined || game.drawingPile[i] !== null ) {
      $('.known-cards div:nth-child('+(i+2)+')').attr('id', game.drawingPile[i].type)
    }
  }

$('.known-cards').fadeIn()
 $('.known-cards').delay(3000).fadeOut()

}


function showYourTurn() {
  if(game.currentPlayer === 1) {
    $('.yourTurn').fadeIn()
    $('.yourTurn').delay(300).fadeOut()
  }
}
