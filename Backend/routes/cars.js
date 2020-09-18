var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
      make: "Renault",
      model: "Clio"
  });
});

module.exports = router;
