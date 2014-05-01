var IO = require('socket.io');

module.exports = function(server, app){
  
  var io = IO(server, { log: false });
  
  io.on('connection', function(s){
    s.on('change', function(entry){
      s.broadcast.emit('change', entry);
      app.emit('change', entry);
    });
  });

  return io;
};
