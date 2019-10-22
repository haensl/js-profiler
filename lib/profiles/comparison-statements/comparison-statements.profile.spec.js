const expect = require('chai').expect;
const comparisonStatements = require('./');

describe('Comparison statements', () => {
  let result;
  let data;

  describe('data: 0', () => {
    beforeEach(() => {
      data = 0;
    });

    comparisonStatements.functions.forEach((fn) => {
      describe(`${fn.description}`, () => {
        beforeEach(() => {
          result = fn.f(data);
        });

        it('returns 0', () => {
          expect(result).to.equal(0);
        });
      });
    });
  });

  describe('data: 2', () => {
    beforeEach(() => {
      data = 2;
    });

    comparisonStatements.functions.forEach((fn) => {
      describe(`${fn.description}`, () => {
        beforeEach(() => {
          result = fn.f(data);
        });

        it('returns 0', () => {
          expect(result).to.equal(1);
        });
      });
    });
  });
});
