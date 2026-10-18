var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var session = require('express-session');
var connection  = require('./lib/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var crimesRouter = require('./routes/crimes');
var membersRouter = require('./routes/members');
var titanicRouter = require('./routes/titanic');
var testRouter = require('./routes/test');
var proxyRouter = require('./routes/proxy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members', membersRouter);
app.use('/proxy', proxyRouter);

app.use('/titanic', testRouter);  //  titanicRouter);
app.use('/books', testRouter);  //  booksRouter);
app.use('/crimes', testRouter);  //  crimesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(`404: ${req.baseUrl}`);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log("http://localhost:3000");
module.exports = app;
