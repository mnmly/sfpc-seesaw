var WebSocketServer = require('ws').Server;
var IO = require('socket.io');

module.exports = function(server, app){
  
  var io = IO(server, { log: false });
  
  io.on('connection', function(s){
    s.id = 'socket-id-' + Math.floor(Math.random() * 99999);
    s.on('change', function(entry){
      entry.id = s.id;
      entry.status = 'alive';
      s.broadcast.emit('change', entry);
      app.emit('change', entry);
    });
    s.on('disconnect', function(){
      var entry = {
        id: s.id,
        status: 'dead'
      };
      s.broadcast.emit('disconnect-socket', entry);
      app.emit('disconnect-socket', entry);
    });
  });

  return io;
};
