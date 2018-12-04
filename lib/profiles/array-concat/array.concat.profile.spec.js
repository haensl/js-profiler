const expect = require('chai').expect;
const concats = require('./');

describe('Array concatenation', () => {
  let result;
  let data;

  beforeEach(() => {
    data = [[0, 1, 2], [3, 4, 5]];
  });

  concats.functions.forEach((fn) => {
    describe(`${fn.description}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('returns an array', () => {
        expect(Array.isArray(result)).to.be.true;
      });

      it('concatenates the given data with another array', () => {
        expect(result[0]).to.equal(0);
        expect(result[1]).to.equal(1);
        expect(result[2]).to.equal(2);
        expect(result[3]).to.equal(3);
        expect(result[4]).to.equal(4);
        expect(result[5]).to.equal(5);
      });
    });
  });
});
