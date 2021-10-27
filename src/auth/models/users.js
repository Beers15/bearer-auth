'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
<<<<<<< HEAD
        //Secure the JWT with time expiration option
        return jwt.sign({ username: this.username }, process.env.SECRET, { expiresIn: 60 * 15 } );
=======
        return jwt.sign({ username: this.username }, process.env.SECRET);
>>>>>>> e67c676def97381e426239d94635f1f0f4e17e21
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
<<<<<<< HEAD
=======

>>>>>>> e67c676def97381e426239d94635f1f0f4e17e21
    const user = await this.findOne({where: { username: username }});
    const valid = await bcrypt.compare(password, user.password);
    if(valid) { 
      return user; 
    }
<<<<<<< HEAD
=======

>>>>>>> e67c676def97381e426239d94635f1f0f4e17e21
    throw new Error('Invalid User');
  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if(user) { 
        return user; 
      }
    } catch(err) {
      throw new Error(err.message);
    }
  };

  return model;
};

module.exports = userSchema;