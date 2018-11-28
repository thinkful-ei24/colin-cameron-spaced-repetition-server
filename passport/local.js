const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.js');

const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  User.findOne({ username })
    .then(results => {
      user = results;
      if (!user) {
        return Promise.reject({
          reason: 'login error',
          message: 'incorrect username',
          location: 'username'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'login error',
          message: 'incorrect password',
          location: 'password'
        });
      }
      let editedUser = {username: user.username, id: user._id};
      return done(null, editedUser);
    })
    .catch(err => {
      if(err.reason === 'login error') {
        return done(null, false);
      }
      return done(err);
    });
});

module.exports = localStrategy;
