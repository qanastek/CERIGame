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

    var id = req.params.id

    console.log("Reach the /quizz/themes/ endpoint: " + id);

    MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

        if(err) {return console.log('erreur connexion base de données'); }

        if(db) {

            var dbo = db.db("db");

            dbo.collection("quizz").find({_id: new mongo.ObjectID(id)},{projection:{ quizz: 1 }}).toArray(function(err, result) {

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

module.exports = router;

