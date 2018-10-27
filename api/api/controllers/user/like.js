module.exports = {
  friendlyName: 'Like',

  description: 'Like a certain user.',

  inputs: {
    id: {
      type: 'number',
      description: 'ID of the user to like',
      required: true
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
      description: 'Could not find user.'
    }
  },

  fn: async function(inputs, exits) {
    if (!this.req.user) {
      return exits.badRequest({
        code: 'E_REQUEST_USER_MISSING',
        problems: `User information missing from request.`,
        message: `User information missing from request.`
      });
    }
    const userId = this.req.user.data.id;
    const userToLikeId = inputs.id;
    if (userId === userToLikeId) {
      return exits.badRequest({
        code: 'E_LIKE_SELF',
        problems: `User cannot like it self.`,
        message: `User cannot like it self.`
      });
    }
    try {
      await sails.helpers.getUser({ id: inputs.id });
      const { liked } = await User.findOne({ id: userId }).populate('liked', {
        id: userToLikeId
      });
      if (liked.length === 1) {
        return exits.badRequest({
          code: 'E_USER_ALREADY_LIKED',
          problems: `User already liked.`,
          message: `User already liked.`
        });
      }
      await User.addToCollection(userId, 'liked', userToLikeId);
      return exits.success();
    } catch (err) {
      if (err.code === 'notFound') {
        return exits.notFound(err.raw);
      }
      return exits.error(err.raw);
    }
  }
};
