// login.js

require('dotenv').config();

var express = require('express');
var router = express.Router();

var cors = require('cors')

var path = require('path');
var bodyParser = require('body-parser');

var sha1 = require('sha1');

var session = require('express-session');
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');
const MongoDBStore = require('connect-mongodb-session')(session);
router.use(session({
  secret: "je_suis_un_poney",
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({
    uri: process.env.MONGO_SESS_URI,
    collection: process.env.MONGO_SESS_COLLECTION,
    touchAfter: 24 * 3600
  }),
  cookie: { secure: true, maxAge: 24*3600*1000 }
}))

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient; 
const mongoDBUrl = "mongodb://127.0.0.1:27017/";

// Setup CORS policies
router.use(cors())

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const Pool = require('pg').Pool

// Postgresql pool
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
router.get('/login', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../Vues/index.htm'));
});

/**
 * Logout
 */
router.all('/logout', (req,res,next) => {

    // Parse the body
    const { username } = req.body;

    // If no username
    if (!username) {
        
        // 
        res
        .status(400)
        .json({
            message: "Error empty credentials!"
        });   
        return;
    }
    
    // Change the session connected status
    req.session.isConnected = false;

    var io = require('../app').io;

    const sql = `UPDATE fredouil.users SET statut_connexion = 0 WHERE identifiant = '${username}'`;

    console.log(sql);

    // Change connexion status
    pool.query(sql, [], (error, resStatus) => {
        
        if (error) {
            console.log(error);
            return;
        }
    
        // Fetch the connected users
        pool.query('SELECT * FROM fredouil.users WHERE statut_connexion = 1 LIMIT 10', [], (error, results) => {

            if (error) {
                console.log(error);
                return;
            }

            // Send the connected users via socket
            io.sockets.emit('connected', results.rows);
        })
    });

    // Send the username via socket
    io.sockets.emit('logout', username);

    res
    .status(200)
    .json({
        message: "Logout!"
    });   
    return;   
});

/**
 * Login validation
 */
router.post('/login', function(req, res, next) {

    const { username, motpasse } = req.body;

    console.log(username.length);
    console.log(motpasse.length);

    console.log(username + " | " + motpasse);

    // Error
    if (!username || !motpasse) {
        
        res
        .status(400)
        .json({
            message: "Error empty credentials!"
        });   
        return;
    }
    
    // Fetch the user information
    pool.query('SELECT * FROM fredouil.users WHERE identifiant = $1 LIMIT 1', [username], (error, results) => {

        if (error) {
            console.log(error);
            return;
        }

        // No users found
        if (results.rows.length <= 0) {

            // Bad credential
            res
            .status(404)
            .json({
                message: "Bad credentials"
            });
            return;
        }
                
        var user = results.rows[0];
        var hashedInputPassword = sha1(motpasse);

        // Debug
        console.log("#### results.rows");
        console.log(user);  
        
        // Nice password
        if (user.motpasse === hashedInputPassword) {

            req.session.isConnected = true;
            req.session.userId = user.id;
            req.session.username = user.identifiant;
            console.log(req.session.id + " expire dans " + req.session.cookie.maxAge);

            var io = require('../app').io;

            const sql = `UPDATE fredouil.users SET statut_connexion = 1 WHERE identifiant = '${username}'`;

            // Change connexion status
            pool.query(sql, [], (error, resStatus) => {
                
                if (error) {
                    console.log(error);
                    return;
                }
    
                // Fetch the connected users
                pool.query('SELECT * FROM fredouil.users WHERE statut_connexion = 1 LIMIT 10', [], (error, results) => {
            
                    if (error) {
                        console.log(error);
                        return;
                    }
            
                    // Send the connected users via socket
                    io.sockets.emit('connected', results.rows);
                })
            });

            // Send the username via socket
            io.sockets.emit('login', user.identifiant);

            // Send back the result
            res
            .status(200)
            .json({
                userId: user.id,
                session_id: req.session.id,
                message: "Nice credentials"
            });   
            return;

        } else {   

            // Send back the result
            res
            .status(404)
            .json({
                message: "Bad credentials"
            });  
            return;
        }
    })
});

module.exports = router;


