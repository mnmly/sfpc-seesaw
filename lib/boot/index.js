/**
 * Module dependencies
 */

var map = require('remap');
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

  var self = this;
  this.log = document.createElement('div');
  this.log.className = 'log';

  if('ondevicemotion' in window) this.controller = new Controller();
  this.client = new Client();
  
  if(this.controller) {
    this.controller.on('change', function(data){
      self.client.send(data);
    });
  }
  
  var count = 7;
  var lights = [];
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
    document.documentElement.style.backgroundColor = 'hsla(0, 0%, ' + v + '%, 1)';
  });

  document.body.appendChild(this.log);
}
