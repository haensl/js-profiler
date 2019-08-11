const unique = require('../../support/array').unique;

const compGreater = {
  description: '>, greater than',
  keywords: [
    'comparison',
    'greater',
    'operator'
  ].sort(),
  codeSample: 'a > b',
  f: (d) => d > 5
};

const compGreaterEqual = {
  description: '>=, greater than or equal to',
  keywords: [
    'comparison',
    'greater',
    'equal',
    'operator'
  ].sort(),
  codeSample: 'a >= b',
  f: (d) => d >= 5
};

const compLess = {
  description: '<, less than',
  keywords: [
    'comparison',
    'less',
    'operator'
  ].sort(),
  codeSample: 'a < b',
  f: (d) => d < 5
};

const compLessEqual = {
  description: '<=,less than or equal to',
  keywords: [
    'comparison',
    'less',
    'equal',
    'operator'
  ].sort(),
  codeSample: 'a <= b',
  f: (d) => d <= 5
};

const compEqlLoose = {
  description: '==, loose equality',
  keywords: [
    'comparison',
    'equal',
    'loose',
    'equality'
  ].sort(),
  codeSample: 'a == b',
  f: (d) => d == 5 // eslint-disable-line eqeqeq
};

const compEqlStrict = {
  description: '===, strict equality, identity, tripple equals',
  keywords: [
    'comparison',
    'equal',
    'strict',
    'equality',
    'identity',
    'tripple',
    'equals',
    'type'
  ].sort(),
  codeSample: 'a === b',
  f: (d) => d === 5
};

const compNotEqlLoose = {
  description: '!=, loose non-equality',
  keywords: [
    'comparison',
    'equal',
    'loose',
    'equality',
    'not',
    'nonequal'
  ].sort(),
  codeSample: 'a != b',
  f: (d) => d != 5 // eslint-disable-line eqeqeq
};

const compNotEqlStrict = {
  description: '!==, strict non-equality',
  keywords: [
    'comparison',
    'equal',
    'strict',
    'equality',
    'not',
    'nonequal'
  ].sort(),
  codeSample: 'a !== b',
  f: (d) => d !== 5
};

const compAnd = {
  description: '&&, logical and operator',
  keywords: [
    'comparison',
    'logical',
    'and',
    'boolean',
    'operator'
  ].sort(),
  codeSample: 'a && b',
  f: (d) => d && d - 5
};

const compOr = {
  description: '||, logical or operator',
  keywords: [
    'comparison',
    'logical',
    'or',
    'boolean',
    'operator'
  ].sort(),
  codeSample: 'a || b',
  f: (d) => d || d - 5
};

const functions = [
  compGreater,
  compGreaterEqual,
  compLess,
  compLessEqual,
  compEqlLoose,
  compEqlStrict,
  compNotEqlLoose,
  compNotEqlStrict,
  compAnd,
  compOr
];

module.exports = {
  name: 'comparison operators',
  description: {
    long: 'Variable comparison operators.',
    short: 'Comparison operators.'
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions,
  testDataType: 'number'
};
