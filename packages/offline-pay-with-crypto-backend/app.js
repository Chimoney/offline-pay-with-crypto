var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var celoSubscriptions = require('./services/celo/subscribe')
var celoTnxCreateRouter = require('./routes/celo/transaction-create')
var celoTnxVerifyRouter = require('./routes/celo/transaction-verify')

var app = express()

// view engine setup
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// Celo Endpoints
app.use('/celo/transaction/create', celoTnxCreateRouter)
app.use('/celo/transaction/verify', celoTnxVerifyRouter)

// NEAR Endpoints

// XRP Endpoints

const celoAddress1 = '0x363f932743599EBc88C85A35C201615dA4f2Bc5E'
const celoAddress2 = '0x6D2cFcdB9FD34E01c65527397B6DDE8b2E9EE711'
celoSubscriptions(celoAddress2)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
