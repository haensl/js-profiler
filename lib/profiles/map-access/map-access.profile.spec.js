const expect = require('chai').expect;
const mapAccess = require('./');

describe('Object literal vs. Map access', () => {
  let result;
  let data;
  
  beforeEach(() => {
    data = {
      objectMap: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        size: 6
      },
      map: new Map([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5]
      ])
    };
  });

  mapAccess.functions.forEach((fn) => {
    describe(`${fn.description.short}`, () => {
      beforeEach(() => {
        result = fn.f(data[fn.testDataType]);
      });

      it('should return retrieved value', () => {
        expect(typeof result).to.equal('number');
      });
    });
  });
});
