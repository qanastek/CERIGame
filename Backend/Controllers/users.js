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

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PSQL_USERNAME,
    host: process.env.PSQL_IP,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
})

/**
 * Return all the users
 * /users
 */
router.get('/', function(req, res, next) {

    console.log("Reach the /users endpoint");
    
    // Fetch the user information
    pool.query('SELECT * FROM fredouil.users ORDER BY id ASC', [], (error, results) => {

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
        
        // Send back the result
        res
        .status(200)
        .json(results.rows);   
        return;
    })
});

/**
 * Edit the user avatar
 */
router.patch('/:id/avatar', function(req, res, next) {

  // Get the user id
  var id = req.params.id;
  // Get the new avatar url
  var newAvatar = req.body.avatar;

  if (!id || !newAvatar) {
      
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameter."
    });
    return;
  }

  // Update the user avatar
  var sql = `
    UPDATE
      fredouil.users
    SET
      avatar = '${newAvatar}'
    WHERE
      id = ${id}
  `;

  console.log(sql);

  // Patch the user information
  pool.query(sql, [], (error, results) => {

    if (error) {
        console.log(error);
        return;
    }

    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});

/**
 * Edit the user humeur
 */
router.patch('/:id/humeur', function(req, res, next) {

  // Get the user id
  var id = req.params.id;
  // Get the new humeur
  var newHumeur = req.body.humeur;

  console.log("newHumeur");
  console.log(newHumeur);

  if (!id || !newHumeur) {
      
    // Not results
    res
    .status(404)
    .json({
        message: "Bad parameter."
    });
    return;
  }

  // Update the user humeur
  var sql = `
    UPDATE
      fredouil.users
    SET
      humeur = '${newHumeur}'
    WHERE
      id = ${id}
  `;

  console.log(sql);

  // Patch the user information
  pool.query(sql, [], (error, results) => {

    if (error) {
        console.log(error);
        return;
    }

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
router.get('/:id/history', function(req, res, next) {
  
  console.log("-------------------------");
  console.log(req.session.id + " " + req.session.username + " expire dans " +
              req.session.cookie.maxAge);

  // Get the user id
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
  var sql = `
    SELECT
      *
    FROM
      fredouil.historique
    where
      id_user = '${id}'
    ORDER BY
      date_jeu DESC
    ;
  `;

  pool.query(sql, [], (error, results) => {

    if (error) {
      console.log("query history");
      console.log(error);
      return;
    }
    
    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});

/**
 * Return the active challenges of the user
 */
router.get('/:id/active_defis', function(req, res, next) {

  // User id
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

  // Connect to the MongoDB server
  MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    if(err) {return console.log('erreur connexion base de données'); }

    if(db) {

        var dbo = db.db("db");

        console.log(`The current user id is ${id}`);

        dbo.collection("defi").find({
          "id_user_defi" : Number(id)
        }).toArray(function(err, result) {

            if (err) throw err;

            // Send back the themes
            res
            .status(200)
            .json(result);

            db.close();
        });
    }
  })
});

/**
 * Return the challenges history of games for the user
 */
router.get('/:id/hist_defis', function(req, res, next) {

  // User id
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

  // Get the user challenges
  var sql = `
    SELECT
      *
    FROM
      fredouil.hist_defi
    WHERE
      id_user_gagnant = ${id}
      OR
      id_user_perdant = ${id}
    ;
  `;

  console.log(sql);

  // Fetch the user information
  pool.query(sql, [], (error, results) => {

    if (error) {
      console.log(error);
      res
      .status(404)
      .json("Error");
      return;
    }
    
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

  // Get the limit
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
    
    // Send back the result
    res
    .status(200)
    .json(results.rows);
    return;
  })

});

/**
 * Return the top 10
 */
router.get('/top', function(req, res, next) {

  // Fetch the TOP 10
  var sql = `
    SELECT
      identifiant as user,
      avatar,
      SUM(score) as score,
      COUNT(*) as games_nbr
    FROM
      fredouil.historique
    JOIN
      fredouil.users
    ON
      id_user = fredouil.users.id
    GROUP BY
      identifiant,
      avatar
    ORDER BY
      score
      DESC
    LIMIT
      10
    ;
  `;

  pool.query(sql, [], (error, results) => {

    if (error) {
      console.log("query history");
      console.log(error);
      return;
    }
    
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

  // Get the user id
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
  var sql = `
    SELECT
      *
    FROM
      fredouil.users
    WHERE
      id = $1
    LIMIT
      1
  `;

  // Fetch the user information
  pool.query(sql, [id], (error, results) => {

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
    
    // Send back the result
    res
    .status(200)
    .json(results.rows[0]);
    return;
  })
});

module.exports = router;

