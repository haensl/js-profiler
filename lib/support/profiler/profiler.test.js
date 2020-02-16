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
    beforeEach(async () => {
      profile = await profiler({
        fn
      });
    });

    it('returns an object', () => {
      expect(typeof profile).to.eql('object');
    });

    it('returns the time it took to execute the function', () => {
      expect(typeof profile.time === 'number').to.be.true;
    });
  });

  describe('when memory measurement is enabled', () => {
    beforeEach(async () => {
      profile = await profiler({
        fn,
        memory: true
      });
    });

    it('returns an object', () => {
      expect(typeof profile).to.eql('object');
    });

    it('returns the time it took to execute the function', () => {
      expect(typeof profile.time).to.eql('number');
    });

    it('returns the heap space consumed when executing the function', () => {
      expect(typeof profile.heap).to.eql('number');
    });
  });
});
