var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//1cree le serveur 
 const http =require ('http');
 //6
 const {connectToMonogoDB}=require("./db/db.js");
//4 
require("dotenv").config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter.js');
var orderRouter = require('./routes/orderRouter.js');
var orderitemRouter = require('./routes/orderitemRouter.js');
var productRouter = require('./routes/productRouter.js');
var deliveryRouter = require('./routes/deliveryRouter.js');
var categoryRouter = require('./routes/categoryRouter.js');
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', orderRouter);
app.use('/ordersitem', orderitemRouter);
app.use('/products', productRouter);
app.use('/deliveries', deliveryRouter);

app.use('/categorys', categoryRouter);
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
const server = http.createServer(app); //2
server.listen(process.env.Port,() => {connectToMonogoDB(),console.log('app is running in port: 5000')});