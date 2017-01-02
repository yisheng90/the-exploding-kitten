$(document).ready(function () {
  startGame()
  updateNotice()
  updateCards()

  // Player 1 Cards click
  $('.player1Cards').off('click', 'div')
  $('.player1Cards').on('click', 'div', function () {
    var index = $('.player1Cards div').index(this)
    if (game.currentPlayer === 1 && game.isGameOver === false) {
      playTurn((index))
    } else {
      alert('It is not your turn!')
    }
    // updateDisplay()
    // updateNotice()
  })

  // DrawingPile click
  $('.container').off('click', '.drawingPile')
  $('.container').on('click', '.drawingPile', function () {
    if (game.currentPlayer === 1) {
      drawCard(0)
    //  updateDisplay()
    //  updateNotice()
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
    clearInterval(countDown)
    restart()
  /*  checkPlayer = setInterval(function () {
      if (game.currentPlayer === 2) {
        computerPlayer()
      }
    }, 5000) */
  })
})

// Update Game Interface
function updateDisplay () {
  if (game.isGameOver === true) {
    $('.gameOver').fadeIn()

    if (whoWon() === 1) {
      $('#avatar1').css({
        'width': '300px',
        'height': '300px'
      })
    } else if (whoWon() === 2) {
      $('#avatar2').css({
        'width': '300px',
        'height': '300px'
      })
    }
  }

  if (game.playedCards.length > 0) {
    $('.played-cards').removeAttr('id')
    $('.played-cards').attr('id', game.playedCards[0].type)
  }

  $('.drawingPile').remove()
  $('.player1Cards div').remove()
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
}

function updateNotice () {
  var player = game.currentPlayer
  var lastMove = game['player' + player + 'Moves'][0]
  var name = ''

  $('.notice h1').remove()
  $('.notice h2').remove()


  if (game.moves.length > 0) {
    if (Object.values(game.moves[0])[0] === 'draw') {
      $('.notice h3').text(' draw a card ')
        .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
    } else if (Object.values(game.moves[0])[0] === 'favor'){
      $('.notice h3').text(' got ')
        .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
        .append('<div  class="small-card" id="' + game['player' + Object.keys(game.moves[0])[0]  + 'Cards'][game['player' + Object.keys(game.moves[0])[0]  + 'Cards'].length - 1].type + '"></div> from')
        .append('<div class="avatar' + (3 - Object.keys(game.moves[0])[0] ) + '"></div>')
    } else {
      $('.notice h3').text(' played ')
      .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
      .append('<div  class="small-card" id="' + Object.values(game.moves[0])[0] + '"></div>')
    }

  }


  var timeout = setTimeout(function () {
    $('.notice h1').remove()
    $('.notice h2').remove()
    $('.notice h3').text('')
    $('.notice h3 div').remove()
    $('.notice').append('<h1>')
    $('.notice h1').text('\'s Turn')
      .prepend('<div class="avatar' + player + '"></div>')
    if (game.noOfTurn !== 0) {
      $('.notice').append('<h2> x' + game.noOfTurn + ' draw</h2>')
    }
  }, 3000)


  $('.explosive-meter h1').text(Math.round(1 / game.drawingPile.length * 100) + ' %')
}

function updateCards () {
  $('.player1Cards').css({
    'width': (50 * (game.player1Cards.length - 2) + 200) + 'px'
  })

  var align = 0
  //  alert(game.drawingPile.length)

  for (var i = 0; i < game.drawingPile.length; i++) {
  //  alert($('.drawingPile').length)
    $('.relative').append('<div class="drawingPile">')
    $('.drawingPile:nth-child(' + (i + 1) + ')').css({
      'right': align + 'px'
    })
    align += 2
  }

  var left = 0
  for (var i = 0; i < game.player1Cards.length; i++) {
    $('.player1Cards').append('<div></div>')

    $('.player1Cards div:nth-child(' + (i + 1) + ')').css({
      'left': left + 'px'
    })
    .attr('id', game.player1Cards[i].type)
    left += 50
  }

  for (var i = 0; i < game.player2Cards.length; i++) {
    $('.player2').prepend('<button></button>')
  }

  // Player 1 hover

  $('.player1Cards div').hover(function () {
    var index = $('.player1Cards div').index(this) + 1
    var height = $('.player1Cards div:nth-child(' + index + ')').css('height')
    $('.player1Cards div:nth-child(' + index + ')').css({
      'height': parseInt(height) + 50 + 'px'
    })
  },
  function () {
    var index = $('.player1Cards div').index(this) + 1
    var height = $('.player1Cards div:nth-child(' + index + ')').css('height')
    $('.player1Cards div:nth-child(' + index + ')').css({
      'height': (parseInt(height) - 50) + 'px',
      'bottom': 0
    })
  })

/*
  $(function () {
    var index
    $('.player1Cards div').draggable({revert: true,
      start: function () {
        index = $('.player1Cards div').index(this)

        $(this).css({
          height: $('.played-cards').css('height'),
          width: $('.played-cards').css('width')
        })
      },
      stop: function () {
        $(this).css({
          height: '',
          width:''

        })
      }
    })

    $('.played-cards').droppable({
      drop: function (event, ui) {
          if (game.currentPlayer === 1 && game.isGameOver === false) {
            playTurn((index))
          } else {
            alert('It is not your turn!')
          }
      }
    })
  })

*/
}

function updateTime () {
  $('#time').text(Math.ceil(time))
}

function showTopCards () {
  console.log('showing')
  var length = 3
  if (game.drawingPile.length < length) {
    length = game.drawingPile.length
  }
  for (var i = 0; i < length; i++) {
    // if (game.drawingPile[i] !== undefined || game.drawingPile[i] !== null) {
    $('.known-cards div:nth-child(' + (i + 2) + ')').attr('id', game.drawingPile[i].type)
    // }
  }

  $('.known-cards').fadeIn()
  $('.known-cards').delay(3000).fadeOut()
}

function showYourTurn () {
  if (game.currentPlayer === 1) {
    $('.yourTurn').delay(300).fadeIn()
    $('.yourTurn').delay(500).fadeOut()
  }
}
