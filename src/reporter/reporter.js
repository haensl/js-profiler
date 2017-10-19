'use strict';

const join = require('path').join;
const VERBOSITY = require(join(__appRoot, 'src/support/verbosity'));
const chalk = require('chalk');
const events = require(join(__appRoot, 'src/support/events'));

class Reporter {
  /**
  * @param {ProfileRunner} profileRunner The test runner
  * @param {number} verbosity The verbosity level
  */
  constructor(profileRunner, verbosity) {
    this.verbosity = verbosity;
    profileRunner.on(events.START, (profiles) => {
      console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.\n`);
    });

    profileRunner.on(events.END, (profiles) => {
      console.log(`Finished ${profiles.length} profiles.`);
    });

    profileRunner.on(events.PROFILE_START, (profile) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.info(`${profile.description()}`);
      }
    });

    profileRunner.on(events.PROFILE_END, (profile, result) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        const best = result.testResults
          .sort((a, b) => a.averageTime - b.averageTime)[0];
        console.info(chalk.green(`  Winner: "${best.func.description()}" (${best.averageTime.toFixed(3)}ms)\n`));
      }
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
