var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
let fs = require('fs');

require('axios')
    .get("https://api.nomics.com/v1/currencies/sparkline?key=ab5096e30f3ee1fc7a4d56e972eb65d2&start=2019-01-01T00%3A00%3A00Z&end=2019-12-06T00%3A00%3A00Z")
    .then(response =>{
      var stream = fs.createWriteStream("data.json");
      stream.once('open', function(fd) {
        response.data.forEach(data=>{
          stream.write(JSON.stringify(data));
        });
        stream.end();
        console.log("success")
      });
    });

// write to a new file named data.json




