module.exports = {
  friendlyName: 'Me',

  description: 'The user instance retrieved from Token.',

  inputs: {
    password: {
      type: 'string',
      description: 'New password'
    }
  },

  exits: {
    success: {
      statusCode: 204
    },
    badRequest: {
      statusCode: 400,
      description: 'Missing user object on request.'
    },
    notFound: {
      statusCode: 404,
      description: 'User data not found.'
    }
  },

  fn: async function(inputs, exits) {
    if (!this.req.user) {
      return exits.badRequest({
        code: 'E_REQUEST_USER_MISSING',
        problems: `User information missing from request.`,
        problems: `User information missing from request.`
      });
    }
    try {
      const { id } = await sails.helpers.getUser({
        username: this.req.user.data.username
      });
      await User.update(id, { password: inputs.password }).fetch();
      return exits.success();
    } catch (err) {
      if (err.code === 'notFound') {
        return exits.notFound(err.raw);
      }
      return exits.error(err.raw);
    }
  }
};
