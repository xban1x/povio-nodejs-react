module.exports = {
  friendlyName: 'Sign Up',

  description: 'Sign Up user.',

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
    success: {
      statusCode: 201
    },
    usernameTaken: {
      statusCode: 409,
      description: 'Username is already taken.'
    }
  },

  fn: async function(inputs, exits) {
    const username = inputs.username;
    const password = inputs.password;
    try {
      const exists = await User.findOne({ username });
      if (exists) {
        return exits.usernameTaken({
          code: 'E_USERNAME_TAKEN',
          problems: `Username "${username}" is already taken.`,
          message: 'Username is already taken.'
        });
      }
      const user = await User.create({ username, password }).fetch();
      return exits.success(user);
    } catch (err) {
      return exits.error(err);
    }
  }
};
