'use strict';

const join = require('path').join;
const ProfileRunner = require(join(__appRoot, 'src/profile-runner'));
const VERBOSITY = require(join(__appRoot, 'src/support/verbosity'));
const chalk = require('chalk');

class Reporter {
  /**
  * @param {TestRunner} testRunner The test runner
  * @param {number} verbosity The verbosity level
  */
  constructor(testRunner, verbosity) {
    this.verbosity = verbosity;
    testRunner.on(ProfileRunner.START, (profiles) => {
      console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.\n`);
    });

    testRunner.on(ProfileRunner.END, (profiles) => {
      console.log(`Finished ${profiles.length} profiles.`);
    });

    testRunner.on(ProfileRunner.PROFILE_START, (profile) => {
      if (this.verbosity >= VERBOSITY.DEFAULT) {
        console.info(`${profile.description()}`);
      }
    });

    testRunner.on(ProfileRunner.PROFILE_END, (profile, result) => {
      if (this.verbosity >= VERBOSITY.DEFAULT) {
        const best = result.testResults
          .sort((a, b) => a.averageTime - b.averageTime)[0];
        console.info(chalk.green(`  Winner: "${best.func.description()}" (${best.averageTime.toFixed(3)}ms)\n`));
      }
    });

    testRunner.on(ProfileRunner.TEST_START, (profile, func) => {
      if (this.verbosity >= VERBOSITY.DEFAULT) {
        console.log(chalk.green(`  ${func.description()}`));
      }
    });

    testRunner.on(ProfileRunner.TEST_END, (profile, func, result) => {
      if (this.verbosity >= VERBOSITY.DEFAULT) {
        console.info(`    ${result.averageTime.toFixed(3)}ms`);
        console.info();
      }
    });

    testRunner.on(ProfileRunner.ERROR, (err) => {
      console.error(err.stack);
    });
  }
}

module.exports = Reporter;
