/**
 * Module dependencies
 */
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('./config/logger.js');
var streamController = require('./controllers/streamController.js');
var routes = require('./config/routes.js');
var app = express();
app.use(express.bodyParser({
  keepExtensions: true,
  uploadDir: 'uploads'
}));
//app.use(require('connect').bodyParser());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(function (req, res, next) {
  res.locals.messages = req.session.messages;
  delete req.session.messages;
  next();
});
app.use(app.router);
app.use(express.csrf());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
logger.info('init...');
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
routes.makeRoutes(app);
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
streamController.init(server);