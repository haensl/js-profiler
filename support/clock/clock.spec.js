'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const clock = require('./clock');

chai.use(require('sinon-chai'));

describe('Clock', () => {
  describe('delta', () => {
    let start;
    let delta;
    describe('when calculating the time delta', () => {
      beforeEach(() => {
        start = process.hrtime();
      });

      describe('and not supplying a [seconds, nanoseconds] tuple', () => {
        it('should throw an exception', () => {
          expect(clock.delta).to.throw(Error);
        });
      });

      describe('and supplying a [seconds, nanoseconds] tuple', () => {
        beforeEach(() => {
          delta = clock.delta(start);
        });

        it('should return the time delta in milliseconds', () => {
          expect(typeof delta).to.eql('number');
        });
      });
    });
  });

  describe('time', () => {
    describe('when timing a function', () => {
      let fn;
      let delta;
      beforeEach(() => {
        fn = sinon.spy();
        delta = clock.time(fn);
      });

      it('should execute the function', () => {
        expect(fn.called).to.be.true;
      });

      it('should return the time it took to execute the function', () => {
        expect(typeof delta).to.eql('number');
      });

      describe('and not supplying a function', () => {
        it('should throw an exception', () => {
          expect(clock.time).to.throw(Error);
        });
      });
    });
  });
});
