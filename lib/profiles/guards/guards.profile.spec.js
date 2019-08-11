const expect = require('chai').expect;
const guards = require('./');

describe('Guards', () => {
  let data;
  let result;
  beforeEach(() => {
    data = {
      num: 1,
      arr: [],
      str: 'abc',
      fn: () => 1
    };
  });

  guards.functions.forEach((fn) => {
    describe(`${fn.description}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('returns a boolean', () => {
        expect(typeof result).to.equal('boolean');
      });

      it('transforms the array correctly into booleans', () => {
        if (fn.codeSample === '!var'
         || fn.codeSample === 'Array.isArray(d)'
         || /typeof d === (?!'object')/.test(fn.codeSample)
         || /^Number.isNaN/.test(fn.codeSample)
         || /^!isNaN/.test(fn.codeSample)
         || /typeof d == (?!'object')/.test(fn.codeSample)) {
          expect(result).to.be.false;
        } else {
          expect(result).to.be.true;
        }
      });
    });
  });
});
