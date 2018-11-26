'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//authentication imports
const passport = require('passport');
const jwtStrategy = require('./passport/jwt.js');
const localStrategy = require('./passport/local.js');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//configure app to use jwt tokens to authenticate users
passport.use(localStrategy);
passport.use(jwtStrategy);

// parse request body
app.use(express.json());

// mounted routers
app.use('/api/login', authRouter);
app.use('/api/users', usersRouter);



//Custom error handler
app.use((err, req, res, next) => {
  if(err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
