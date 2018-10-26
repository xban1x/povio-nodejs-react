module.exports = {
  friendlyName: 'Me',

  description: 'The user instance retrieved from Token.',

  inputs: {},

  exits: {
    badRequest: {
      status: 400,
      description: 'Missing user object on request.'
    },
    notFound: {
      status: 404,
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
      const user = await sails.helpers.getUser({
        username: this.req.user.data.username
      });
      return exits.success(user);
    } catch (err) {
      if (err.code === 'notFound') {
        return exits.notFound(err.raw);
      }
      return exits.error(err.raw);
    }
  }
};
