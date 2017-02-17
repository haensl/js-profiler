'use strict';

const EventEmitter = require('events');
const join = require('path').join;
const clock = require(join(__appRoot, 'support/clock/clock'));

class ProfileRunner extends EventEmitter {
  constructor(config) {
    super();
    if (typeof config !== 'object') {
      throw new Error('Invalid parameter `config`: Expected an object');
    }

    if (!Array.isArray(config.profiles)) {
      throw new Error('Invalid parameter `config.profiles`: Expected an array');
    }

    if (typeof config.iterations !== 'number') {
      throw new Error('Invalid parameter `config.iterations`: Expected a number');
    }

    if (!Array.isArray(config.data)) {
      throw new Error('Invalid parameter `config.data`: Expected an array');
    }

    this.profiles = config.profiles.slice();
    this.iterations = config.iterations;
    this.data = config.data;
  }
  run() {
    try {
      this.emit(ProfileRunner.START, this.profiles);
      const report = {
        iterations: this.iterations,
        results: []
      };
      report.results = this.profiles.map((profile) => {
        return this.runProfile(profile);
      });
      this.emit(ProfileRunner.END, report);
    } catch (err) {
      this.emit(ProfileRunner.ERROR, err);
    }
  }

  runProfile(profile) {
    this.emit(ProfileRunner.PROFILE_START, profile);
    const result = {
      profile
    };

    result.testResults = profile.functions.map((func) => {
      return this.runFunction(profile, func);
    });

    this.emit(ProfileRunner.PROFILE_END, profile, result);
    return result;
  }

  runFunction(profile, func) {
    this.emit(ProfileRunner.TEST_START, profile, func);
    const testResult = {
      times: [],
      func
    };
    for (let i = 0; i < this.iterations; i++) {
      const time = clock.time(func.f, this.data);
      testResult.times.push(time);
    }

    testResult.min = testResult.times.reduce((prev, curr) => {
      return prev > curr ? curr : prev;
    });
    testResult.max = testResult.times.reduce((prev, curr) => {
      return prev < curr ? curr : prev;
    });
    testResult.average = testResult.times.reduce((prev, curr) => {
      return prev + curr;
    }, 0) / testResult.times.length;
    testResult.variance = testResult.times.reduce((prev, curr) => {
      return prev + ((curr - testResult.average) * (curr - testResult.average));
    }, 0) / testResult.times.length;
    testResult.standardDeviation = Math.sqrt(testResult.variance);

    this.emit(ProfileRunner.TEST_END, profile, func, testResult);
    return testResult;
  }
}

ProfileRunner.START = 'START';
ProfileRunner.END = 'END';
ProfileRunner.ERROR = 'ERROR';
ProfileRunner.PROFILE_START = 'PROFILE_START';
ProfileRunner.PROFILE_END = 'PROFILE_END';
ProfileRunner.TEST_START = 'TEST_START';
ProfileRunner.TEST_END = 'TEST_END';

module.exports = ProfileRunner;
