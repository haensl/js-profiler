'use strict';

const chalk = require('chalk');
const VERBOSITY = requireModule('src/support/verbosity');
const events = requireModule('src/support/events');

class Reporter {
  /**
  * @param {ProfileRunner} profileRunner The test runner
  * @param {number} verbosity The verbosity level
  */
  constructor(profileRunner, verbosity) {
    this.verbosity = verbosity;

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
      const best = result.testResults
        .sort((a, b) => a.averageTime - b.averageTime)[0];
      console.info(chalk.green(`  Fastest: "${best.func.description()}" (${best.averageTime.toFixed(3)}ms)\n`));
    });

    profileRunner.on(events.TEST_START, (profile, func) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.log(chalk.green(`  ${func.description()}`));
      }
    });

    profileRunner.on(events.TEST_END, (profile, func, result) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.info(`    ${result.averageTime.toFixed(3)}ms`);
        console.info();
      }
    });

    profileRunner.on(events.ERROR, (err) => {
      console.error(err.stack);
    });
  }
}

module.exports = Reporter;
