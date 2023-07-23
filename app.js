require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { originURL } = require('./setting/api');

// Routes
const authenticationRoutes = require('./routes/authentication');
const userRoutes = require('./routes/api/user');
const formRoutes = require('./routes/api/form');
const sessionRoutes = require('./routes/api/session');
const conversationRoutes = require('./routes/api/conversation')
const chatLineRoutes = require('./routes/api/chatLine')

const homeRoutes = require('./routes/home');
const loginRoutes = require('./routes/login');
const forgotPwdRoutes = require('./routes/forgotPassword');
const resetPwdRoutes = require('./routes/resetPassword');
const credentialRoutes = require('./routes/credential');

// Middleware
const { validateLockToken } = require('./middleware/validator');
const winstonLogger = require('./logs/winstonLogger');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { res.redirect('/login') });
app.use('/login', loginRoutes);
app.use('/authentication', authenticationRoutes);
app.use('/home', homeRoutes);
app.use('/forgot-password', forgotPwdRoutes);
app.use('/reset-password/:token', validateLockToken, resetPwdRoutes);
app.use('/whoami', credentialRoutes);

// Rest api
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/forms', formRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/chat-lines', chatLineRoutes);

// Normal api
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

  // winstonLogger.error(err);
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', { originURL });
});

module.exports = app;
