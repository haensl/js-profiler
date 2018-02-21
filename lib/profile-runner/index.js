'use strict';

const EventEmitter = require('events');
const testdata = require('../support/testdata');
const profiler = require('../support/profiler');
const EVENTS = require('../support/events');
const UNITS = require('../support/units');

class ProfileRunner extends EventEmitter {

  /**
  * @constructor
  * @param {object} config Configuration object
  * @param {array} config.profiles An array of profiles
  * @param {number} config.iterations Number of iterations
  * @param {number} config.magnitude Magnitude of test data
  * @param {boolean} config.memory Set to true to measure memory consumption
  */
  constructor(config) {
    super();
    this.profiles = config.profiles.slice();
    this.iterations = config.iterations;
    this.magnitude = config.magnitude;
    this.memory = config.memory;
  }

  /**
  * Starts this ProfileRunner
  */
  run() {
    try {
      this.emit(EVENTS.START, this.profiles);
      const results = this.profiles.map((profile) => this.runProfile(profile));
      this.emit(EVENTS.END, results);
    } catch (err) {
      this.emit(EVENTS.ERROR, err);
    }
  }

  /**
  * Runs a single profile
  * @private
  * @param {object} profile A profile
  * @returns {object} The test result
  */
  runProfile(profile) {
    this.emit(EVENTS.PROFILE_START, profile);
    const result = {
      profile,
      testResults: profile.functions.map((func) =>
        this.runFunction(profile, func, testdata(profile.testDataType, this.magnitude)))
    };
    this.emit(EVENTS.PROFILE_END, profile, result);
    return result;
  }

  /**
  * Runs a single profile function
  * @private
  * @param {object} profile A profile
  * @param {object} func A profile function
  * @param {any} data The test data
  * @returns {object} The test result
  */
  runFunction(profile, func, data) {
    if (func.testDataType) {
      data = testdata(func.testDataType, this.magnitude);
    }

    this.emit(EVENTS.TEST_START, profile, func);
    const result = {
      time: {
        average: 0,
        maximum: -Infinity,
        minimum: Infinity,
        total: 0,
      },
      func
    };

    if (this.memory) {
      result.memory = {
        total: 0,
        average: 0,
        minimum: Infinity,
        maximum: -Infinity
      };
    }

    for (let i = 0, duration, profile; i < this.iterations; i++) {
      profile = profiler({
        fn: func.f,
        data,
        memory: this.memory
      });
      duration = UNITS.hrToMicro(profile.time);
      result.time.total += duration;
      if (this.memory) {
        result.memory.total += profile.heap;
        if (profile.heap < result.memory.minimum) {
          result.memory.minimum = profile.heap;
        }

        if (profile.heap > result.memory.maximum) {
          result.memory.maximum = profile.heap;
        }
      }

      if (duration < result.time.minimum) {
        result.time.minimum = duration;
      }

      if (duration > result.time.maximum) {
        result.time.maximum = duration;
      }
    }

    result.time.average = result.time.total / this.iterations;
    if (this.memory) {
      result.memory.average = result.memory.total / this.iterations;
    }

    this.emit(EVENTS.TEST_END, profile, func, result);
    return result;
  }
}


module.exports = ProfileRunner;
