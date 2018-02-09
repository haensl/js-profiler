const VERBOSITY = requireModule('lib/support/verbosity');

const guardTypeofNotUndefined = {
  description: () => 'typeof !== undefined',
  f: (d) => typeof d.num !== 'undefined'
};

const guardTypeofIsType = {
  description: () => 'typeof === type',
  f: (d) => typeof d.num === 'number'
};

const guardIsArray = {
  description: () => 'Array.isArray',
  f: (d) => Array.isArray(d.arr)
};

const guardNotNot = {
  description: () => '!!var',
  f: (d) => !!d.str
};

const guardNot = {
  description: () => '!var',
  f: (d) => !d.str
};

const guardIsNaN = {
  description: () => '!isNaN(var)',
  f: (d) => !isNaN(d.num)
};

const guardIn = {
  description: () => 'prop in obj',
  f: (d) => 'num' in d
};

const guardHasOwnProperty = {
  description: () => 'obj.hasOwnProperty(prop)',
  f: (d) => d.hasOwnProperty('num')
};

module.exports = {
  name: 'guards',
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
    guardTypeofNotUndefined,
    guardTypeofIsType,
    guardIsArray,
    guardNotNot,
    guardNot,
    guardIsNaN,
    guardIn,
    guardHasOwnProperty
  ],
  testDataType: 'object'
};
