const expect = require('chai').expect;
const guards = require('./');

describe('Guards', () => {
  let data;
  let result;
  beforeEach(() => {
    data = {
      num: 1,
      arr: [],
      str: 'abc'
    };
  });

  guards.functions.forEach((fn) => {
    describe(`${fn.description}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('should return a boolean', () => {
        expect(typeof result).to.equal('boolean');
      });

      it('should transform the array correctly into booleans', () => {
        if (fn.description === '!var'
             || fn.description === 'Array.isArray'
             || fn.description === 'typeof === type') {
          expect(result).to.be.false;
        } else {
          expect(result).to.be.true;
        }
      });
    });
  });
});
