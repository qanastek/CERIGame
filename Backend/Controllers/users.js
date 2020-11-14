// users.js

require('dotenv').config();

var express = require('express');
var router = express.Router();

var cors = require('cors')

var path = require('path');
var bodyParser = require('body-parser');

var sha1 = require('sha1');

var session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
// router.use(session({
//     secret: 'je_suis_un_poney',
//     resave: true,
//     saveUninitialized: true
// }))
var storeDB = new MongoDBStore({
  uri: process.env.MONGO_SESS_URI,
  collection: process.env.MONGO_SESS_COLLECTION,
  touchAfter: 24 * 3600
});

router.use(session({
  secret: "je_suis_un_poney",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 24*3600*1000 },
  store: storeDB
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

const http = require('http').Server(express);
const io = require('socket.io')(http);

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PSQL_USERNAME,
    host: process.env.PSQL_IP,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
})

router.all('/test', function(req, res, next) {

  console.log("user");

  // console.log();

  storeDB.get(req.sessionID, function(err, data) {
    console.log({err: err, data:data});
  });

  // Send back the result
  res
  .status(200)
  .json({
    test: "res"
  });   
  return;
});

/**
 * Return all the users
 * /users
 */
router.get('/', function(req, res, next) {

    console.log("Reach the /users endpoint");

    // Get all the users
    // select * from fredouil.users;
    
    // Fetch the user information
    pool.query('SELECT * FROM fredouil.users', [], (error, results) => {

        if (error) {
            console.log(error);
            return;
        }

        // No users found
        if (results.rows.length <= 0) {

            // Not results
            res
            .status(404)
            .json({
                message: "Not results found."
            });
            return;
        }

        // Debug
        console.log("results.rows");
        console.log(results.rows.length);  
        console.log(results.rows[0]);
        
        // Send back the result
        res
        .status(200)
        .json(results.rows);   
        return;
    })
});

/**
 * Return the user profile
 */
router.patch('/:id/avatar', function(req, res, next) {

  var id = req.params.id;
  var newAvatar = req.body.avatar;

  console.log("newAvatar");
  console.log(newAvatar);

  if (!id || !newAvatar) {
      
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameter."
    });
    return;
  }

  // Fetch the user information
  pool.query('UPDATE fredouil.users SET "avatar" = $2 WHERE "identifiant" = $1', [id, newAvatar], (error, results) => {

    if (error) {
        console.log(error);
        return;
    }

    // // No users found
    // if (results.rows.length <= 0) {

    //     // Not results
    //     res
    //     .status(404)
    //     .json({
    //         message: "Not results found."
    //     });
    //     return;
    // }

    // Debug
    console.log("results.rows");
    console.log(results.rows.length);  
    console.log(results.rows);
    
    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});

/**
 * Return the history of games for the user
 */
router.get('/history/:id', function(req, res, next) {

  var id = req.params.id

  if(!id) {
    
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameters."
    });
    return;
  }

  // Fetch the user information
  pool.query(`SELECT * FROM fredouil.historique WHERE 'id_user' = '${id}' ORDER BY date_jeu DESC;`, [], (error, results) => {

    if (error) {
      console.log("query history");
      console.log(error);
      return;
    }

    // Debug
    console.log("results.rows history");
    console.log(results.rows.length);  
    console.log(results.rows);
    
    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});



/**
 * Return the challenges history of games for the user
 */
router.get('/defis/:id', function(req, res, next) {

  var id = req.params.id

  if(!id) {
    
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameters."
    });
    return;
  }

  // Fetch the user information
  pool.query(`SELECT * FROM fredouil.hist_defi WHERE 'id_user_gagnant' = '${id}' OR 'id_user_perdant' = '${id}';`, [], (error, results) => {

    if (error) {
      console.log("query defis");
      console.log(error);
      return;
    }

    // Debug
    console.log("results.rows defis");
    console.log(results.rows.length);  
    console.log(results.rows);
    
    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});

/**
 * Return the list of last connected users
 */
router.get('/lastUsers/:size', function(req, res, next) {

  var size = req.params.size

  if(!size || size <= 0 || size > 20) {
    
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameter."
    });
    return;
  }

  // Fetch the user information
  pool.query('SELECT * FROM fredouil.users ORDER BY statut_connexion DESC LIMIT $1;', [size], (error, results) => {

    if (error) {
      console.log(error);
      return;
    }

    // Debug
    console.log("results.rows");
    console.log(results.rows.length);  
    console.log(results.rows);
    
    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});


/**
 * Return the user profile
 */
router.get('/:id', function(req, res, next) {

  var id = req.params.id

  if(!id) {
    
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameter."
    });
    return;
  }

  console.log("Reach the user profile: " + id);

  // Get user infos
  // select * from fredouil.users where "identifiant" = 'kimdotcom';
  
  // Fetch the user information
  pool.query('SELECT * FROM fredouil.users WHERE "identifiant" = $1 LIMIT 1', [id], (error, results) => {

    if (error) {
        console.log(error);
        return;
    }

    // No users found
    if (results.rows.length <= 0) {

        // Not results
        res
        .status(404)
        .json({
            message: "Not results found."
        });
        return;
    }

    // Debug
    console.log("results.rows");
    console.log(results.rows.length);  
    console.log(results.rows[0]);
    
    // Send back the result
    res
    .status(200)
    .json(results.rows[0]);
    return;
  })
});

module.exports = router;

