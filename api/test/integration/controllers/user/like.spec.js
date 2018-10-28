const supertest = require('supertest');
const jwt = require('jsonwebtoken');

describe('UserController.like', () => {
  it('should be protected', done => {
    supertest(sails.hooks.http.app)
      .put('/user/2/like')
      .send()
      .expect(401, done);
  });

  let token;

  before('create token which expires in 1 minute', async () => {
    token = jwt.sign(
      {
        data: await User.findOne({ username: 'test1' })
      },
      sails.config.secret,
      { expiresIn: 60 }
    );
    return;
  });

  it('should return user not found', done => {
    supertest(sails.hooks.http.app)
      .put('/user/50/like')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(
        404,
        {
          code: 'E_USER_NOT_FOUND',
          problems: `User not found.`,
          message: 'User not found.'
        },
        done
      );
  });

  it('should not allow user to like itself', done => {
    supertest(sails.hooks.http.app)
      .put('/user/1/like')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(
        400,
        {
          code: 'E_LIKE_SELF',
          problems: `User cannot like it self.`,
          message: `User cannot like it self.`
        },
        done
      );
  });

  it('should like user', done => {
    supertest(sails.hooks.http.app)
      .put('/user/2/like')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(204, done);
  });

  it('should not allow user to like same user multiple times', done => {
    supertest(sails.hooks.http.app)
      .put('/user/2/like')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(
        400,
        {
          code: 'E_USER_ALREADY_LIKED',
          problems: `User already liked.`,
          message: `User already liked.`
        },
        done
      );
  });

  after('reset the database', async () => {
    await User.removeFromCollection(1, 'liked', 2);
    return;
  });
});
