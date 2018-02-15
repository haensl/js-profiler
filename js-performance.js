#!/usr/bin/env node

const glob = require('glob');
const join = require('path').join;
const GetOpt = require('node-getopt');
const chalk = require('chalk');
const appRoot = __dirname;
global.requireModule = (module) => require(join(appRoot, module));
const DEFAULTS = requireModule('lib/support/defaults');
const VERBOSITY = requireModule('lib/support/verbosity');
const UNITS = requireModule('lib/support/units');
const jsperformance = requireModule('lib');

const opts = new GetOpt([
    ['h', 'help', 'Display this helptext.'],
    ['i', 'iterations=', `Specify the number of iterations per profiled function. Default: ${DEFAULTS.iterations}.`],
    ['j', 'json', `Output results in JSON format.`],
    ['l', 'list', 'List available profiles.'],
    ['m', 'magnitude=', `Specify the magnitude of testdata. Default: ${DEFAULTS.magnitude}.`],
    ['p', 'precision=', `Specify the precision in terms of decimal places of results. Default: ${DEFAULTS.precision} decimals.`],
    ['q', 'quiet', 'Print results only.'],
    ['u', 'unit=', `Specify the unit for time output. Default: ${DEFAULTS.unit}. Possible values: auto (automatically convert between milli- and microseconds), ms (milliseconds), µs (microseconds)`],
    ['v', 'verbose', 'Print verbose information.']
  ]).setHelp(
    'Usage: js-performance [OPTIONS] [profile1 profile2 ...]\n\n' +
    'Parameters:\n' +
    '  profile1 profile2 ...\n' +
    '  Optionally specify the profiles you want to run separated by spaces.\n\n' +
    'Options:\n' +
    '[[OPTIONS]]\n'
  ).bindHelp().parseSystem();

const options = Object.assign({}, DEFAULTS, { console: true });

if ('quiet' in opts.options) {
  options.verbosity = VERBOSITY.QUIET;
}

if ('verbose' in opts.options) {
  options.verbosity = VERBOSITY.VERBOSE;
}

if ('json' in opts.options) {
  options.json = true;
  options.console = false;
}

if ('list' in opts.options) {
  const profileList = jsperformance.list(options.verbosity);
  if (options.json) {
    console.info(JSON.stringify(profileList, null, 2));
  } else {
    profileList.forEach((profile) => {
      console.info(`${chalk.bold.underline(profile.name)}\n${profile.description}`);
    });
  }

  process.exit(0);
}

if ('iterations' in opts.options
  && !isNaN(parseInt(opts.options.iterations, 10))) {
  options.iterations = parseInt(opts.options.iterations, 10);
}

if ('magnitude' in opts.options
  && !isNaN(parseInt(opts.options.magnitude, 10))) {
  options.magnitude = parseInt(opts.options.magnitude, 10);
}

if ('precision' in opts.options
  && !isNaN(parseInt(opts.options.precision, 10))) {
  options.precision = parseInt(opts.options.precision, 10);
}

if ('unit' in opts.options
  && UNITS.isValidUnit(opts.options.unit)) {
  options.unit = opts.options.unit;
}

if (opts.argv.length > 0) {
  options.profiles = opts.argv;
}

jsperformance.run(options)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
