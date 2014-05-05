/**
 * Module dependencies
 */

var io = require('./socket.io');
var Emitter = require('emitter');

/**
 * Expose `Client`
 */

module.exports = Client;

function Client(){
  this.socket = io('http://' + window.location.host);
  this.socket.on('connect', this.onconnect.bind(this));
}

/**
 * Install emitter
 */

Emitter(Client.prototype);

/**
 * On connection established
 */

Client.prototype.onconnect = function(){
  this.socket.on('change', this.onchange.bind(this));
  this.socket.on('degree', this.ondegree.bind(this));
};

/**
 * @param {Object} data
 */

Client.prototype.onchange = function(data) {
  self.emit('change', data);
};

/**
 * @param {Number} degree
 */

Client.prototype.ondegree = function(degree) {
  self.emit('degree', degree);
};

/**
 * On disconnected
 */

Client.prototype.ondisconnect = function(){
  console.log('disconnected');
};

/**
 * Send the acceleration data
 *
 * @param {Object} data
 */

Client.prototype.send = function(data) {
  this.socket.emit('change', data);
};
