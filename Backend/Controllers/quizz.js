// quizz.js

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
 * Return Themes
 */
router.get('/themes', function(req, res, next) {

    console.log("Reach the /quizz endpoint");

    MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

        if(err) {return console.log('erreur connexion base de données'); }

        if(db) {

            var dbo = db.db("db");

            dbo.collection("quizz").find({}, { projection: { _id: 1, thème: 1 } } ).toArray(function(err, result) {

                if (err) throw err;

                // Send back the themes
                res
                .status(200)
                .json({
                    result
                });

                db.close();
            });
        }
    })
});

/**
 * Return Quizz of the theme
 * 5f6b0e563f0d8050e84e755a
 */
router.get('/themes/:id', function(req, res, next) {

    var id = req.params.id;
    var difficulty = req.query.difficulty;
    console.log(difficulty);

    // check empty
    if (!difficulty) {
      difficulty = 4;
    }

    console.log("Reach the /quizz/themes/ endpoint: " + id);

    MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

        if(err) {return console.log('erreur connexion base de données'); }

        if(db) {

            var dbo = db.db("db");

            console.log("ddddddddddddddddddddd");

            dbo.collection("quizz")
            .find(
              { _id: new mongo.ObjectID(id) },
              {
                projection:{
                  quizz: 1
                }
              }
            ).toArray(function(err, result) {

                if (err) throw err;

                quizzs = result[0].quizz

                // Send back the theme quizz
                res
                .status(200)
                .json(quizzs);   

                db.close();
            });
        }
    })
});

/**
 * Ajoute dans l'historique
 */
router.post('/historique', function(req, res, next) {

    console.log("Reach the /quizz/historique endpoint:");

    console.log(req.body);

    if (
        !req.body.user || !req.body.niveau_jeu ||
        !req.body.nb_reponses_corr || !req.body.temps ||
        !req.body.score
    ) {
        res
        .status(404)
        .json({ message: "Data is missing!" }); 
        return;       
    }

    // SQL Query for insertion
    const query = `
        INSERT INTO fredouil.historique
        (
            id_user,
            date_jeu,
            niveau_jeu,
            nb_reponses_corr,
            temps,
            score
        ) VALUES (
            ${req.body.user},
            NOW(),
            ${req.body.niveau_jeu},
            ${req.body.nb_reponses_corr},
            ${req.body.temps},
            ${req.body.score}
        );
    `;

    console.log("query");
    console.log(query);

    // Insert the history row
    pool.query(query, [], (error, resStatus) => {

      if (error) {
        console.log("query add history");
        console.log(error);
        
        res
        .status(404)
        .json({ message: "Une erreur est survenu!" });
        return;
      }
      
      // Query TOP 10
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

      var io = require('../app').io;

      // Fetch Top 10
      pool.query(sql, [], (error, results) => {

        if (error) {
          console.log("query history");
          console.log(error);
          return;
        }

        // Send it via socket
        io.sockets.emit('top10_score', results.rows);
      });
      
      // Send back the result
      res
      .status(200)
      .json({ message: "Insertion done!" });
      return;
    });
});

/**
 * Delete the challenge from the database
 */
function deleteChallenge(id) {
  
  // Connect to the MongoDB server
  MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    if(err) {return console.log('Erreur de connexion à la base de données'); }

    if(db) {

      var dbo = db.db("db");
      
      // The MongoDB query
      var query = { _id: new mongo.ObjectID(id) };

      // Delete the challenge      
      dbo.collection("defi").deleteOne(query, (err, obj) => {

        // Check error
        if (err) throw err;

        console.log("1 document deleted");
              
        // Query TOP 10 medals
        var sql = `
          SELECT
            COUNT(*) as medailles,
            id_user_gagnant as id,
            identifiant as user,
            avatar
          FROM
            fredouil.hist_defi
          JOIN
            fredouil.users
            ON
            id_user_gagnant = fredouil.users.id
          GROUP BY
            id_user_gagnant,
            identifiant,
            avatar
          ORDER BY
            medailles DESC
          LIMIT
            10
          ;
        `;

        var io = require('../app').io;

        // Fetch Top 10 medals
        pool.query(sql, [], (error, results) => {

          if (error) {
            console.log("query medals");
            console.log(error);
            return;
          }

          // Send it via socket
          io.sockets.emit('top10', results.rows);
        });

        // Close the stream
        db.close();
      });
    }
  })
}

/**
 * Reward the winner of the challenge
 */
router.post('/defis/:id/reward', function(req, res, next) {

  console.log("Reach the /quizz/defis/:id/reward endpoint:");

  // Get the challenge identifier
  var id = req.params.id;
  
  // SQL Query for insertion
  const query = `
    INSERT INTO fredouil.hist_defi
    (
      id_user_gagnant,
      id_user_perdant,
      date_defi
    ) VALUES (
        ${req.body.winner},
        ${req.body.looser},
        NOW()
    );
  `;

  console.log("query");
  console.log(query);

  // Insert the challenge row
  pool.query(query, [], (error, resStatus) => {

    // If something happen
    if (error) {

      console.log("query add history");
      console.log(error);
      
      res
      .status(404)
      .json({ message: "Une erreur est survenu!" });
      return;
    }

    console.log("this.defi._id");
    console.log(id);

    // Delete the challenge from the collection Defi in MongoDB
    deleteChallenge(id);
    
    // Send back the result
    res
    .status(200)
    .json({ message: "Insertion done!" });
    return;
  });
});

/**
 * Save the challenge
 */
router.post('/defis', function(req, res, next) {

  console.log("Reach the /quizz/defis endpoint:");

  if (!req.body.id_user_defi || !req.body.id_user_defiant ||
      !req.body.score_user_defiant || !req.body.quizz ||
      !req.body.username_defiant || !req.body.difficulty
  ) {
      res
      .status(404)
      .json({ message: "Data is missing!" }); 
      return;       
  }

  // Defi to insert in MongoDB
  const defi = {
    id_user_defi: req.body.id_user_defi,
    id_user_defiant: req.body.id_user_defiant,
    identifiant_user_defiant: req.body.username_defiant,
    score_user_defiant: req.body.score_user_defiant,
    quizz: req.body.quizz,
    difficulty: req.body.difficulty
  };

  // Connect to the MongoDB server
  MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    if(err) {return console.log('erreur connexion base de données'); }

    if(db) {

      var dbo = db.db("db");

      // Insert the challenge
      dbo.collection("defi").insertOne(defi, function(err, res) {
        
        if (err) throw err;

        console.log("1 document inserted");

        // If True, Send a broadcast
        var io = require('../app').io;

        // Send it via socket
        io.sockets.emit(`defi_${req.body.id_user_defi}`, defi);

        db.close();
      });
    }
  })

  res
  .status(200)
  .json({
    "message": "Saved!"
  });
  return;
});

module.exports = router;

