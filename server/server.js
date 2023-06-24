const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/welcome', (req, res) => {
  res.send('Welcome to the server!');
});

app.post('/favorites', (req, res) => {
  const country = req.body.country;

  if (favorites.includes(country)) {
    favorites = favorites.filter((fav) => fav !== country);
  } else {
    favorites.push(country);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
