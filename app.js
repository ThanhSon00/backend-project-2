require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const originURL = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`;
const { StatusCodes } = require('http-status-codes');
const { otherTokenAttr } = require('./setting/attributes');

// Routes
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const sessionRoutes = require('./routes/session');
const loginRoutes = require('./routes/login');
const forgotPwdRoutes = require('./routes/forgotPassword');
const resetPwdRoutes = require('./routes/resetPassword');

// Middleware
const asyncWrapper = require('./middleware/asyncWrapper');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/login', checkLogged, loginRoutes);
app.use('/authentication', authenticationRoutes);
app.use('/home', authenticateUser, homeRoutes);
app.use('/forgot-password', checkLogged, forgotPwdRoutes);
app.use('/reset-password', checkLogged, resetPwdRoutes);

// Rest api
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sessions', sessionRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err?.response?.status === StatusCodes.UNAUTHORIZED) {
    res.cookie('message', "Email or password not correct", otherTokenAttr);
    return res.redirect(`${originURL}/login`);
  }
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', { originURL });
});

module.exports = app;
