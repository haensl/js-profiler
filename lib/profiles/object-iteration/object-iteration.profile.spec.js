const expect = require('chai').expect;
const objectIteration = require('./');

describe('Object iteration', () => {
  let data;
  let result;

  beforeEach(() => {
    data = {
      object: {
        num: 1,
        arr: [],
        str: 'abc'
      },
      map: new Map([
        ['num', 1],
        ['arr', []],
        ['str', 'abc']
      ])
    };
  });

  objectIteration.functions.forEach((fn) => {
    describe(`${fn.description}`, () => {
      beforeEach(() => {
        const testDataType = fn.testDataType
          ? fn.testDataType
          : objectIteration.testDataType;
        result = fn.f(data[testDataType]);
      });

      it('should return a string', () => {
        expect(typeof result).to.equal('string');
      });

      it('should return a concatenation of the property names of the given data object', () => {
        expect(result).to.equal('numarrstr');
      });
    });
  });
});
