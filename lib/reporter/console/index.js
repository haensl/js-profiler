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
        `Report memory consumption: ${options.memory ? 'yes' : 'no'}\n` +
        `Reporting units:\n` +
        `  Time: ${options.units.time}\n` +
        `${options.memory ? `  Memory: ${options.units.memory}\n` : ''}` +
        `Precision:\n` +
        `  Time: ${options.precision.time} decimal places\n` +
        `${options.memory ? `  Memory: ${options.precision.memory} decimal places\n` : ''}`);
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
        const fastest = this.fastest(result);

        console.info(chalk.green(`  Fastest:`));
        if (fastest.length === 1) {
          console.info(chalk.green(`  ${fastest[0].func.description()} (avg: ${this.formatTime(fastest[0].time.average)})\n`));
        } else {
          console.info(chalk.green(`  Draw between:\n${fastest.forEach((b) => `  ${b.func.description()} (avg: ${this.formatTime(b.time.average)})`)}`));
        }

        if (this.memory) {
          const lowestMemory = this.lowestMemory(result);
          console.info(chalk.green(`  Lowest memory consumption:`));
          if (lowestMemory.length === 1) {
            console.info(chalk.green(`  ${lowestMemory[0].func.description()} (${this.formatMemory(lowestMemory[0].memory.average)})\n`));
          } else {
            console.info(chalk.green(`  Draw between:\n${lowestMemory.forEach((b) => `  ${b.func.description()} (${this.formatMemory(b.memory.average)})`)}`));
          }
        }
      }
    });

    profileRunner.on(events.TEST_START, (profile, func) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        console.info();
        console.log(chalk.green(`  ${func.description()}`));
      }
    });

    profileRunner.on(events.TEST_END, (profile, func, result) => {
      switch(this.verbosity) {
        case VERBOSITY.NORMAL:
          if (this.memory) {
            console.info(`    ${this.formatTime(result.time.average)} | ${this.formatMemory(result.memory.average)}\n`);
          } else {
            console.info(`    ${this.formatTime(result.time.average)}`);
          }

          break;
        case VERBOSITY.VERBOSE:
          console.info(`    TIME:`);
          console.info(`      avg: ${this.formatTime(result.time.average)}`);
          console.info(`      min: ${this.formatTime(result.time.minimum)}`);
          console.info(`      max: ${this.formatTime(result.time.maximum)}`);
          if (this.memory) {
            console.info(`    MEMORY:`);
            console.info(`      avg: ${this.formatMemory(result.memory.average)}`);
            console.info(`      min: ${this.formatMemory(result.memory.minimum)}`);
            console.info(`      max: ${this.formatMemory(result.memory.maximum)}`);
          }

          break;
      }
    });

    return super.reportOn(profileRunner);
  }
}

module.exports = ConsoleReporter;
