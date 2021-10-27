'use strict';

const { User } = require('../models/index.js');

module.exports = async (req, res, next) => {
  try {
    if(!req.headers.authorization) { 
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await User.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (err) {
<<<<<<< HEAD
    console.log('Error when decoding Authorization (Bearer) header: ', err);
=======
>>>>>>> e67c676def97381e426239d94635f1f0f4e17e21
    res.status(403).send('Invalid Login');
  }
};