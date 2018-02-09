const events = requireModule('lib/support/events');

class Reporter {
  /**
   * @param {number} verbosity The verbosity level
   * @param {number} precision The number of decimal places to print for results
   */
  constructor(verbosity, precision) {
    this.verbosity = verbosity;
    this.precision = precision;
  }

  /**
  * @param {ProfileRunner} profileRunner The test runner
  */
  reportOn(profileRunner) {
    profileRunner.on(events.ERROR, (err) => {
      console.error(err.stack);
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

  formatTime(t, preserveUnits = false) {
    if (preserveUnits) {
      return t.toFixed(this.precision);
    }

    if (t * 1000 < 10) {
      return `${(t * 1000).toFixed(this.precision)}μs`;
    }

    return `${t.toFixed(this.precision)}ms`;
  }
}

module.exports = Reporter;
