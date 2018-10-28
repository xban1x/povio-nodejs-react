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
      .expect(
        200,
        [
          { id: 3, username: 'test3', likes: 2 },
          { id: 2, username: 'test2', likes: 1 },
          { id: 1, username: 'test1', likes: 0 },
          { id: 4, username: 'test4', likes: 0 }
        ],
        done
      );
  });

  after('like users to adjust ordering', async () => {
    await User.addToCollection(1, 'liked', [2, 3]);
    await User.addToCollection(2, 'liked', [3]);
    return;
  });
});
