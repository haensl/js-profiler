const unique = require('../../support/array').unique;

const guardStrictTypeofNotUndefined = {
  description: 'strict comparison using typeof against \'undefined\'',
  keywords: [
    'check',
    'typeof',
    'strict',
    'comparison',
    'triple equals',
    'identity',
    'type',
    'undefined',
    'defined',
    'equality',
    'operator'
  ].sort(),
  codeSample: 'typeof d !== \'undefined\'',
  f: (d) => typeof d !== 'undefined'
};

const guardLooseTypeofNotUndefined = {
  description: 'loose comparison using typeof against \'undefined\'',
  keywords: [
    'check',
    'typeof',
    'loose',
    'comparison',
    'triple equals',
    'identity',
    'type',
    'undefined',
    'defined',
    'equality',
    'operator'
  ].sort(),
  codeSample: 'typeof d != \'undefined\'',
  f: (d) => typeof d != 'undefined' // eslint-disable-line eqeqeq
};

const guardStrictDefined = {
  description: 'strict comparison against null and undefined',
  keywords: [
    'check',
    'equality',
    'strict',
    'comparison',
    'tripple equals',
    'identity',
    'null',
    'undefined',
    'defined',
    'operator'
  ].sort(),
  codeSample: '!(d === undefined || d === null)',
  f: (d) => !(d === undefined || d === null)
};

const guardLooseDefined = {
  description: 'loose comparison against null and undefined',
  keywords: [
    'check',
    'equality',
    'loose',
    'comparison',
    'tripple equals',
    'identity',
    'null',
    'undefined',
    'defined',
    'operator'
  ].sort(),
  codeSample: '!(d == undefined || d == null)',
  f: (d) => !(d == undefined || d == null) // eslint-disable-line eqeqeq
};

const guardStrictTypeofIsTypeNumber = {
  description: 'strict comparison using typeof against \'number\'',
  keywords: [
    'strict',
    'comparison',
    'equality',
    'tripple equals',
    'identity',
    'number',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d === \'number\'',
  f: (d) => typeof d === 'number'
};

const guardLooseTypeofIsTypeNumber = {
  description: 'loose comparison using typeof against \'number\'',
  keywords: [
    'loose',
    'comparison',
    'equality',
    'tripple equals',
    'identity',
    'number',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d == \'number\'',
  f: (d) => typeof d == 'number' // eslint-disable-line eqeqeq
};

const guardStrictTypeofIsTypeString = {
  description: 'strict comparison using typeof against \'string\'',
  keywords: [
    'strict',
    'comparison',
    'equality',
    'tripple equals',
    'identity',
    'string',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d === \'string\'',
  f: (d) => typeof d === 'string'
};

const guardLooseTypeofIsTypeString = {
  description: 'loose comparison using typeof against \'string\'',
  keywords: [
    'loose',
    'comparison',
    'equality',
    'tripple equals',
    'identity',
    'string',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d == \'string\'',
  f: (d) => typeof d == 'string' // eslint-disable-line eqeqeq
};

const guardStrictTypeofIsTypeObject = {
  description: 'strict comparison using typeof against \'object\'',
  keywords: [
    'strict',
    'equality',
    'comparison',
    'tripple equals',
    'identity',
    'object',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d === \'object\'',
  f: (d) => typeof d === 'object'
};

const guardLooseTypeofIsTypeObject = {
  description: 'loose comparison using typeof against \'object\'',
  keywords: [
    'loose',
    'equality',
    'comparison',
    'tripple equals',
    'identity',
    'object',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d === \'object\'',
  f: (d) => typeof d == 'object' // eslint-disable-line eqeqeq
};

const guardStrictTypeofIsTypeFunction = {
  description: 'strict comparison using typeof against \'function\'',
  keywords: [
    'strict',
    'equality',
    'comparison',
    'tripple equals',
    'identity',
    'function',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d === \'function\'',
  f: (d) => typeof d === 'function'
};

const guardLooseTypeofIsTypeFunction = {
  description: 'loose comparison using typeof against \'function\'',
  keywords: [
    'loose',
    'equality',
    'comparison',
    'tripple equals',
    'identity',
    'function',
    'typeof',
    'type',
    'operator'
  ].sort(),
  codeSample: 'typeof d == \'function\'',
  f: (d) => typeof d == 'function' // eslint-disable-line eqeqeq
};

const guardIsArray = {
  description: 'Array\'s isArray() method',
  keywords: [
    'equality',
    'comparison',
    'identity',
    'type',
    'array',
    'isArray',
    'method'
  ].sort(),
  codeSample: 'Array.isArray(d)',
  f: (d) => Array.isArray(d)
};

const guardNotNot = {
  description: 'double negation, !!, "not, not"',
  keywords: [
    'not',
    'notnot',
    '!',
    '!!',
    'defined',
    'type',
    'negation',
    'double',
    'bool',
    'boolean',
    'operator'
  ].sort(),
  codeSample: '!!var',
  f: (d) => !!d
};

const guardNot = {
  description: 'negation, !, "not"',
  keywords: [
    'not',
    '!',
    'defined',
    'type',
    'negation',
    'operator',
    'bool',
    'boolean'
  ].sort(),
  codeSample: '!var',
  f: (d) => !d
};

const guardGlobalNotIsNaN = {
  description: 'negated global isNaN()',
  keywords: [
    'not',
    'nan',
    'not a number',
    'number',
    'defined',
    'type',
    'isnan',
    'global',
    'method'
  ].sort(),
  codeSample: '!isNaN(var)',
  f: (d) => !isNaN(d)
};

const guardNumberNotIsNaN = {
  description: 'negated Number\'s isNaN() method',
  keywords: [
    'not',
    'nan',
    'not a number',
    'number',
    'defined',
    'type',
    'isnan',
    'method'
  ].sort(),
  codeSample: '!Number.isNaN(var)',
  f: (d) => !Number.isNaN(d)
};

const guardGlobalIsNaN = {
  description: 'global isNaN() method',
  keywords: [
    'number',
    'defined',
    'type',
    'isnan',
    'not a number',
    'not',
    'global',
    'method'
  ].sort(),
  codeSample: 'isNaN(var)',
  f: (d) => isNaN(d)
};

const guardNumberIsNaN = {
  description: 'Number\'s isNaN() method',
  keywords: [
    'number',
    'defined',
    'type',
    'isnan',
    'not a number',
    'not',
    'method'
  ].sort(),
  codeSample: 'Number.isNaN(var)',
  f: (d) => Number.isNaN(d)
};

const guardIn = {
  description: 'the \'in\' operator',
  keywords: [
    'in',
    'property',
    'existence',
    'prop',
    'object',
    'defined',
    'type',
    'operator'
  ].sort(),
  codeSample: 'prop in obj',
  f: (d) => 'num' in d,
  testDataType: 'object'
};

const guardTargetHasOwnProperty = {
  description: 'Object\'s hasOwnProperty() method called on target',
  keywords: [
    'property',
    'existence',
    'prop',
    'object',
    'defined',
    'type',
    'hasownproperty',
    'method',
    'target',
    'prototype'
  ].sort(),
  codeSample: 'obj.hasOwnProperty(prop)',
  f: (d) => d.hasOwnProperty('num'), // eslint-disable-line no-prototype-builtins
  testDataType: 'object'
};

const guardObjectHasOwnProperty = {
  description: 'Object\'s hasOwnProperty() method called from Object prototype',
  keywords: [
    'property',
    'existence',
    'prop',
    'object',
    'defined',
    'type',
    'hasownproperty',
    'method',
    'prototype'
  ].sort(),
  codeSample: 'Object.prototype.hasOwnProperty.call(obj, prop)',
  f: (d) => Object.prototype.hasOwnProperty.call(d, 'num'),
  testDataType: 'object'
};

const functions = [
  guardStrictTypeofNotUndefined,
  guardLooseTypeofNotUndefined,
  guardStrictTypeofIsTypeFunction,
  guardLooseTypeofIsTypeFunction,
  guardStrictTypeofIsTypeNumber,
  guardLooseTypeofIsTypeNumber,
  guardStrictTypeofIsTypeObject,
  guardLooseTypeofIsTypeObject,
  guardStrictTypeofIsTypeString,
  guardLooseTypeofIsTypeString,
  guardIsArray,
  guardNotNot,
  guardNot,
  guardGlobalIsNaN,
  guardNumberIsNaN,
  guardGlobalNotIsNaN,
  guardNumberNotIsNaN,
  guardIn,
  guardTargetHasOwnProperty,
  guardObjectHasOwnProperty,
  guardStrictDefined,
  guardLooseDefined
];

module.exports = {
  name: 'guards',
  description: {
    short: 'Variable guards.',
    long: 'Variable guards: checking whether a variable is defined or of a certain type.'
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions
};
