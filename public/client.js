/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

/* Multi-use Functions */

var activeLabel = function(t, options) {
  // Adds a CURRENT WEEK label in bright 
  // blue if the card is less than 6 days
  // old.
  // Otherwise, adds an OLD NEWS label in
  // grey/white.
  // TODO: Update it to only highlight cards 
  // from current Monday-Friday stretch
  var date = new Date(Date.now())
  var card = t.card('all')
  
  return card
  .then(function (card) {
    var cardCreated = new Date(1000*parseInt(card.id.substring(0,8),16));
    // console.log(cardCreated);
    // console.log((date - cardCreated) / 1000);
    // console.log(card.name);
    if (((date - cardCreated) / 1000) < 518400) {
        return [{
          text: '👌 CURRENT WEEK 👍',
          color: 'sky'
        }];
    } else {
      return [{
        text: '👎 OLD NEWS 👎',
        color: 'white'
      }];
    }
  });
}

var onClick = function(t, opts) {
  // Should invert the HIDDEN var and
  // then re-call the board-buttons function 
  // to update the text and show/hide the cards
  var hidden = null
  t.get('board', 'shared', 'card-hidden')
  .then(function(result) {
    hidden = result
    console.log('button clicked, hidden = ' + hidden)
  })
  t.set('board', 'shared', 'card-vis', !hidden)
  .then(t.get('board', 'shared', 'card-vis')
    .then(function(result) {
      hidden = result
      console.log('hidden value inverted, now = ' + hidden)
 
  }), function(reason) {
    console.log(reason)
  })
}

var updateLabels = function(t, opts) {
  var hidden = null
  t.get('board', 'shared', 'card-hidden')
  .then(function(result) {
    hidden = result
  })
  
 
}

var init = TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
  // Initialise just takes a dict of key/value 
  // capability/function pairs! 
  
  'card-badges': activeLabel,
                         
  'card-detail-badges': activeLabel,
  
  'board-buttons': function(t, options) {
    var hidden = null
    
  
    t.get('board', 'shared', 'card-hidden')
    .then(function(result) {
      if (hidden != undefined) {
        hidden = result
      } else {
        t.set('board', 'shared', 'card-hidden', false)
        hidden = false
      }
   })
    
    if (hidden == false) {
      return [{
        text: '🙈 Hide Inactive Cards',
        callback: onClick
      }];
    } else {
      return [{  
        text: '🙊 Show Inactive Cards',
        callback: onClick
      }];      
    }
  },
});
