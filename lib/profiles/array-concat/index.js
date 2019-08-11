const unique = require('../../support/array').unique;

const concat = {
  description: 'Array\'s concat() method',
  keywords: [
    'array',
    'concat',
    'concatenation',
    'method'
  ].sort(),
  codeSample: 'a.concat(b)',
  f: (d) => d[0].concat(d[1])
};

const concatForPush = {
  description: 'append elements in a for loop',
  keywords: [
    'array',
    'concatenation',
    'for',
    'loop',
    'push',
    'append',
    'insert'
  ].sort(),
  codeSample: 'for (...) { a.push(b[i]) }',
  f: (d) => {
    for (let i = 0; i < d[1].length; i++) {
      d[0].push(d[1][i]);
    }

    return d[0];
  }
};

const concatForUnshift = {
  description: 'prepend elements in a foor loop',
  keywords: [
    'array',
    'concatenation',
    'for',
    'loop',
    'unshift',
    'prepend',
    'insert'
  ].sort(),
  codeSample: 'for (...) { b.unshift(a[i]) }',
  f: (d) => {
    for (let i = d[0].length - 1; i >= 0; i--) {
      d[1].unshift(d[0][i]);
    }

    return d[1];
  }
};

const concatApplyPush = {
  description: 'append elements using apply()',
  keywords: [
    'array',
    'concatenation',
    'apply',
    'push',
    'append',
    'insert'
  ].sort(),
  codeSample: 'a.push.apply(a, b)',
  f: (d) => {
    d[0].push.apply(d[0], d[1]);
    return d[0];
  }
};

const concatApplyUnshift = {
  description: 'prepend elements using apply()',
  keywords: [
    'array',
    'concatenation',
    'apply',
    'unshift',
    'prepend',
    'insert'
  ].sort(),
  codeSample: 'b.unshift.apply(b, a)',
  f: (d) => {
    d[1].unshift.apply(d[1], d[0]);
    return d[1];
  }
};

const concatReduce = {
  description: 'append elements using reduce()',
  keywords: [
    'array',
    'concatenation',
    'reduce',
    'push',
    'append',
    'insert'
  ].sort(),
  codeSample: 'b.reduce((arr, item) => arr.push(item), a)',
  f: (d) => d[1].reduce((r, i) => {
    r.push(i);
    return r;
  }, d[0])
};

const concatReduceRight = {
  description: 'prepend elements using reduceRight()',
  keywords: [
    'array',
    'concatenation',
    'reduce',
    'reduceright',
    'unshift',
    'prepend',
    'insert'
  ].sort(),
  codeSample: 'a.reduceRight((arr, item) => arr.unshift(item), b)',
  f: (d) => d[0].reduceRight((r, i) => {
    r.unshift(i);
    return r;
  }, d[1])
};

const concatPrependSpread = {
  description: 'prepend elements using array spread syntax',
  keywords: [
    'array',
    'concatenation',
    'spread',
    'syntax',
    'prepend',
    'insert'
  ].sort(),
  codeSample: '[...a, ...b]',
  f: (d) => [...d[0], ...d[1]]
};

const functions = [
  concat,
  concatForPush,
  concatForUnshift,
  concatApplyPush,
  concatApplyUnshift,
  concatReduce,
  concatReduceRight,
  concatPrependSpread
];

module.exports = {
  name: 'Array concatenation',
  description: {
    long: 'Array concatenation variations: Combining two arrays using different techniques.',
    short: 'Array concatenation variations.'
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions,
  testDataType: 'arrays'
};
