const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { generateSwagger, serveSwagger } = require('./swagger/swagger');
const { errorHandler } = require('./utils/ApiError');

const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');

var app = express();

const routes = ['./swagger/**/*.js'];

const swaggerSpec = generateSwagger('Task', '1.0.0', routes);

serveSwagger(app, swaggerSpec, '/api-docs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', usersRouter);
app.use('/api/user/product', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    status: "Not Found.",
    code: 404,
    success: false,
  });
});

app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    message: err.message || 'Internal Server Error',
    timestamp: new Date()
  });

});
module.exports = app;
