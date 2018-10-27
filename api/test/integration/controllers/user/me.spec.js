const supertest = require('supertest');
const jwt = require('jsonwebtoken');

describe('UserController.me', () => {
  it('should be protected', done => {
    supertest(sails.hooks.http.app)
      .get('/me')
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

  it('should return user information', done => {
    supertest(sails.hooks.http.app)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200, done);
  });
});
