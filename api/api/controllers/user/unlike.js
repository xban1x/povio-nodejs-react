module.exports = {
  friendlyName: 'Unlike',

  description: 'Unlike a certain user.',

  inputs: {
    id: {
      type: 'number',
      description: 'ID of the user to unlike',
      required: true
    }
  },

  exits: {
    success: {
      statusCode: 204
    },
    badRequest: {
      status: 400,
      description: 'Missing user object on request.'
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
    const userToUnlikeId = inputs.id;
    if (userId === userToUnlikeId) {
      return exits.badRequest({
        code: 'E_UNLIKE_SELF',
        problems: `User cannot like it self.`,
        message: `User cannot like it self.`
      });
    }
    try {
      const { liked } = await User.findOne({ id: userId }).populate('liked', {
        id: userToUnlikeId
      });
      if (liked.length === 0) {
        return exits.badRequest({
          code: 'E_USER_NOT_LIKED',
          problems: `User not liked.`,
          message: `User not liked.`
        });
      }
      await User.removeFromCollection(userId, 'liked', userToUnlikeId);
      return exits.success();
    } catch (err) {
      return exits.error(err.raw);
    }
  }
};
