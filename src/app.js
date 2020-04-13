import createError from 'http-errors';
import path from 'path';
const morgan = require('morgan')
import bodyParser from 'body-parser';
import express from "express";
import session from 'express-session';
import passport from "passport";

import User from './models/user';

import {authenticationMiddleware} from "./middleware/routes";

import homeRouter from './routes/home';
import postsRouter from './routes/posts';
import troughsRouter from './routes/troughs';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import usersRouter from './routes/users';
import chatRouter from './routes/chat';
import mediaRouter from './routes/media';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/feed', express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'very secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/feed', homeRouter);
app.use('/feed/register', registerRouter);
app.use('/feed/login', loginRouter);
app.use('/feed/logout', logoutRouter);
app.use('/feed/posts', authenticationMiddleware, postsRouter);
app.use('/feed/troughs', authenticationMiddleware, troughsRouter);
app.use('/feed/users', authenticationMiddleware, usersRouter);
app.use('/feed/chat', authenticationMiddleware, chatRouter);
app.use('/feed/media', authenticationMiddleware, mediaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;