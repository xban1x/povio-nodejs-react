module.exports = {
  friendlyName: 'Get user',

  description: 'Gets the user based on params',

  inputs: {
    search: {
      type: 'json',
      description: 'Search criteria.'
    }
  },

  exits: {
    success: {
      outputFriendlyName: 'User',
      outputType: 'ref'
    },
    notFound: {
      status: 404,
      description: 'Could not find user.'
    }
  },

  fn: async function(inputs, exits) {
    const user = await User.findOne(inputs.search);
    if (!user) {
      return exits.notFound({
        code: 'E_USER_NOT_FOUND',
        problems: `User not found.`,
        message: 'User not found.'
      });
    }
    return exits.success(user);
  }
};
