const join = require('path').join;
const VERBOSITY = require(join(__appRoot, 'src/support/verbosity'));

const guardTypeof = {
  description: () => 'typeof',
  f: (d) => typeof d !== 'undefined'
};

const guardIsArray = {
  description: () => 'Array.isArray',
  f: (d) => Array.isArray(d)
};

const guardNot = {
  description: () => '!!var',
  f: (d) => !!d
};

const guardIsNaN = {
  description: () => '!isNaN(var)',
  f: (d) => isNaN(d)
};

module.exports = {
  description: (verbosity) => {
    switch (verbosity) {
      case VERBOSITY.QUIET:
        return '';
      case VERBOSITY.VERBOSE:
        return 'Variable guards: checking whether a variable is defined.';
      default:
        return 'Variable guards';
    }
  },
  functions: [
    guardTypeof,
    guardIsArray,
    guardNot,
    guardIsNaN
  ]
};
