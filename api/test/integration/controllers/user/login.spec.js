const supertest = require('supertest');

describe('UserController.login', () => {
  describe('should return missing or invalid params error', () => {
    it('for username', done => {
      supertest(sails.hooks.http.app)
        .post('/login')
        .send({
          password: 'test1'
        })
        .expect(
          400,
          {
            code: 'E_MISSING_OR_INVALID_PARAMS',
            problems: ['"username" is required, but it was not defined.'],
            message:
              'The server could not fulfill this request (`POST /login`) due to 1 missing or invalid parameter.  **The following additional tip will not be shown in production**:  Tip: Check your client-side code to make sure that the request data it sends matches the expectations of the corresponding parameters in your server-side route/action.  Also check that your client-side code sends data for every required parameter.  Finally, for programmatically-parseable details about each validation error, `.problems`. '
          },
          done
        );
    });

    it('for password', done => {
      supertest(sails.hooks.http.app)
        .post('/login')
        .send({
          username: 'test1'
        })
        .expect(
          400,
          {
            code: 'E_MISSING_OR_INVALID_PARAMS',
            problems: ['"password" is required, but it was not defined.'],
            message:
              'The server could not fulfill this request (`POST /login`) due to 1 missing or invalid parameter.  **The following additional tip will not be shown in production**:  Tip: Check your client-side code to make sure that the request data it sends matches the expectations of the corresponding parameters in your server-side route/action.  Also check that your client-side code sends data for every required parameter.  Finally, for programmatically-parseable details about each validation error, `.problems`. '
          },
          done
        );
    });
  });

  it('should return user not found', done => {
    supertest(sails.hooks.http.app)
      .post('/login')
      .send({
        username: 'test',
        password: 'test'
      })
      .expect(
        404,
        {
          code: 'E_USER_NOT_FOUND',
          problems: `User not found.`,
          message: `User not found.`
        },
        done
      );
  });

  it('should return wrong password', done => {
    supertest(sails.hooks.http.app)
      .post('/login')
      .send({
        username: 'test1',
        password: 'test'
      })
      .expect(
        400,
        {
          code: 'E_WRONG_PASSWORD',
          problems:
            'Password "test" is incorrect for User with username "test1"',
          message: 'Wrong password.'
        },
        done
      );
  });

  it('should return token', done => {
    supertest(sails.hooks.http.app)
      .post('/login')
      .send({
        username: 'test1',
        password: 'test1'
      })
      .expect(200)
      .then(res => {
        if (!res.body.user) {
          throw new Error('Missing user property.');
        }
        if (!res.body.user.username) {
          throw new Error('User missing username property.');
        }
        if (!res.body.user.liked) {
          throw new Error('User missing liked property.');
        }
        if (!res.body.token) {
          throw new Error('Missing token property.');
        }
        return done();
      });
  });
});
