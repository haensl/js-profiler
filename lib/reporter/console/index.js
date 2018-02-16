'use strict';

const chalk = require('chalk');
const VERBOSITY = requireModule('lib/support/verbosity');
const events = requireModule('lib/support/events');
const Reporter = requireModule('lib/reporter/reporter');

class ConsoleReporter extends Reporter{
  constructor(options) {
    super(options);

    if (this.verbosity === VERBOSITY.VERBOSE) {
      console.info(
        `Iterations: ${options.iterations}\n` +
        `Test-data magnitude: ${options.magnitude}\n` +
        `Reporting unit: ${options.unit}\n` +
        `Precision: ${options.precision} decimal places\n`);
    }
  }
  reportOn(profileRunner) {
    profileRunner.on(events.START, (profiles) => {
      if (this.verbosity === VERBOSITY.VERBOSE) {
        console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.\n`);
      }
    });

    profileRunner.on(events.END, (profiles) => {
      if (this.verbosity >= VERBOSITY.VERBOSE) {
        console.info(`Finished ${profiles.length} profiles.`);
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
        const best = this.bestResults(result);
        if (best.length === 1) {
          console.info(chalk.green(`  Winner: "${best[0].func.description()}" (Avg: ${this.formatTime(best[0].average)})\n`));
        } else {
          console.info(chalk.green(`  Draw between:\n${best.forEach((b) => `\t"${b.func.description()}" (Avg: ${this.formatTime(b.average)})`)}`));
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
        console.info(`    Average: ${this.formatTime(result.average)}`);
        if (this.verbosity === VERBOSITY.VERBOSE) {
          console.info(`    Minimum: ${this.formatTime(result.minimum)}`);
          console.info(`    Maximum: ${this.formatTime(result.maximum)}`);
        }
        console.info();
      }
    });

    return super.reportOn(profileRunner);
  }
}

module.exports = ConsoleReporter;
