#!/usr/bin/env node

'use strict';

const glob = require('glob');
const join = require('path').join;
const GetOpt = require('node-getopt');
const chalk = require('chalk');
const appRoot = __dirname;
global.requireModule = (module) => require(join(appRoot, module));
const DEFAULTS = requireModule('src/support/defaults');
const VERBOSITY = requireModule('src/support/verbosity');
const testdata = requireModule('src/support/testdata/testdata');
const ProfileRunner = requireModule('src/profile-runner');
const Reporter = requireModule('src/reporter/reporter');

const opts = new GetOpt([
    ['h', 'help', 'Display this helptext.'],
    ['i', 'iterations=', `Specify the number of iterations per profiled function. Default: ${DEFAULTS.iterations}.`],
    ['l', 'list', 'List available profiles.'],
    ['q', 'quiet', 'Print results only.'],
    ['m', 'magnitude=', `Specify the magnitude of testdata. Default: ${DEFAULTS.testdataMagnitude}.`],
    ['p', 'precision=', `Specify the precision in terms of decimal places of results. Default: ${DEFAULTS.precision} decimals.`],
    ['q', 'quiet', 'Print results only.'],
    ['v', 'verbose', 'Print verbose information.']
  ]).bindHelp()
  .parseSystem();

if ('list' in opts.options) {
  requireModule('src/profiles')
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

let profiles = [];
if (opts.argv.length > 0) {
  opts.argv.forEach((profileName) => {
    const discoveredProfiles = glob.sync(`src/profiles/**/@(${profileName}.profile|${profileName}.profile.js|${profileName}.js)`);
    if (discoveredProfiles.length === 1) {
      profiles.push(requireModule(discoveredProfiles.pop()));
    } else if (verbosity >= VERBOSITY.NORMAL) {
      console.info(`Skipping unknown profile "${profileName}".`);
    }
  });
} else {
  profiles = profiles.concat(requireModule('src/profiles'));
}

const profileRunner = new ProfileRunner({
  iterations,
  profiles,
  magnitude
});

new Reporter(profileRunner, verbosity, precision);
profileRunner.run();
