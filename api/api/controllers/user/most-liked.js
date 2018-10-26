module.exports = {
  friendlyName: 'Most liked',

  description: 'Most liked users.',

  inputs: {},

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
    try {
      const users = await User.find().populate('likedBy');
      const response = users
        .sort((a, b) => a.likedBy.length < b.likedBy.length)
        .map(val => val.username);
      return exits.success(response);
    } catch (err) {
      return exits.error({ err });
    }
  }
};
