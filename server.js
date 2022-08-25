const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const logResponseBody = require('./middlewares/logger');
const routes = require('./routes');
require('./db/database');

const PORT = process.env.PORT || 3001;

console.log('[setup] using environment', process.env.NODE_ENV);

require('dotenv').config(
  process.env.NODE_ENV === 'heroku'
    ? {}
    : {
        path: path.join(
          __dirname,
          process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`
        ),
      }
);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.get(['/'], (req, res) => {
  res.json({ message: 'ok' });
});

app.use(routes());
app.use(errorHandler.all);
app.use(logResponseBody.all);

server.listen(PORT, function () {
  console.log(`[setup] app started on port ${PORT}`);
});
