#!/usr/bin/env node
const GetOpt = require('node-getopt');
const chalk = require('chalk');
const log = require('@haensl/log');
const DEFAULTS = require('../lib/support/defaults');
const VERBOSITY = require('../lib/support/verbosity');
const UNITS = require('../lib/support/units');
const jsProfiler = require('../lib');

const opts = new GetOpt([
  ['h', 'help', 'Display this helptext.'],
  ['i', 'iterations=', `Specify the number of iterations per profiled function. Default: ${DEFAULTS.iterations}.`],
  ['j', 'json', 'Output results in JSON format.'],
  ['l', 'list', 'List available profiles.'],
  ['m', 'magnitude=', `Specify the magnitude of testdata. Default: ${DEFAULTS.magnitude}.`],
  ['', 'memory', 'If present, memory consumption is measured.'],
  ['p', 'precision=', `Specify the precision in terms of decimal places of results. Default: ${DEFAULTS.precision.time},${DEFAULTS.precision.memory}. Separate time and memory precision by comma.`],
  ['q', 'quiet', 'Print results only.'],
  ['u', 'unit=', `Specify the unit for time and memory output. Default: ${DEFAULTS.units.time},${DEFAULTS.units.memory}. Possible values: auto (automatically convert between milli- and microseconds), ms (milliseconds), µs (microseconds), B (Bytes), KB (kilobytes), MB (megabytes). Separate time and memory unit by comma.`],
  ['v', 'verbose', 'Print verbose information.']
]).setHelp(
  'Usage: js-profiler [OPTIONS] [profile1 profile2 ...]\n\n'
  + 'Parameters:\n'
  + '  profile1 profile2 ...\n'
  + '  Optionally specify the profiles you want to run separated by spaces.\n\n'
  + 'Options:\n'
  + '[[OPTIONS]]\n'
).bindHelp().parseSystem();

const options = {
  ...DEFAULTS,
  console: true
};

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
  const profileList = jsProfiler.list();
  if (options.json) {
    log.info(JSON.stringify(profileList.map((p) => {
      switch(options.verbosity) {
        case VERBOSITY.VERBOSE:
          return Object.assign({}, p, { description: p.description.long });
        case VERBOSITY.NORMAL:
          return {
            name: p.name,
            description: p.description.short
          };
      }
    }).filter((p) => typeof p === 'object'), null, 2));
  } else {
    log.info(profileList.map((profile) => {
      switch (options.verbosity) {
        case VERBOSITY.VERBOSE:
          return `${chalk.bold.underline(profile.name)}\n`
            + `${profile.description.long}\n`
            + 'Profiled functions:\n'
            + `${profile.functions.map((f) => `  ${f}`)
                .join('\n')}`;
        case VERBOSITY.NORMAL:
          return `${chalk.bold.underline(profile.name)}: ${profile.description.short}`;
      }
    }).filter((p) => typeof p === 'string').join('\n\n'));
  }

  process.exit(0);
}

if ('iterations' in opts.options) {
  if (!isNaN(parseInt(opts.options.iterations, 10))) {
    options.iterations = parseInt(opts.options.iterations, 10);
  } else {
    log.warn(chalk.yellow(`WARNING: "${opts.options.iterations}" is not a valid iterations number. Defaulting to ${options.iterations}.`));
  }
}

if ('magnitude' in opts.options) {
  if (!isNaN(parseInt(opts.options.magnitude, 10))) {
    options.magnitude = parseInt(opts.options.magnitude, 10);
  } else {
    log.warn(chalk.yellow(`WARNING: "${opts.options.magnitude}" is not a valid magnitude number. Defaulting to ${options.magnitude}.`));
  }
}

if ('precision' in opts.options) {
  const precision = opts.options.precision.split(',');
  if (!isNaN(parseInt(precision[0], 10))) {
    options.precision.time = precision[0];
  } else {
    log.warn(chalk.yellow(`WARNING: "${precision[0]}" is not a valid time precision. Defaulting to ${options.precision.time}.`));
  }

  if (precision.length > 1) {
    if (!isNaN(parseInt(precision[1], 10))) {
      options.precision.memory = precision[1];
    } else {
      log.warn(chalk.yellow(`WARNING: "${precision[1]}" is not a valid memory precision. Defaulting to ${options.precision.memory}.`));
    }
  }
}

if ('unit' in opts.options) {
  const [timeUnit, memoryUnit] = opts.options.unit.split(',');
  if (UNITS.isValidTimeUnit(timeUnit)) {
    options.units.time = timeUnit;
    if (UNITS.isAliasForTimeUnit(timeUnit)) {
      options.units.time = UNITS.getAliasForTimeUnit(timeUnit);
    }
  } else {
    log.warn(chalk.yellow(`WARNING: "${timeUnit}" is not a valid time unit. Defaulting to ${options.units.time}.`));
  }

  if (memoryUnit) {
    if (UNITS.isValidMemoryUnit(memoryUnit)) {
      options.units.memory = memoryUnit;
    } else {
      log.warn(chalk.yellow(`WARNING: "${memoryUnit}" is not a valid memory unit. Defaulting to ${options.units.memory}.`));
    }
  }
}

if ('memory' in opts.options) {
  options.memory = true;
}

if (opts.argv.length > 0) {
  options.profiles = opts.argv;
}

jsProfiler.run(options)
  .catch((err) => {
    log.error(err.message, err.stack);
    process.exit(1);
  });
