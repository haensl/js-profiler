'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const expect = chai.expect;
const ProfileRunner = require('./profile-runner');
const events = require('./support/events');

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
    let spies;

    beforeEach(() => {
      spies = new Map();
      for (let event in events) {
        const spy = sinon.spy();
        profileRunner.on(events[event], spy);
        spies.set(events[event], spy);
      }

      profileRunner.run();
    });

    for (let event in events) {
      if (event === 'ERROR') {
        continue;
      }
      it(`Should emit the ${event} event`, () => {
        expect(spies.get(events[event])).to.have.been.called;
      });
    }

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
