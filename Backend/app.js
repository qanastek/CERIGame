require('dotenv').config();

const express = require('express')
const app = express();

var path = require('path');

// Read from environement or from 3000
var PORT = process.env.PORT || 3000;

// Set the default port
app.set('port', PORT);

var carsRouter = require('./routes/cars');
app.use('/cars', carsRouter);

var loginRouter = require('./routes/login.js');
app.use('/login', loginRouter);

// Root
app.get('/', (req, res) => {  
  res.status(200);
  res.send({
    greeting: 'Hello World!'
  });
});

// CSS
app.get('/stylesheet.css', function(req, res) {

  const styles = path.resolve(__dirname, 'public/vues/stylesheet.css');
  
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});