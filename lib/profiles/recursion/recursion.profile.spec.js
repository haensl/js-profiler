const expect = require('chai').expect;
const recursions = require('./');

describe('Recursion', () => {
  let result;
  let data;
  beforeEach(() => {
    data = [0, 1, 2, 3, 4, 5];
  });

  recursions.functions.forEach((fn) => {
    describe(`${fn.description.short}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('should return an integer', () => {
        expect(typeof result).to.eql('number');
        expect(parseInt(result, 10)).to.eql(result);
      });

      it('should calculate the sum of the integers in the given array', () => {
        expect(result).to.eql(15);
      });
    });
  });
});
