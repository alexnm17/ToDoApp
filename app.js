var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var projectsRouter = require('./routes/projects');
var usersRouter = require('./routes/users');
var notificationsRouter = require('./routes/notifications');


var app = express();

var bodyParser  = require("body-parser");  
var cors = require('cors');  
app.use(cors());  
app.use(bodyParser.json({limit: '50mb'}));  
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/notifications', notificationsRouter);

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

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alexnm21:DWeb123@cluster0.vblja.mongodb.net/ToDoApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>  console.log('mymerndb connection successful'))
    .catch((err) => console.error(err));

module.exports = app;
