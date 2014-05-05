/**
 * Module depedencies
 */

var fs = require('fs');
var io = require('io-server');
var koa = require('koa');
var app = module.exports = koa();
var http = require('http');
var port = process.env.PORT || 3000;
var serve = require('koa-static');
var mount = require('koa-mount');
var route = require('koa-route');
var throttle = require('throttleit');
var server;

if('development' === app.env){

  var mini = require('mini-livereload')();
  var livereload = require('koa-livereload');
  var build = require('mnml-build').middleware({dev: true});

  app.use(build);
  app.use(livereload());

  mini.listen(35729);
  app.use(serve(__dirname + '/lib'));

}

/**
 * Expose some public dirs
 */

app.use(serve(__dirname + '/build'));
app.use(serve(__dirname + '/public'));

/**
 * Returns old and plain `index.html`
 */

app.use(route.get('/', function *(){
  var index = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  this.body = index;
}));

/**
 * Create server
 */

server = http.createServer(app.callback());

/**
 * Setup io.
 */

io(server, app);

/**
 * Listen the port
 */

server.listen(port);
console.log('App is running at PORT: %s', port);
