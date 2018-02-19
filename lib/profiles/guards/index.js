const guardTypeofNotUndefined = {
  description: 'typeof !== undefined',
  f: (d) => typeof d !== 'undefined'
};

const guardTypeofIsType = {
  description: 'typeof === type',
  f: (d) => typeof d === 'number'
};

const guardIsArray = {
  description: 'Array.isArray',
  f: (d) => Array.isArray(d)
};

const guardNotNot = {
  description: '!!var',
  f: (d) => !!d
};

const guardNot = {
  description: '!var',
  f: (d) => !d
};

const guardNotIsNaN = {
  description: '!isNaN(var)',
  f: (d) => !isNaN(d)
};

const guardIsNaN = {
  description: 'isNaN(var)',
  f: (d) => isNaN(d)
}

const guardIn = {
  description: 'prop in obj',
  f: (d) => 'num' in d,
  testDataType: 'object'
};

const guardHasOwnProperty = {
  description: 'obj.hasOwnProperty(prop)',
  f: (d) => d.hasOwnProperty('num'),
  testDataType: 'object'
};

module.exports = {
  name: 'guards',
  description: {
    short: 'Variable guards',
    long: 'Variable guards: checking whether a variable is defined or of a certain type.'
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
  ]
};
