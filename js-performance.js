#!/usr/bin/env node

'use strict';

const glob = require('glob');
const join = require('path').join;
const GetOpt = require('node-getopt');
const chalk = require('chalk');
const appRoot = __dirname;
global.requireModule = (module) => require(join(appRoot, module));
const DEFAULTS = requireModule('lib/support/defaults');
const VERBOSITY = requireModule('lib/support/verbosity');
const ProfileRunner = requireModule('lib/profile-runner');
const ConsoleReporter = requireModule('lib/reporter/console');
const JSONReporter = requireModule('lib/reporter/json');

const opts = new GetOpt([
    ['h', 'help', 'Display this helptext.'],
    ['i', 'iterations=', `Specify the number of iterations per profiled function. Default: ${DEFAULTS.iterations}.`],
    ['j', 'json', `Output results in JSON format.`],
    ['l', 'list', 'List available profiles.'],
    ['m', 'magnitude=', `Specify the magnitude of testdata. Default: ${DEFAULTS.testdataMagnitude}.`],
    ['p', 'precision=', `Specify the precision in terms of decimal places of results. Default: ${DEFAULTS.precision} decimals.`],
    ['q', 'quiet', 'Print results only.'],
    ['v', 'verbose', 'Print verbose information.']
  ]).bindHelp()
  .parseSystem();

if ('list' in opts.options) {
  requireModule('lib/profiles')
    .forEach((profile) => {
      console.info(`${chalk.bold.underline(profile.name)}\n${profile.description(VERBOSITY.VERBOSE)}\n`);
    });
  process.exit(0);
}

let iterations = DEFAULTS.iterations;
if ('iterations' in opts.options
  && !isNaN(parseInt(opts.options.iterations, 10))) {
  iterations = parseInt(opts.options.iterations, 10);
}

let verbosity = DEFAULTS.verbosity;
if ('quiet' in opts.options) {
  verbosity = VERBOSITY.QUIET;
}

if ('verbose' in opts.options) {
  verbosity = VERBOSITY.VERBOSE;
}

let magnitude = DEFAULTS.testdataMagnitude;
if ('magnitude' in opts.options
  && !isNaN(parseInt(opts.options.magnitude, 10))) {
  magnitude = parseInt(opts.options.magnitude, 10);
}

let precision = DEFAULTS.precision;
if ('precision' in opts.options
  && !isNaN(parseInt(opts.options.precision, 10))) {
  precision = parseInt(opts.options.precision, 10);
}

let profiles = requireModule('lib/profiles');
if (opts.argv.length > 0) {
  profiles = profiles.filter((profile) => opts.argv.includes(profile.name));
}

const profileRunner = new ProfileRunner({
  iterations,
  profiles,
  magnitude
});

const reporter = 'json' in opts.options
  ? new JSONReporter(verbosity, precision)
  : new ConsoleReporter(verbosity, precision);
reporter.reportOn(profileRunner);
profileRunner.run();
