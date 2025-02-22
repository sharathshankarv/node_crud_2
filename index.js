const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./src/routes/routes');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(4321, () => {
  console.log('Server started on port 4321');
});