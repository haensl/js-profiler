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
    unit: DEFAULTS.unit
  }) {
    this.verbosity = options.verbosity;
    this.precision = options.precision;
    this.unit = options.unit;
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
        const best = this.bestResults(result);
        const p = {
          name: profile.name,
          description: profile.description(this.verbosity)
        };

        if (this.verbosity >= VERBOSITY.NORMAL) {
          p.tests = this.profiles[profile.name];
          p.fastest = best.map((b) => ({
            description: `${b.func.description()}`,
            average: this.formatTime(b.averageTime)
          }));
        }

        this.report.push(p);
      });

      profileRunner.on(events.TEST_END, (profile, func, result) => {
        if (this.verbosity >= VERBOSITY.NORMAL) {
          this.profiles[profile.name].push({
            description: func.description(),
            average: this.formatTime(result.averageTime)
          });
        }
      });
    });
  }

  /**
   * @param {object} results of profile run
   * @returns {Array} best results
   */
  bestResults(results) {
    return results.testResults
      .sort((a, b) => a.averageTime - b.averageTime)
      .filter((a, i, arr) => a.averageTime === arr[0].averageTime);
  }

  formatTime(t) {
    switch(this.unit) {
      case UNITS.AUTO:
        if (t * 1000 < 10) {
          return `${(UNITS.milliToMicro(t)).toFixed(this.precision)}μs`;
        }

        return `${t.toFixed(this.precision)}ms`;
      case UNITS.MICROSECONDS:
        return `${(UNITS.milliToMicro(t)).toFixed(this.precision)}μs`;
      default:
        return `${t.toFixed(this.precision)}ms`;
    }
  }
}

module.exports = Reporter;
