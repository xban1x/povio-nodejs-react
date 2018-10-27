const supertest = require('supertest');

describe('UserController.most-liked', () => {
  before('like users to adjust ordering', async () => {
    await User.addToCollection(1, 'liked', [2, 3]);
    await User.addToCollection(2, 'liked', [3]);
    return;
  });

  it('should return array of users sorted by likes', done => {
    supertest(sails.hooks.http.app)
      .get('/most-liked')
      .send()
      .expect(200, ['test3', 'test2', 'test1', 'test4'], done);
  });

  after('like users to adjust ordering', async () => {
    await User.addToCollection(1, 'liked', [2, 3]);
    await User.addToCollection(2, 'liked', [3]);
    return;
  });
});
