var io = require('./socket.io');
var Emitter = require('emitter');

module.exports = Client;

function Client(){
  this.socket = io('http://' + window.location.host);
  this.socket.on('connect', this.onconnect.bind(this));
}

Emitter(Client.prototype);

Client.prototype.onconnect = function(){
  var self = this;
  this.socket.on('change', function(data){
    self.emit('recieve', data);
  });
};


Client.prototype.ondisconnect = function(){
  console.log('disconnected');
};

Client.prototype.send = function(data) {
  this.socket.emit('change', data);
};
