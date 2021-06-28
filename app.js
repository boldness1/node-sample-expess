var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

var db = require('./models');

//Burayi acarsan ilk update'te hersey gider
// db.sequelize.sync({force:true});

db.sequelize.sync();


var authMiddleware = require('./middleware/authMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var casesRouter = require('./routes/case');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(authMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/case', casesRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
