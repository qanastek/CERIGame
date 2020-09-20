require('dotenv').config();

var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');

var sha1 = require('sha1');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PSQL_USERNAME,
    host: process.env.PSQL_IP,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
})

/**
 * Login form page
 */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../Vues/index.htm'));
});

/**
 * Login validation
 */
router.post('/', function(req, res, next) {

    const { username, password } = req.body;

    console.log(username + " | " + password);
    
    // Fetch the user information
    pool.query('SELECT * FROM fredouil.users WHERE identifiant = $1 LIMIT 1', [username], (error, results) => {
        
        if (error) throw error;
        
        var userPassword = results.rows[0].motpasse;
        var hashedInputPassword = sha1(password);

        // Debug
        console.log("results.rows");
        console.log(results.rows[0]);

        // Nice password
        if (userPassword === hashedInputPassword) { 

            // Send back the result
            res
            .status(200)
            .json({
                message: "Nice credentials"
            });   

        } else {   

            // Send back the result
            res
            .status(404)
            .json({
                message: "Bad credentials"
            });  
        }
    })
});

module.exports = router;
