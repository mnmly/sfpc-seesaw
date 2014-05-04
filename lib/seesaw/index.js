var query = require('query');
var domify = require('domify');
var template = require('./template');

module.exports = Seesaw;

function Seesaw() {
  this.el = domify(template);
  this.seat = query('.seat', this.el);
}

Seesaw.prototype.to = function(deg) {
  this.seat.style.webkitTransform = 
     this.seat.style.mozTransform =
        this.seat.style.transform = 'rotate(' + (deg - 90) + 'deg)';
};

