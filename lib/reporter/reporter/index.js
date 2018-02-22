const events = require('../../support/events');
const DEFAULTS = require('../../support/defaults');
const VERBOSITY = require('../../support/verbosity');
const UNITS = require('../../support/units');
const jsProfilerVersion = require('../../../package').version;

class Reporter {
  /**
   * @param {number} verbosity The verbosity level
   * @param {number} precision The number of decimal places to print for results
   */
  constructor(options = DEFAULTS) {
    this.options = options;
    this.report = {
      jsprofiler: {
        version: jsProfilerVersion,
      },
      node: {
        version: process.versions.node
      },
      v8: {
        version: process.versions.v8
      },
      results: []
    };
    if (this.options.verbosity === VERBOSITY.VERBOSE) {
      this.report.jsprofiler.options = this.options;
    }

    this.profiles = {};
  }

  /**
   * Extracts fastest test results.
   * @param {object} test results results of a profile run.
   * @returns {Array} fastest results. If the returned array contains more
   *                  than one item, they must have equal average runtimes.
   */
  static fastest(results) {
    return results
      .slice()
      .sort((a, b) => a.time.average - b.time.average)
      .filter((a, i, arr) => a.time.average === arr[0].time.average);
  }


  /**
   * Extracts the test results with lowest memory consumption
   * @param {object} results of profile run
   * @returns {Array} results consuming lowest amount of memory. If the returned
   *                  array contains more than one item, they must have equal
   *                  average memory consumption.
   */
  static lowestMemory(results) {
    return results
      .filter((r) => 'memory' in r)
      .slice()
      .sort((a, b) => a.memory.average - b.memory.average)
      .filter((a, i, arr) => a.memory.average === arr[0].memory.average);
  }


  /**
  * @param {ProfileRunner} profileRunner The test runner
  */
  reportOn(profileRunner) {
    return new Promise((resolve, reject) => {
      profileRunner.on(events.ERROR, (err) => {
        reject(err);
      });

      profileRunner.on(events.END, (profiles) => {
        resolve(this.report);
      });

      profileRunner.on(events.PROFILE_START, (profile) => {
        this.profiles[profile.name] = [];
      });

      profileRunner.on(events.PROFILE_END, (profile, result) => {
        this.report.results.push(this.formatProfileResult(profile, result));
      });

      profileRunner.on(events.TEST_END, (profile, func, result) => {
        this.profiles[profile.name].push(this.formatTestResult(result));
      });
    });
  }

  /**
   * Formats profile results according to this instance's options
   * @param {object} profile the profile these results belong to
   * @param {object} result the result of the profile run
   * @returns {object} the formatted profile result
   */
  formatProfileResult(profile, result) {
    const p = {};
    if (this.options.verbosity >= VERBOSITY.NORMAL) {
      p.name = profile.name,
      p.description = profile.description.short;
      p.tests = this.profiles[profile.name];
      p.fastest = this.formatFastest(result.testResults);

      const lowestMemory = this.formatLowestMemory(result.testResults);
      if (lowestMemory.length) {
        p.lowestMemory = lowestMemory;
      }
    }

    if (this.options.verbosity === VERBOSITY.VERBOSE) {
        p.description = profile.description.long;
    }

    return p;
  }

  /**
   * Extracts the fastest test results and formats them according to this
   * instance's options.
   * @param {object} testResults of profile run
   * @returns {Array} fastest results
   */
  formatFastest(testResults) {
    return Reporter.fastest(testResults)
      .map((f) => this.formatTestResult(f));
  }

  /**
   * Extracts the test results with lowest memory consumption and formats them
   * according to this instance's options.
   * @param {object} testResults of profile run
   * @returns {Array} results consuming lowest amount of memory
   */
  formatLowestMemory(testResults) {
    return Reporter.lowestMemory(testResults)
      .map((m) => this.formatTestResult(m));
  }

  /**
   * Formats test results according to this instance's options.
   * @param {object} testResult result of test run
   * @returns {object} the formatted test result
   */
  formatTestResult(testResult) {
    const r = {
      description: testResult.func.description,
      time: {
        average: this.formatMicros(testResult.time.average)
      }
    };

    if (this.options.verbosity === VERBOSITY.VERBOSE) {
      r.time = Object.assign(r.time, {
        minimum: this.formatMicros(testResult.time.minimum),
        maximum: this.formatMicros(testResult.time.maximum)
      });
    }

    if ('memory' in testResult) {
      r.memory = {
        average: this.formatBytes(testResult.memory.average)
      };

      if (this.options.verbosity === VERBOSITY.VERBOSE) {
        r.memory = Object.assign(r.memory, {
          minimum: this.formatBytes(testResult.memory.minimum),
          maximum: this.formatBytes(testResult.memory.maximum)
        });
      }
    }

    return r;
  }

  /**
   * Formats a number of bytes according to this instance's options,
   * i.e. adds units and adjusts precision.
   * @param {number} bytes the memory to format expressed in bytes
   * @returns {string} the formatted memory string
   */
  formatBytes(bytes) {
    switch (this.options.units.memory) {
      case UNITS.AUTO:
        if (bytes > UNITS.MEMORY_CONVERSION_FACTOR) {
          const kb = UNITS.byteToKilobyte(bytes);
          if (kb > UNITS.MEMORY_CONVERSION_FACTOR) {
            return `${UNITS.kilobyteToMegabyte(kb).toFixed(this.options.precision.memory)}MB`;
          }

          return `${kb.toFixed(this.options.precision.memory)}KB`;
        }

        return `${bytes.toFixed(this.options.precision.memory)}B`;
      case UNITS.KILOBYTES:
        return `${UNITS.byteToKilobyte(bytes).toFixed(this.options.precision.memory)}KB`;
      case UNITS.MEGABYTES:
        return `${UNITS.kilobyteToMegabyte(UNITS.byteToKilobyte(bytes)).toFixed(this.options.precision.memory)}MB`;
      default:
        return `${bytes.toFixed(this.options.precision.memory)}B`;
    }
  }

  /**
   * Formats a number of microseconds according to this instance's options,
   * i.e. adds units and adjusts precision.
   * @param {number} micros the microseconds
   * @returns {string} the formatted time string
   */
  formatMicros(micros) {
    switch(this.options.units.time) {
      case UNITS.AUTO:
        if (micros > UNITS.TIME_CONVERSION_FACTOR) {
          return `${UNITS.microToMilli(micros).toFixed(this.options.precision.time)}ms`;
        }

        return `${micros.toFixed(this.options.precision.time)}µs`;
      case UNITS.MICROSECONDS:
        return `${micros.toFixed(this.options.precision.time)}μs`;
      default:
        return `${UNITS.microToMilli(micros).toFixed(this.options.precision.time)}ms`;
    }
  }
}

module.exports = Reporter;
