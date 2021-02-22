// Express Server
// FIX ME :(
  const express = require('express');
  const path = require('path');
  const morgan = require('morgan');
  const bodyparser = require('body-parser');
  const cors = require('cors');
  const router = require('./router');
  const port = 3000;

  const server = express();

  server.use(cors());
  server.use(morgan('dev'));
  server.use(bodyparser.json());
  server.use('/', express.static(path.join(__dirname + '/../client/dist')));
  server.use('/name', router);

  server.listen(port, () => console.log('Connected to port: 3000'))