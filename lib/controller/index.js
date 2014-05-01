/**
 * Module dependencies
 */

var map = require('remap');
var events = require('events');
var Emitter = require('emitter');

module.exports = Controller;

function Controller() {
  this.winEvents = events(window, this);
  this.winEvents.bind('devicemotion');
}

Controller.prototype.ondevicemotion = function(e){
  this.emit('change', e.accelerationIncludingGravity);
};

/**
 * Install emitter
 */

Emitter(Controller.prototype);

