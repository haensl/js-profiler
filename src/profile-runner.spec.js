'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const expect = chai.expect;
const ProfileRunner = require('./profile-runner');

describe('Profile Runner', () => {
  let profileRunner;
  let options;
  beforeEach(() => {
    options = {
      profiles: [{
        functions: [{
          f: sinon.spy()
        }]
      }],
      iterations: 10,
      data: []
    };
    profileRunner = new ProfileRunner(options);
  });

  it('Should create a profile runner', () => {
    expect(profileRunner).to.exist;
  });

  describe('When running', () => {
    const events = [
      ProfileRunner.START,
      ProfileRunner.END,
      ProfileRunner.PROFILE_START,
      ProfileRunner.PROFILE_END,
      ProfileRunner.TEST_START,
      ProfileRunner.TEST_END
    ];
    let spies;

    beforeEach(() => {
      spies = events.map((event) => {
        const spy = sinon.spy();
        profileRunner.on(event, spy);
        return spy;
      });

      profileRunner.run();
    });

    events.forEach((event, idx) => {
      it(`Should emit the ${event} event`, () => {
        expect(spies[idx]).to.have.been.called;
      });
    });

    it('Should call the profiled function for the number of iterations', () => {
      expect(options.profiles[0].functions[0].f)
        .to.have.callCount(options.iterations);
    });

    it('Should pass the data to the profiled function', () => {
      expect(options.profiles[0].functions[0].f)
        .to.have.been.calledWith(options.data);
    });
  });
});
