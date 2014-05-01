/**
 * Module dependencies
 */

var map = require('remap');
var pad = require('pad-component');
var params = {baudrate: 57600 };
var usbport = process.env.USB_PORT || "/dev/tty.usbmodem1421";
var SerialPort = require('serialport').SerialPort;

module.exports = Arduino;

function Arduino() {
  this.serial = new SerialPort(usbport, params);
  this.serial.on("open", this.onopen.bind(this));

}

Arduino.prototype.onopen = function(){

  console.log('serial open');

  this.serial.on('data', function(data) {
    // console.log('data received: ' + data);
  });
  
  
};

Arduino.prototype.send = function(data) {
  data = this.decode(data);
  console.log(data);
  this.serial.write(data + "\n");
  // console.log('Send: ' + data);
};

Arduino.prototype.decode = function(data){
  var precision = 10000;
  var len = (precision + '').length;
  var axis = ['x', 'y', 'z'];
  var result = [];
  axis.forEach(function(a){
    var v = Math.round(data[a] * precision) / precision;
    v = map(v, -10, 10, 0, 180);
    var isFloat = Math.abs(v) < 1;
    var sign = v < 0;
    v += '';
    while(v.length > len + 1) {
      v = v.substring(0, v.length - 1);
    }
    v = pad.right(v + '', (isFloat ? len + 1 : len), '0');
    if(v.length === len) v += '0';
    result.push(v);
  })
  return result.join('|');
};
