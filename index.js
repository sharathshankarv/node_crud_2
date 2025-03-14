const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db');
const routes = require('./src/routes/routes');

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(bodyParser.json());

app.use('/', routes);

app.listen(4321, () => {
  console.log('Server started on port 4321');
});