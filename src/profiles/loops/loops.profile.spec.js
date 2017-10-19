'use strict';

const join = require('path').join;
const expect = require('chai').expect;
const loops = require(join(__appRoot, 'src/profiles/loops/loops.profile'));

describe('Loops', () => {
  let result;
  let data;
  beforeEach(() => {
    data = [0, 1, 2, 3, 4, 5];
  });

  loops.functions.forEach((fn) => {
    describe(`${fn.description()}`, () => {
      beforeEach(() => {
        result = fn.f(data);
      });

      it('should return an array', () => {
        expect(Array.isArray(result)).to.be.true;
      });

      it('should return an array of booleans', () => {
        result.forEach((val) => {
          expect(val).to.be.a('boolean');
        });
      });

      it('should transform the integers correctly into booleans', () => {
        expect(result).to.eql([false, false, false, false, true, false]);
      });
    });
  });
});
