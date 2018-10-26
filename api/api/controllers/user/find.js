module.exports = {
  friendlyName: 'Find',

  description: 'Find a certain user.',

  inputs: {
    id: {
      type: 'number',
      description: 'ID of the user to find.',
      required: true
    }
  },

  exits: {
    success: {
      statusCode: 200
    },
    badRequest: {
      status: 400,
      description: 'Missing user object on request.'
    }
  },

  fn: async function(inputs, exits) {
    const id = inputs.id;
    try {
      const user = await User.findOne({ id }).populate('likedBy');
      if (!user) {
        return exits.badRequest({
          code: 'E_USER_NOT_FOUND',
          problems: `User to like not found.`,
          message: `User to like not found.`
        });
      }
      return exits.success({
        username: user.username,
        likes: user.likedBy.length
      });
    } catch (err) {
      return exits.error({ err });
    }
  }
};
