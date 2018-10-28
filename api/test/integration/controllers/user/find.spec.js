const supertest = require('supertest');

describe('UserController.find', () => {
  it('should return missing or invalid params error', done => {
    supertest(sails.hooks.http.app)
      .get('/user/test')
      .send()
      .expect(
        400,
        {
          code: 'E_MISSING_OR_INVALID_PARAMS',
          problems: [
            'Invalid "id":\n  · Expecting a number, but got a string.'
          ],
          message:
            'The server could not fulfill this request (`GET /user/test`) due to 1 missing or invalid parameter.  **The following additional tip will not be shown in production**:  Tip: Check your client-side code to make sure that the request data it sends matches the expectations of the corresponding parameters in your server-side route/action.  Also check that your client-side code sends data for every required parameter.  Finally, for programmatically-parseable details about each validation error, `.problems`. '
        },
        done
      );
  });
  it('should return user not found', done => {
    supertest(sails.hooks.http.app)
      .get('/user/0')
      .send()
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
  it('should return user', done => {
    supertest(sails.hooks.http.app)
      .get('/user/1')
      .send()
      .expect(
        200,
        {
          username: 'test1',
          likes: 0
        },
        done
      );
  });
});
