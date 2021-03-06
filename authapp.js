//process.env.NODE_ENV = "production";          // [development, production]
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var session = require('express-session');     // session middleware
var path = require('path');
var logger = require('morgan');               // HTTP request logger middleware
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var cookieParser = require('cookie-parser');  // cookie-parsing middleware
var bodyParser = require('body-parser');      // body-parsing middleware

// Use CAS Middleware
var cas = require('tud-cas-client');
var config = require('config');

if(config.has("CAS")) {
  var casconfigendpoint = config.get('CAS.casendpoint');
  var casconfigcasreturn = config.get('CAS.casreturn');
  var auth = cas.getMiddleware(casconfigendpoint,casconfigcasreturn);
} else
  var auth = cas.getMiddleware('https://sso.hrz.tu-darmstadt.de', 'http://localhost:3000');

var routes = require('./routes/index');
var openroute = require('./routes/open');

var app = express();

app.use(session({
  secret: 'fu7doXn3x3YnL',
  resave: false,
  saveUninitialized: true,
  name: "TudCasDemoSessionId"
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup the logger
var logginglevel = config.get("Logging.level") || "dev";
if (process.env.NODE_ENV === 'development') {
  app.use(logger(logginglevel));
} else if (process.env.NODE_ENV === 'production') {
  var logDirectory = __dirname + '/log';
  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: "YYYY-MM-DD"
  });
  app.use(logger(logginglevel, {stream: accessLogStream}))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/open', openroute);
app.use('/', auth, routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
