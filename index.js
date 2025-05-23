const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/routes');

const app = express();
app.use(cookieParser());
app.use(helmet());

const allowedOrigins = ["http://localhost:3000", "https://node-crud-2.vercel.app", "https://college-front-end-psi.vercel.app", "https://college-front-l78i7zicj-sharathshankarvs-projects.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);



app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Preflight request success
  }

  next();
});

app.use(bodyParser.json());

app.use('/', routes);

app.listen(4321, () => {
  console.log('Server started on port 4321');
});