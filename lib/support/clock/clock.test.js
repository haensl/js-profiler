const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const clock = require('./');

chai.use(require('sinon-chai'));

describe('Clock', () => {
  describe('time', () => {
    describe('when timing a function', () => {
      let fn;
      let t;
      beforeEach((done) => {
        fn = sinon.spy();
        clock.time(fn)
          .then((time) => {
            t = time;
            done();
          });
      });

      it('executes the function', () => {
        expect(fn.called).to.be.true;
      });

      it('returns the time it took to execute the function in high resolution format', () => {
        expect(typeof t).to.eql('number');
      });

      describe('and not supplying a function', () => {
        let error;

        beforeEach((done) => {
          clock.time()
            .catch((err) => {
              error = err;
              done();
            });
        });

        it('rejects with an error', () => {
          expect(error instanceof Error).to.be.true;
        });
      });
    });
  });
});
