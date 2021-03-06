const expect = require('chai').expect;
const mapCreation = require('./');

describe('Object literal vs. Map creation', () => {
  let result;
  let data;

  beforeEach(() => {
    data = [0, 1, 2, 3, 4, 5];
  });

  mapCreation.functions.forEach((fn) => {
    describe(`${fn.description}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('returns the created object or retrieved value', () => {
        expect(typeof result).to.equal('object');
      });

      it('contains as many entries as datapoints were supplied', () => {
        if (result instanceof Map) {
          expect(result.size).to.equal(data.length);
        } else {
          expect(Object.keys(result).length).to.equal(data.length);
        }
      });
    });
  });
});
