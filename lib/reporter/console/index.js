/* eslint-disable no-console */
const chalk = require('chalk');
const VERBOSITY = require('../../support/verbosity');
const events = require('../../support/events');
const Reporter = require('../reporter');

class ConsoleReporter extends Reporter {
  reportOn(profileRunner) {
    profileRunner.on(events.START, (profiles) => {
      this.printOptions();
      if (this.options.verbosity === VERBOSITY.VERBOSE) {
        console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.\n`);
      }
    });

    profileRunner.on(events.END, (profiles) => {
      if (this.options.verbosity === VERBOSITY.VERBOSE) {
        console.info(`Finished ${profiles.length} profiles.`);
      }
    });

    profileRunner.on(events.PROFILE_START, (profile) => {
      switch (this.options.verbosity) {
        case VERBOSITY.NORMAL:
          console.info(`\nStarting ${profile.description.short}`);
          break;
        case VERBOSITY.VERBOSE:
          console.info(`\nStarting ${profile.description.long}`);
      }
    });

    profileRunner.on(events.PROFILE_END, (profile, result) => {
      this.printProfileResult(this.formatProfileResult(profile, result));
    });

    profileRunner.on(events.TEST_START, (profile, func) => {
      if (this.options.verbosity >= VERBOSITY.NORMAL) {
        console.info(chalk.green(`  ${func.description}`));
      }
    });

    profileRunner.on(events.TEST_END, (profile, func, result) => {
      this.printTestResult(this.formatTestResult(result));
    });

    return super.reportOn(profileRunner);
  }

  /**
   * Print this instance's options to the console.
   */
  printOptions() {
    if (this.options.verbosity >= VERBOSITY.NORMAL) {
      console.info(
        `js-profiler v${this.report.jsprofiler.version}\n`
        + `node v${process.versions.node}\n`
        + `v8 v${process.versions.v8}`
      );
    }

    if (this.options.verbosity === VERBOSITY.VERBOSE) {
      console.info(
        `Magnitude: ${this.options.magnitude}\n`
        + `Iterations: ${this.options.iterations}\n`
        + `Enable memory measurement: ${this.options.memory ? 'yes' : 'no'}\n`
        + 'Units:\n'
        + `  Time: ${this.options.units.time}\n`
        + `  Memory: ${this.options.units.memory}\n`
        + 'Precision:\n'
        + `  Time: ${this.options.precision.time}\n`
        + `  Memory: ${this.options.precision.memory}`
      );
    }
  }

  /**
   * Print a formatted test result to the console.
   * @param {object} formattedTestResult the formatted test result to print.
   */
  printTestResult(formattedTestResult) {
    switch(this.options.verbosity) {
      case VERBOSITY.NORMAL:
        if (this.memory) {
          console.info(
            `    avg: ${formattedTestResult.time.average} |`
            + `${formattedTestResult.memory.average}\n`
          );
        } else {
          console.info(`    avg: ${formattedTestResult.time.average}`);
        }

        break;
      case VERBOSITY.VERBOSE:
        console.info(
          '    time:\n'
          + `      avg: ${formattedTestResult.time.average}\n`
          + `      min: ${formattedTestResult.time.minimum}\n`
          + `      max: ${formattedTestResult.time.maximum}`
        );
        if (this.memory) {
          console.info(
            '    memory:\n'
            + `      avg: ${formattedTestResult.memory.average}\n`
            + `      min: ${formattedTestResult.memory.minimum}\n`
            + `      max: ${formattedTestResult.memory.maximum}`
          );
        }

        break;
    }
  }

  /**
   * Print a formatted profile run result to the console.
   * @param {object} formattedProfileResult the formatted profile result to
   *                 print
   */
  printProfileResult(formattedProfileResult) {
    if (this.options.verbosity >= VERBOSITY.NORMAL) {
      console.info('\n  ==============');
      console.info(chalk.green(
        '  Fastest:\n'
        + `${
          formattedProfileResult.fastest.map((f) =>
            `    ${f.description} avg: ${f.time.average}`
          ).join('\n')
        }`
      ));

      if (this.memory) {
        console.info(chalk.green(
          '  Lowest memory consumption:\n'
          + `${
            formattedProfileResult.lowestMemory.map((m) =>
              `    ${m.description} avg: ${m.memory.average}`
            ).join('\n')
          }`
        ));
      }
    }
  }
}

module.exports = ConsoleReporter;
/* eslint-enable no-console */
