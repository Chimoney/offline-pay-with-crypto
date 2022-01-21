var createError = require('http-errors')
var express = require('express')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()
var indexRouter = require('./routes')
var celoSubscriptions = require('./services/celo/subscribe')
var celoTnxCreateRouter = require('./routes/celo/transaction-create')
var celoTnxVerifyRouter = require('./routes/celo/transaction-verify')
var getExchange = require('./routes/rate');


var app = express()

// view engine setup
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
// app.use(express.static(path.join(__dirname, 'public')))


// Celo Endpoints
app.use('/celo/transaction/create', celoTnxCreateRouter)
app.use('/celo/transaction/verify', celoTnxVerifyRouter)
app.use('/rate', getExchange)


// NEAR Endpoints

// XRP Endpoints

const celoAddress1 = '0x363f932743599EBc88C85A35C201615dA4f2Bc5E'
const celoAddress2 = '0x6D2cFcdB9FD34E01c65527397B6DDE8b2E9EE711'
celoSubscriptions(celoAddress1)


app.get("/", indexRouter);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log("server up and running");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
