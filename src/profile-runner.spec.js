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
        description:  () => {},
        functions: [{
          description: () => {},
          f: () => {}
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
  });
});
