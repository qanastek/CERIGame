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
// router.use(session({
//     secret: 'je_suis_un_poney',
//     resave: true,
//     saveUninitialized: true
// }))
router.use(session({
  secret: "je_suis_un_poney",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 24*3600*1000 },
  store: new MongoDBStore({
    uri: process.env.MONGO_SESS_URI,
    collection: process.env.MONGO_SESS_COLLECTION,
    touchAfter: 24 * 3600
  })
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

    const { username, sessionID } = req.body;

    console.log("---------------");
    console.log("---req.session.username");
    console.log(req.session.username);

    console.log("---req.sessionID");
    console.log(req.sessionID);

    console.log("---sessionID");
    console.log(sessionID);

    console.log("---req.session");
    console.log(req.session);
    console.log("---------------");

    if (!username) {
        
        res
        .status(400)
        .json({
            message: "Error empty credentials!"
        });   
        return;
    }

    // MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    //     var dbo = db.db("db");

    //     dbo.collection("mySessions3223").find({ _id: sessionID }, { projection: {  } } ).toArray(function(err, result) {

    //         if (err) throw err;

    //         console.log("result");
    //         console.log(result);

    //         db.close();
    //     });

    // });
    
    req.session.isConnected = false;

    // Change connexion status
    pool.query('UPDATE fredouil.users SET statut_connexion = 0 WHERE identifiant = $1', [username], (error, resStatus) => {
        console.log("----------------- resStatus");
        console.log(resStatus);
    });

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

            console.log(req.session);
            console.log(req.session.id + " expire dans " + req.session.cookie.maxAge);

            // Change connexion status
            pool.query('UPDATE fredouil.users SET statut_connexion = 1 WHERE identifiant = $1', [username], (error, resStatus) => {
                console.log("----------------- resStatus");
                console.log(resStatus);
            });

            // Send back the result
            res
            .status(200)
            .json({
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


