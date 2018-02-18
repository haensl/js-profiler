const events = requireModule('lib/support/events');
const DEFAULTS = requireModule('lib/support/defaults');
const VERBOSITY = requireModule('lib/support/verbosity');
const UNITS = requireModule('lib/support/units');

class Reporter {
  /**
   * @param {number} verbosity The verbosity level
   * @param {number} precision The number of decimal places to print for results
   */
  constructor(options = {
    verbosity: DEFAULTS.verbosity,
    precision: DEFAULTS.precision,
    units: DEFAULTS.units,
    memory: DEFAULTS.memory
  }) {
    this.verbosity = options.verbosity;
    this.precision = options.precision;
    this.units = options.units;
    this.memory = options.memory
    this.report = [];
    this.profiles = {};
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
        const p = {
          name: profile.name,
          description: profile.description(this.verbosity)
        };

        if (this.verbosity >= VERBOSITY.NORMAL) {
          p.tests = this.profiles[profile.name];
          const fastest = this.fastest(result);
          p.fastest = fastest.map((b) => {
            const f = {
              description: `${b.func.description()}`,
              time: {
                average: this.formatTime(b.time.average)
              }
            };
            if (this.verbosity === VERBOSITY.VERBOSE) {
              f.time.minimum = this.formatTime(b.time.minimum);
              f.time.maximum = this.formatTime(b.time.maximum);
            }

            if (this.memory) {
              f.memory = {
                average: this.formatMemory(b.memory.average)
              };

              if (this.verbosity === VERBOSITY.VERBOSE) {
                f.memory.minimum = this.formatMemory(b.memory.minimum);
                f.memory.maximum = this.formatMemory(b.memory.maximum);
              }
            }

            return f;
          });


          if (this.memory) {
            const lowestMemory = this.lowestMemory(result);
            p.lowestMemory = lowestMemory.map((b) => {
              const f = {
                description: `${b.func.description()}`,
                time: {
                  average: this.formatTime(b.time.average)
                },
                memory: {
                  average: this.formatMemory(b.memory.average)
                }
              };

              if (this.verbosity === VERBOSITY.VERBOSE) {
                f.memory.minimum = this.formatMemory(b.memory.minimum);
                f.memory.maximum = this.formatMemory(b.memory.maximum);
                f.time.minimum = this.formatTime(b.time.minimum);
                f.time.maximum = this.formatTime(b.time.maximum);
              }

              return f;
            });
          }
        }

        this.report.push(p);
      });

      profileRunner.on(events.TEST_END, (profile, func, result) => {
        if (this.verbosity >= VERBOSITY.NORMAL) {
          const p = {
            description: func.description(),
            time: {
              average: this.formatTime(result.time.average)
            }
          };

          if (this.verbosity === VERBOSITY.VERBOSE) {
            p.time.minimum = this.formatTime(result.time.minimum);
            p.time.maximum = this.formatTime(result.time.maximum);
          }

          if (this.memory) {
            p.memory = {
              average: this.formatMemory(result.memory.average),
            };
            if (this.verbosity >= VERBOSITY.VERBOSE) {
              p.memory.minimum = this.formatMemory(result.memory.minimum);
              p.memory.maximum = this.formatMemory(result.memory.maximum);
            }
          }

          this.profiles[profile.name].push(p);
        }
      });
    });
  }

  /**
   * Extracts the fastest test results
   * @param {object} results of profile run
   * @returns {Array} fastest results
   */
  fastest(results) {
    return results.testResults
      .slice()
      .sort((a, b) => a.time.average - b.time.averageTime)
      .filter((a, i, arr) => a.time.average === arr[0].time.average);
  }

  /**
   * Extracts the test results with lowest memory consumption
   * @param {object} results of profile run
   * @returns {Array} results consuming lowest amount of memory
   */
  lowestMemory(results) {
    return results.testResults
      .slice()
      .sort((a, b) => a.memory.average - b.memory.average)
      .filter((a, i, arr) => a.memory.average === arr[0].memory.average);
  }

  formatMemory(m) {
    switch (this.units.memory) {
      case UNITS.AUTO:
        if (m > UNITS.MEMORY_CONVERSION_FACTOR) {
          const kb = UNITS.byteToKilobyte(m);
          if (kb > UNITS.MEMORY_CONVERSION_FACTOR) {
            return `${UNITS.kilobyteToMegabyte(kb).toFixed(this.precision.memory)}MB`;
          }

          return `${kb.toFixed(this.precision.memory)}KB`;
        }

        return `${m.toFixed(this.precision.memory)}B`;
      case UNITS.KILOBYTES:
        return `${UNITS.byteToKilobyte(m).toFixed(this.precision.memory)}KB`;
      case UNITS.MEGABYTES:
        return `${UNITS.kilobyteToMegabyte(UNITS.byteToKilobyte(m)).toFixed(this.precision.memory)}MB`;
      default:
        return `${m.toFixed(this.precision.memory)}B`;
    }
  }

  formatTime(t) {
    switch(this.units.time) {
      case UNITS.AUTO:
        if (t.toFixed(this.precision) === 0) {
          return `${UNITS.microToMilli(t).toFixed(this.precision.time)}ms`;
        }

        return `${t.toFixed(this.precision.time)}µs`;
      case UNITS.MICROSECONDS:
        return `${t.toFixed(this.precision.time)}μs`;
      default:
        return `${UNITS.microToMilli(t).toFixed(this.precision.time)}ms`;
    }
  }
}

module.exports = Reporter;
