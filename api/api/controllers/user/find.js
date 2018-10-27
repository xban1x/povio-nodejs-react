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
    notFound: {
      statusCode: 404,
      description: 'Missing user object on request.'
    }
  },

  fn: async function(inputs, exits) {
    const id = inputs.id;
    try {
      const user = await User.findOne({ id }).populate('likedBy');
      if (!user) {
        return exits.notFound({
          code: 'E_USER_NOT_FOUND',
          problems: `User not found.`,
          message: `User not found.`
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
