const expect = require('chai').expect;
const copiers = require('./');

describe('Array shallow copying', () => {
  let result;
  let data;

  beforeEach(() => {
    data = [0, 1, 2, 3, 4, 5];
  });

  copiers.functions.forEach((fn) => {
    describe(`${fn.description}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('returns an array', () => {
        expect(result).to.be.an('array');
      });
      
      it('does not return the same reference it is passed', () => {
        expect(result).to.not.equal(data);
      });
      
      it('does not alter the original array', () => {
        expect(data).to.deep.equal([0, 1, 2, 3, 4, 5]);
      });

      it('copies the array', () => {
        expect(result).to.deep.equal(data);
      });
    });
  });
});
