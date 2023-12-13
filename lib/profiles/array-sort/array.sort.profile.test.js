const expect = require('chai').expect;
const sorts = require('./');

describe('Array sort', () => {
  let result;
  let data;

  sorts.functions.forEach((fn) => {
    describe(fn.description, () => {

      it(`sorts the array using ${fn.description}`, () => {
        switch (fn) {
          case sorts.functions[0]:
            data = [[4, 3, 5, 2, 1, 0]];
            result = fn.f(data);
            expect(result).to.eql([0, 1, 2, 3, 4, 5]); // Expected result for integers
            break;
          case sorts.functions[1]:
            data = [[4.0, 3.0, 5.0, 2.0, 1.0, 0]];
            result = fn.f(data);
            expect(result).to.eql([0, 1.0, 2.0, 3.0, 4.0, 5.0]); // Expected result for floats
            break;
          case sorts.functions[2]:
            data = [['4', '3', '5', '2', '1', '0']];
            result = fn.f(data);
            expect(result).to.eql(['0', '1', '2', '3', '4', '5']); // Expected result for strings
            break;
          default:
            throw new Error('Invalid function');
        }
      });
    });
  });
});
