/**
 * Module dependencies
 */

var map = require('remap');
var events = require('events');
var Emitter = require('emitter');

/**
 * Expose `Controller`
 */

module.exports = Controller;

function Controller() {
  window.ondevicemotion = this.ondevicemotion.bind(this);
}

/**
 * Install emitter
 */

Emitter(Controller.prototype);

/**
 * Device motion event
 *
 * @param {DeviceMotionEventInstance} e
 */

Controller.prototype.ondevicemotion = function(e){
  this.emit('change', e.accelerationIncludingGravity);
};

