/**
 * Module dependencies
 */

var map = require('remap');
var query = require('query');
var prefix = require('prefix');
var Seesaw = require('seesaw');
var Client = require('io-client');
var Controller = require('controller');

/**
 * Expose `Boot`
 */

module.exports = Boot;

/**
 * Initialize boot
 */

function Boot() {

  this.log = query('.log');
  this.message = query('.message');
  this.content = query('.message-content', this.message);
  
  this.client = new Client();
  this.seesaw = new Seesaw();
  this.content.appendChild(this.seesaw.el);

  if('ondevicemotion' in window) {
    this.controller = new Controller(); 
  }

  this.rotateMessage();
  this.bind();

  if('#debug' === location.hash) {
    document.body.classList.add('debug'); 
  }
}

/**
 * Bind Events
 */

Boot.prototype.bind = function() {

  this.client.on('degree', this.ondegree.bind(this));

  if(this.controller) {
    this.controller.on('change', this.onchange.bind(this));
  }
};

/**
 * When `controller` emit the `change` event
 *
 * @param {Object} data
 */

Boot.prototype.onchange = function(data) {

  this.client.send(data);

  this.log.innerHTML = 'x: ' + data.x + '<br/>' + 
                       'y: ' + data.y + '<br/>' + 
                       'z: ' + data.z;
};

/**
 * When client recieve `degree` event
 *
 * @param {Number} degree
 */

Boot.prototype.ondegree = function() {
  this.seesaw.to(deg);
};

/**
 * Rotate the message div so it matches the seesaw
 */

Boot.prototype.rotateMessage = function() {

  var h = window.innerHeight;
  var w = window.innerWidth;

  this.message.style.width = h + 'px';
  this.message.style.height = w + 'px';
  this.message.style[prefix('transformOrigin')] = (h / 2) + 'px ' + (w / 2) + 'px';

};
