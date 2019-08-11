const chai = require('chai');
const expect = chai.expect;
const arraySupport = require('./');

describe('Array support', () => {
  describe('unique', () => {
    describe('called with array of unique values', () => {
      it('returns the same array', () => {
        expect(arraySupport.unique([1, 'a', 'b'])).to.have.deep.members([1, 'a', 'b']);
      });
    });

    describe('called with array of duplicate values', () => {
      it('returns an array of unique values', () => {
        expect(arraySupport.unique([1, 'b', 1, 'a', 'b']))
          .to.have.deep.members([1, 'a', 'b']);
      });
    });
  });
});
