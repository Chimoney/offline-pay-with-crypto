var express = require('express');
var router = express.Router();

/* POST create transaction. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
