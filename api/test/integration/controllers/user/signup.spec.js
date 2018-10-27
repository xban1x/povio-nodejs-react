const supertest = require('supertest');

describe('UserController.signup', () => {
  describe('should return missing or invalid params error', () => {
    it('for username', done => {
      supertest(sails.hooks.http.app)
        .post('/signup')
        .send({
          password: 'test1'
        })
        .expect(
          400,
          {
            code: 'E_MISSING_OR_INVALID_PARAMS',
            problems: ['"username" is required, but it was not defined.'],
            message:
              'The server could not fulfill this request (`POST /signup`) due to 1 missing or invalid parameter.  **The following additional tip will not be shown in production**:  Tip: Check your client-side code to make sure that the request data it sends matches the expectations of the corresponding parameters in your server-side route/action.  Also check that your client-side code sends data for every required parameter.  Finally, for programmatically-parseable details about each validation error, `.problems`. '
          },
          done
        );
    });

    it('for password', done => {
      supertest(sails.hooks.http.app)
        .post('/signup')
        .send({
          username: 'test1'
        })
        .expect(
          400,
          {
            code: 'E_MISSING_OR_INVALID_PARAMS',
            problems: ['"password" is required, but it was not defined.'],
            message:
              'The server could not fulfill this request (`POST /signup`) due to 1 missing or invalid parameter.  **The following additional tip will not be shown in production**:  Tip: Check your client-side code to make sure that the request data it sends matches the expectations of the corresponding parameters in your server-side route/action.  Also check that your client-side code sends data for every required parameter.  Finally, for programmatically-parseable details about each validation error, `.problems`. '
          },
          done
        );
    });
  });

  it('should return username already taken', done => {
    const data = {
      username: 'test1',
      password: 'test1'
    };
    supertest(sails.hooks.http.app)
      .post('/signup')
      .send(data)
      .expect(
        409,
        {
          code: 'E_USERNAME_TAKEN',
          problems: `Username \"${data.username}\" is already taken.`,
          message: 'Username is already taken.'
        },
        done
      );
  });

  it('should return token', done => {
    const data = {
      username: 'test6',
      password: 'test6'
    };
    supertest(sails.hooks.http.app)
      .post('/signup')
      .send(data)
      .expect(201)
      .then(res => {
        if (!res.body.id) {
          throw new Error('Missing "id" property.');
        }
        if (!res.body.username) {
          throw new Error('Missing "username" property.');
        }
        if (res.body.username !== data.username) {
          throw new Error(`Usernames don't match.`);
        }
        return done();
      });
  });
});
