/**
 * Module dependencies
 */

var map = require('remap');
var events = require('events');
var Emitter = require('emitter');
// var Spacebrew = require('spacebrew');

module.exports = Controller;

function Controller() {

  /*
  this.sb = new Spacebrew.Client(window.location.hostname, 'controller', 'controller');
  this.sb.addSubscribe('image', 'image');
  this.sb.onBinaryMessage = this.onBinaryMessage.bind(this);
  this.sb.onOpen = this.onOpen.bind(this);
  this.sb.connect();
  */
  
  window.ondevicemotion = this.ondevicemotion.bind(this);

  this.image = new Image();
  this.blobURL = null;

  document.body.appendChild(this.image);
}

Controller.prototype.ondevicemotion = function(e){
  console.log(e);
  this.emit('change', e.accelerationIncludingGravity);
};

/**
 * Install emitter
 */

Emitter(Controller.prototype);


Controller.prototype.onBinaryMessage = function(name, value, type){
  console.log('on binaryData');
  var view = new Uint8Array(value.buffer, value.startIndex);
  var receivedBinary = value.buffer.slice(value.startIndex);
  var blob = new Blob([view], {type: 'image/jpeg'});
  if(this.blobURL) {
    window.URL.revokeObjectURL(this.blobURL);
  }
  this.blobURL = window.URL.createObjectURL(blob);
  this.image.src = this.blobURL;
};

Controller.prototype.onOpen = function(){
  console.log('on open');
  console.log(arguments);
};
