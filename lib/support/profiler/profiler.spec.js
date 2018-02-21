const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const profiler = require('./');

chai.use(require('sinon-chai'));

describe('Profiler', () => {
  let fn;
  let profile;
  beforeEach(() => {
    fn = sinon.spy();
  });

  describe('when profiling a function', () => {
    beforeEach(() => {
      profile = profiler({
        fn
      });
    });

    it('should return an object', () => {
      expect(typeof profile).to.eql('object');
    });

    it('should return the time it took to execute the function', () => {
      expect(Array.isArray(profile.time)).to.be.true;
    });
  });

  describe('when memory measurement is enabled', () => {
    describe('without exposing the garbage collector', () => {
      let p;
      let gcBak;
      beforeEach(() => {
        gcBak = global.gc;
        global.gc = undefined;
        p = profiler.bind(null, {
          fn,
          memory: true
        });
      });

      afterEach(() => {
        global.gc = gcBak;
      });

      it('should throw an exception', () => {
        expect(p).to.throw(Error);
      });
    });

    describe('and exposing the garbage collector', () => {
      beforeEach(() => {
        global.gc = sinon.spy();
        profile = profiler({
          fn,
          memory: true
        });
      });

      afterEach(() => {
        global.gc.reset();
      });

      it('should call the garbage collector', () => {
        expect(global.gc.called).to.be.true;
      });

      it('should return an object', () => {
        expect(typeof profile).to.eql('object');
      });

      it('should return the time it took to execute the function', () => {
        expect(Array.isArray(profile.time)).to.be.true;
      });

      it ('should return the heap space consumed when executing the function', () => {
        expect(typeof profile.heap).to.eql('number');
      });
    });
  });
});
