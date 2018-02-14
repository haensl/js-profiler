'use strict';

const chalk = require('chalk');
const VERBOSITY = requireModule('lib/support/verbosity');
const events = requireModule('lib/support/events');
const Reporter = requireModule('lib/reporter/reporter');

class ConsoleReporter extends Reporter{
  reportOn(profileRunner) {
    super.reportOn(profileRunner);
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
  }
}

module.exports = ConsoleReporter;
