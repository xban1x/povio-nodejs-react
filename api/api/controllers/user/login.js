const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Login',

  description: 'Login user.',

  inputs: {
    username: {
      type: 'string',
      example: 'JohnDoe',
      description: 'Username',
      required: true
    },
    password: {
      type: 'string',
      description: 'Password',
      required: true
    }
  },

  exits: {
    wrongPassword: {
      statusCode: 400,
      description: 'Wrong password.'
    },
    notFound: {
      statusCode: 404,
      description: 'Could not find user.'
    }
  },

  fn: async function(inputs, exits) {
    try {
      const user = await sails.helpers.getUser({ username: inputs.username });
      const valid = await User.verifyPassword(inputs.password, user.password);
      if (!valid) {
        return exits.wrongPassword({
          code: 'E_WRONG_PASSWORD',
          problems: `Password "${
            inputs.password
          }" is incorrect for User with username "${inputs.username}"`,
          message: 'Wrong password.'
        });
      }
      const token = jwt.sign(
        {
          data: user
        },
        sails.config.secret,
        { expiresIn: 30 * 60 * 60 }
      );
      return exits.success({
        user,
        token
      });
    } catch (err) {
      if (err.code === 'notFound') {
        return exits.notFound(err.raw);
      }
      return exits.error(err.raw);
    }
  }
};
