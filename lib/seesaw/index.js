var query = require('query');
var domify = require('domify');
var template = require('./template');

module.exports = Seesaw;

function Seesaw() {
  this.el = domify(template);
  this.seat = query('.seat', this.el);
}

Seesaw.prototype.to = function(deg) {
  this.seat.webkitTransform = 
     this.seat.mozTransform =
        this.seat.transform = 'rotate(' + deg + 'deg)';
};

