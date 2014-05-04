/**
 * Module dependencies
 */

var map = require('remap');
var Client = require('io-client');
var Controller = require('controller');
var Seesaw = require('seesaw');


/**
 * Expose `Boot`
 */

module.exports = Boot;

/**
 * Initialize boot
 */

function Boot() {

  var self = this;

  if(window.location.hash === '#debug') {
    document.body.classList.add('debug');
  }
  
  this.log = document.createElement('div');
  this.log.className = 'log';
  this.message = document.querySelector('.message');
  this.content = this.message.querySelector('.message-content');

  var h = window.innerHeight;
  var w = window.innerWidth;
  this.message.style.width = h + 'px';
  this.message.style.height = w + 'px';
  this.message.style.transformOrigin = 
  this.message.style.webkitTransformOrigin = (h / 2) + 'px ' + (w / 2) + 'px';
    

  if('ondevicemotion' in window) this.controller = new Controller();
  this.client = new Client();
  this.seesaw = new Seesaw();
  this.content.appendChild(this.seesaw.el);
  
  if(this.controller) {
    this.controller.on('change', function(data){
      self.client.send(data);
    });
  }
  
  var count = 7;
  var lights = [];

  this.client.on('degree', function(deg){
    self.seesaw.to(deg);
  });

  this.client.on('recieve', function(data){
    self.log.innerText = 'x: ' + data.x + '\ny: ' + data.y + '\nz: ' + data.z;
    var light = map(Math.abs(data.y), 0, 10, 0, 100);
    lights.push(light);
    if(lights.length === count) {
      lights.shift();
    }
    var v = 0;
    lights.forEach(function(_v){
      v += _v;
    });
    v /= lights.length;
    // document.documentElement.style.backgroundColor = 'hsla(0, 0%, ' + v + '%, 1)';
  });

  document.body.appendChild(this.log);
}
