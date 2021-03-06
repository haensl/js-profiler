'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const expect = chai.expect;
const ProfileRunner = require('./');
const events = require('../support/events');

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
      magnitude: 10
    };
    profileRunner = new ProfileRunner(options);
  });

  it('creates a profile runner', () => {
    expect(profileRunner).to.exist;
  });

  describe('When running', () => {
    let spies;

    beforeEach((done) => {
      spies = new Map();
      for (const event in events) {
        const spy = sinon.spy();
        profileRunner.on(events[event], spy);
        spies.set(events[event], spy);
      }

      profileRunner.run()
        .then(done);
    });

    for (const event in events) {
      if (event === 'ERROR') {
        continue;
      }

      it(`emits the ${event} event`, () => {
        expect(spies.get(events[event])).to.have.been.called;
      });
    }

    it('calls the profiled function for the number of iterations', () => {
      expect(options.profiles[0].functions[0].f)
        .to.have.callCount(options.iterations);
    });
  });
});
