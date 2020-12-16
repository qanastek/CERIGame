// app.js test
require('dotenv').config();

const express = require('express')
const app = express();

var path = require('path');

// Read from environment or from 3223
var PORT = process.env.PORT || 3223;

// Set the default port
app.set('port', PORT);

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Pass to next layer of middleware
  next();
});

var loginRouter = require('./Controllers/login.js');
app.use('/', loginRouter);

var quizzRouter = require('./Controllers/quizz.js');
app.use('/quizz', quizzRouter);

var usersRouter = require('./Controllers/users.js');
app.use('/users', usersRouter);

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PSQL_USERNAME,
    host: process.env.PSQL_IP,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
})

// Root
app.get('/', (req, res) => {  
  res.status(200);
  res.send({
    greeting: 'Hello World!'
  });
});

// CSS
app.get('/stylesheet.css', function(req, res) {

  const styles = path.resolve(__dirname, 'Vues/stylesheet.css');
  
  res.contentType("text/css");
  res.sendFile(styles);
});

// Handle the error 404
app.get('*', (req, res) => {
  res.status(404);
  res.send({
    error: 'Not found'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

let socketIO = require('socket.io');

// // Socket setup
const io = socketIO(server, {
  transports: ['websocket']
});

//make socket io accessible for other modules
module.exports.io = io;

io.on("connection", function (socket) {

  console.log('a user connected');
  console.log('Socket id is :' + socket.id);

  socket.emit("hello", {
    "test": 1234
  });
  
  socket.on('test', () => {
    console.log('test websocket');
    socket.emit('Hello!');
  });
  
  // // Fetch the TOP 10
  // var sql = `
  //   SELECT
  //     identifiant as user,
  //     avatar,
  //     SUM(score) as score,
  //     COUNT(*) as games_nbr
  //   FROM
  //     fredouil.historique
  //   JOIN
  //     fredouil.users
  //   ON
  //     id_user = fredouil.users.id
  //   GROUP BY
  //     identifiant,
  //     avatar
  //   ORDER BY
  //     score
  //     DESC
  //   LIMIT
  //     10
  //   ;
  // `;
  // setInterval(() => {

  //   pool.query(sql, [], (error, results) => {

  //     if (error) {
  //       console.log("query history");
  //       console.log(error);
  //       return;
  //     }

  //     socket.emit('top10', results.rows);
  //   });

  // }, 10000);

  // io.to().emit('sendDefi', {
  //   mess
  // });
});