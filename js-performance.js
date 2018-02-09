#!/usr/bin/env node

'use strict';

const glob = require('glob');
const join = require('path').join;
const GetOpt = require('node-getopt');
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
    ['q', 'quiet', 'Print results only.'],
    ['m', 'magnitude=', `Specify the magnitude of testdata. Default: ${DEFAULTS.testdataMagnitude}.`],
    ['v', 'verbose', 'Print verbose information.']
  ]).bindHelp()
  .parseSystem();

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

let data;
if ('magnitude' in opts.options
  && !isNaN(parseInt(opts.options.magnitude, 10))) {
  data = testdata(parseInt(opts.options.magnitude, 10));
} else {
  data = testdata();
}

let profiles = [];
if (opts.argv.length > 0) {
  opts.argv.forEach((profileName) => {
    const discoveredProfiles = glob.sync(`src/profiles/**/@(${profileName}.profile|${profileName}.profile.js|${profileName}.js)`);
    if (discoveredProfiles.length === 1) {
      profiles.push(require(join(__appRoot, discoveredProfiles.pop()))); // eslint-disable-line
    } else if (verbosity >= VERBOSITY.NORMAL) {
      console.info(`Skipping unknown profile "${profileName}".`);
    }
  });
} else {
  profiles = profiles.concat(requireModule('src/profiles/all')); // eslint-disable-line
}

const profileRunner = new ProfileRunner({
  iterations,
  profiles,
  data
});

new Reporter(profileRunner, verbosity, DEFAULTS.timeout);
profileRunner.run();
