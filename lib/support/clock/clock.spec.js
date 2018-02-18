const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const clock = requireModule('lib/support/clock');

chai.use(require('sinon-chai'));

describe('Clock', () => {
  describe('time', () => {
    describe('when timing a function', () => {
      let fn;
      let t;
      beforeEach(() => {
        fn = sinon.spy();
        t = clock.time(fn);
      });

      it('should execute the function', () => {
        expect(fn.called).to.be.true;
      });

      it('should return the time it took to execute the function in high resolution format', () => {
        expect(Array.isArray(t)).to.be.true;
        t.forEach((item) => {
          expect(typeof item).to.eql('number');
        });
      });

      describe('and not supplying a function', () => {
        it('should throw an exception', () => {
          expect(clock.time).to.throw(Error);
        });
      });
    });
  });
});
