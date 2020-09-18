var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/vues/index.htm'));
});

router.post('/', function(req, res, next) {

    const { username, password } = req.body;

    console.log(username + " | " + password);

    res.send({
        username: username,
        password: password
    });
});

module.exports = router;
