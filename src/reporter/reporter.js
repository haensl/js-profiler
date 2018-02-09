'use strict';

const chalk = require('chalk');
const VERBOSITY = requireModule('src/support/verbosity');
const events = requireModule('src/support/events');

class Reporter {
  /**
  * @param {ProfileRunner} profileRunner The test runner
  * @param {number} verbosity The verbosity level
  * @param {number} precision The number of decimal places to print for results
  */
  constructor(profileRunner, verbosity, precision) {
    this.verbosity = verbosity;
    this.precision = precision;

    profileRunner.on(events.START, (profiles) => {
      if (this.verbosity === VERBOSITY.VERBOSE) {
        console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.\n`);
      }
    });

    profileRunner.on(events.END, (profiles) => {
      if (this.verbosity >= VERBOSITY.VERBOSE) {
        console.log(`Finished ${profiles.length} profiles.`);
      }
    });

    profileRunner.on(events.PROFILE_START, (profile) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.info(`${profile.description()}`);
      }
    });

    profileRunner.on(events.PROFILE_END, (profile, result) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.log('  ==============');
        const best = result.testResults
          .sort((a, b) => a.averageTime - b.averageTime)
          .filter((a, i, arr) => a.averageTime === arr[0].averageTime);
        if (best.length === 1) {
          console.info(chalk.green(`  Winner: "${best[0].func.description()}" (${this.formatTime(best[0].averageTime)})\n`));
        } else {
          console.info(chalk.green(`  Draw between:\n${best.forEach((b) => `\t"${b.func.description()}" (${this.formatTime(b.averageTime)})`)}`));
        }
      }
    });

    profileRunner.on(events.TEST_START, (profile, func) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.log(chalk.green(`  ${func.description()}`));
      }
    });

    profileRunner.on(events.TEST_END, (profile, func, result) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.info(`    ${this.formatTime(result.averageTime)}\n`);
      }
    });

    profileRunner.on(events.ERROR, (err) => {
      console.error(err.stack);
    });
  }

  formatTime(t) {
    if (t * 1000 < 10) {
      return `${(t * 1000).toFixed(this.precision)}μs`;
    }

    return `${t.toFixed(this.precision)}ms`;
  }
}

module.exports = Reporter;
