'use strict';

const express = require('express');
const authRouter = express.Router();

const { User } = require('./models');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');

authRouter.post('/signup', async(req, res, next) => { 
  try {
    let userRecord = await User.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(200).json(output);
  } catch(err) {
    next(err.message);
  }
});

authRouter.post('/signin', basicAuth, async (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const allUsers = await User.findAll({});
  const list = allUsers.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area!');
});


module.exports = authRouter;