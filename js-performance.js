#!/usr/bin/env node
'use strict';

global.__appRoot = __dirname;

const glob = require('glob');
const join = require('path').join;
const GetOpt = require('node-getopt');
const DEFAULTS = require(join(__appRoot, 'support/defaults'));
const VERBOSITY = require(join(__appRoot, 'support/verbosity'));
const clock = require(join(__appRoot, 'support/clock/clock'));

const opts = new GetOpt([
  ['h', 'help', 'Display this helptext.'],
  ['i', 'iterations=', 'Specify the number of iterations per profiled function.'],
  ['q', 'quiet', 'Print results only.'],
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

const speak = verbosity > VERBOSITY.QUIET;

let profiles = [];
if (opts.argv.length > 0) {
  opts.argv.forEach((profileName) => {
    const discoveredProfiles = glob.sync(`profiles/**/@(${profileName}.profile|${profileName}.profile.js|${profileName}.js)`);
    if (discoveredProfiles.length === 1) {
      profiles.push(require(join(__appRoot, discoveredProfiles.pop())));
    } else if (speak){
      console.info(`Skipping unknown profile "${profileName}".`);
    }
  });
} else {
  profiles = profiles.concat(require(join(__appRoot, 'profiles/all')));
}

if (speak) {
  console.info(`Executing ${profiles.length} profile${profiles.length === 1 ? '' : 's'}.`);
  if (iterations > 1
    && verbosity > VERBOSITY.DEFAULT) {
    console.info(`Results are averaged over ${iterations} iterations per profiled function.\n`);
  }
}

let profile;
let numProfiles = profiles.length;
while(numProfiles--) {
  profile = profiles[numProfiles];
  if (speak) {
    console.info(profile.description(verbosity));
  }
  profile.functions.forEach((fn) => {
    let i = iterations;
    let sum = 0;
    while (i--) {
      sum += clock.time(fn.f);
    }

    if (speak) {
      console.info('\t|..');
    }
    console.info(`${speak ? '\t   ' : ''}${fn.description(verbosity)}: ${sum / iterations}ms`);
  });
}
