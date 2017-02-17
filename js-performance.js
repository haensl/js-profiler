#!/usr/bin/env node

'use strict';

global.__appRoot = __dirname;

const glob = require('glob');
const join = require('path').join;
const GetOpt = require('node-getopt');
const DEFAULTS = require(join(__appRoot, 'support/defaults'));
const VERBOSITY = require(join(__appRoot, 'support/verbosity'));
const testdata = require(join(__appRoot, 'support/testdata/testdata'));
const ProfileRunner = require(join(__appRoot, 'profile-runner'));
const Reporter = require(join(__appRoot, 'reporter/reporter'));

const opts = new GetOpt([
    ['h', 'help', 'Display this helptext.'],
    ['i', 'iterations=', `Specify the number of iterations per profiled function. Default: ${DEFAULTS.iterations}.`],
    ['q', 'quiet', 'Print results only.'],
    ['m', 'magnitude=', `Specify the magnitude of testdata. Default: ${DEFAULTS.testdataMagnitude}.`],
    ['v', 'verbose', 'Print verbose information.']
]).bindHelp()
  .parseSystem();

let iterations = DEFAULTS.iterations;
if ('iterations' in opts.options &&
  !isNaN(parseInt(opts.options.iterations, 10))) {
  iterations = parseInt(opts.options.iterations, 10);
}

let verbosity = DEFAULTS.verbosity;
if ('quiet' in opts.options) {
  verbosity = VERBOSITY.QUIET;
}

if ('verbose' in opts.options) {
  verbosity = VERBOSITY.VERBOSE;
}

let data;
if ('magnitude' in opts.options &&
  !isNaN(parseInt(opts.options.magnitude, 10))) {
  data = testdata(parseInt(opts.options.magnitude, 10));
} else {
  data = testdata();
}

const speak = verbosity > VERBOSITY.QUIET;

let profiles = [];
if (opts.argv.length > 0) {
  opts.argv.forEach((profileName) => {
    const discoveredProfiles = glob.sync(`profiles/**/@(${profileName}.profile|${profileName}.profile.js|${profileName}.js)`);
    if (discoveredProfiles.length === 1) {
      profiles.push(require(join(__appRoot, discoveredProfiles.pop()))); // eslint-disable-line
    } else if (speak) {
      console.info(`Skipping unknown profile "${profileName}".`);
    }
  });
} else {
  profiles = profiles.concat(require(join(__appRoot, 'profiles/all'))); // eslint-disable-line
}

const testRunner = new ProfileRunner({
  iterations,
  profiles,
  data
});

const reporter = new Reporter(testRunner, verbosity);
testRunner.run();
testRunner.run();
testRunner.run();
