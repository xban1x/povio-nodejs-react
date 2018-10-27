const supertest = require('supertest');
const jwt = require('jsonwebtoken');

describe('UserController.unlike', () => {
  it('should be protected', done => {
    supertest(sails.hooks.http.app)
      .delete('/user/2/unlike')
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

  before('like the user to satisfy test requirements', async () => {
    await User.addToCollection(1, 'liked', 2);
    return;
  });

  it('should return user not found', done => {
    supertest(sails.hooks.http.app)
      .delete('/user/50/unlike')
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

  it('should not allow user to unlike itself', done => {
    supertest(sails.hooks.http.app)
      .delete('/user/1/unlike')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(
        400,
        {
          code: 'E_UNLIKE_SELF',
          problems: `User cannot unlike it self.`,
          message: `User cannot unlike it self.`
        },
        done
      );
  });

  it('should unlike user', done => {
    supertest(sails.hooks.http.app)
      .delete('/user/2/unlike')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(204, done);
  });

  it(`should not allow user to unlike user who he hasn't liked`, done => {
    supertest(sails.hooks.http.app)
      .delete('/user/2/unlike')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(
        400,
        {
          code: 'E_USER_NOT_LIKED',
          problems: `User not liked.`,
          message: `User not liked.`
        },
        done
      );
  });

  after('reset the database', async () => {
    await User.removeFromCollection(1, 'liked', 2);
    return;
  });
});
