const supertest = require('supertest');
const jwt = require('jsonwebtoken');

describe('UserController.me-update-password', () => {
  it('should be protected', done => {
    supertest(sails.hooks.http.app)
      .put('/me/update-password')
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

  it('should update users password', done => {
    supertest(sails.hooks.http.app)
      .put('/me/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: 'test2'
      })
      .expect(204, done);
  });
});
