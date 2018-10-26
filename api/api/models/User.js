/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    liked: {
      collection: 'user',
      via: 'likedBy'
    },
    likedBy: {
      collection: 'user',
      via: 'liked'
    }
  },

  customToJSON: function() {
    return _.omit(this, ['password']);
  },

  verifyPassword: async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword);
  },

  beforeCreate: async (values, proceed) => {
    const hash = await bcrypt.hash(values.password, 10);
    values.password = hash;
    proceed();
  },

  beforeUpdate: async (values, proceed) => {
    if (!values.password) {
      proceed();
      return;
    }
    const hash = await bcrypt.hash(values.password, 10);
    values.password = hash;
    proceed();
  }
};
