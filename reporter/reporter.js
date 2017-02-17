'use strict';

const join = require('path').join;
const ProfileRunner = require(join(__appRoot, 'profile-runner'));
const VERBOSITY = require(join(__appRoot, 'support/verbosity'));

class Reporter {
  constructor(testRunner, verbosity) {
    this.verbosity = verbosity;
    testRunner.on(ProfileRunner.START, (profiles) =>
      this.onStart(profiles));
    testRunner.on(ProfileRunner.END, (report) =>
      this.onEnd(report));
    testRunner.on(ProfileRunner.PROFILE_START, (profile) =>
      this.onProfileStart(profile));
    testRunner.on(ProfileRunner.PROFILE_END, (profile, result) =>
      this.onProfileEnd(profile, result));
    testRunner.on(ProfileRunner.TEST_START, (profile, func) =>
      this.onTestStart(profile, func));
    testRunner.on(ProfileRunner.TEST_END, (profile, func, result) =>
      this.onTestEnd(profile, func, result));
    testRunner.on(ProfileRunner.ERROR, (err) =>
      this.onError(err));
  }

  onStart(profiles) {
    console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.\n`);
  }

  onEnd(report) {
    console.log('Done');
  }

  onProfileStart(profile) {
    if (this.verbosity >= VERBOSITY.DEFAULT) {
      console.info(`Profile: ${profile.description()}`);
    }
  }

  onProfileEnd(profile, result) {
    if (this.verbosity >= VERBOSITY.DEFAULT) {
      console.info(`Result: ${profile.description()}`);
    }
  }

  onTestStart(profile, func) {
    if (this.verbosity >= VERBOSITY.DEFAULT) {
      console.log(`\t Function: ${func.description()}`);
    }
  }

  onTestEnd(profile, func, result) {
    if (this.verbosity >= VERBOSITY.DEFAULT) {
      console.info(`\t   - Average time: ${result.average.toFixed(3)}ms`);
      console.info(`\t   - Max time: ${result.max.toFixed(3)}ms`);
      console.info(`\t   - Min time: ${result.min.toFixed(3)}ms`);
      console.info(`\t   - Standard deviation: ${result.standardDeviation.toFixed(3)}ms`);
      console.info();
    }
  }

  onError(err) {
    console.error(err.stack);
  }
}

module.exports = Reporter;
