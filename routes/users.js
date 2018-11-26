const mongoose = require('mongoose');
const User = require('../models/users.js');
const express = require('express');
const router = express.Router();

/* ================ POST creates a new user ==================== */

router.post('/', (req, res, next) => {

  const {username, password} = req.body;

  User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
      };
      return User.create(newUser);
    })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;
