/**
 * Module dependencies
 */

var IO = require('socket.io');


/**
 * @param {Server} server
 * @param {Application} app
 */

module.exports = function(server, app){
  
  var io = IO(server, { log: false });
  
  io.on('connection', function(s){

    s.id = 'socket-id-' + Math.floor(Math.random() * 99999);

    s.on('change', function(entry){
      entry.id = s.id;
      entry.status = 'alive';
      s.broadcast.emit('change', entry);
    });

    s.on('degree', function(deg){
      s.broadcast.emit('degree', deg);
    });

    s.on('disconnect', function(){
      var entry = { id: s.id, status: 'dead' };
      s.broadcast.emit('disconnect-socket', entry);
    });
  });

  return io;
};
