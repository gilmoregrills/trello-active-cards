/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var HIDDEN = false

var activeLabel = function(t, options) {
  // Adds a CURRENT WEEK label in bright 
  // blue if the card is less than 6 days
  // old.
  // Otherwise, adds an OLD NEWS label in
  // grey/white.
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

TrelloPowerUp.initialize({
  //Start adding handlers for your capabilities here!
  
  'card-badges': activeLabel,
                         
  'card-detail-badges': activeLabel,
  
  'board-buttons': function(t, options) {
    if (HIDDEN == false) {
      return [{
        text: '🙈 Hide Inactive Cards'
        
      }];
    } else {
      return [{  
        text: '🙊 Show Inactive Cards'
      }];      
    }
  },
  
  
});
