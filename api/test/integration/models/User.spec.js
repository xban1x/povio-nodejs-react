const bcrypt = require('bcrypt');

describe('User (model)', () => {
  describe('#verifyPassword()', () => {
    it('should return true', async () => {
      const password = 'test';
      const encryptedPassword = await bcrypt.hash(password, sails.config.salt);
      const valid = await User.verifyPassword(password, encryptedPassword);
      if (!valid) {
        throw new Error('Returns false!');
      }
      return;
    });
    it('should return false', async () => {
      const password = 'test';
      const encryptedPassword = await bcrypt.hash(
        password + 'error',
        sails.config.salt
      );
      const valid = await User.verifyPassword(password, encryptedPassword);
      if (valid) {
        throw new Error('Returns true!');
      }
      return;
    });
  });
  describe('#beforeCreate()', () => {
    it('should return "Missing password."', async () => {
      const values = {
        username: 'test'
      };
      return new Promise((resolve, reject) => {
        User.beforeCreate(values, error => {
          if (error !== 'Missing password.') {
            reject('Wrong result: ' + error);
            return;
          }
          resolve();
          return;
        });
      });
    });
    it('should modify object with encryped password', async () => {
      const password = 'test';
      const values = {
        username: 'test',
        password: password
      };
      return new Promise((resolve, reject) => {
        User.beforeCreate(values, () => {
          if (!bcrypt.compareSync(password, values.password)) {
            reject('Passwords do not match.');
            return;
          }
          resolve();
          return;
        });
      });
    });
  });
  describe('#beforeUpdate()', () => {
    it('should return unmodified input', async () => {
      const originalValues = {
        username: 'test'
      };
      const values = { ...originalValues };
      return new Promise((resolve, reject) => {
        User.beforeUpdate(values, () => {
          if (!_.isEqual(values, originalValues)) {
            reject('Input was modified.');
            return;
          }
          resolve();
          return;
        });
      });
    });
    it('should modify object with encryped password', async () => {
      const password = 'test';
      const values = {
        username: 'test',
        password: password
      };
      return new Promise((resolve, reject) => {
        User.beforeUpdate(values, () => {
          if (!bcrypt.compareSync(password, values.password)) {
            reject('Passwords do not match.');
            return;
          }
          resolve();
          return;
        });
      });
    });
  });
});
