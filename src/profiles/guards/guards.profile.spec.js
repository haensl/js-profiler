const join = require('path').join;
const expect = require('chai').expect;
const guards = require(join(__appRoot, 'src/profiles/guards/guards.profile'));

describe('Guards', () => {
  let data;
  let result;
  beforeEach(() => {
    data = [0, 1, 2, 3, 4, 5];
  });

  guards.functions.forEach((fn) => {
    describe(`${fn.description()}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('should return a boolean', () => {
        expect(typeof result).to.equal('boolean');
      });

      it('should transform the array correctly into booleans', () => {
        expect(result).to.be.true;
      });
    });
  });
});
