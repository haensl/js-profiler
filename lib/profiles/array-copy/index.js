const { unique } = require('../../support/array');

const copySlice = {
  description: 'array slice() method',
  codeSample: 'a.slice()',
  keywords: [
    'array',
    'copy',
    'slice',
    'method'
  ].sort(),
  f: (d) => d[0].slice()
};

const copySpread = {
  description: 'copy using array spread syntax',
  keywords: [
    'array',
    'copy',
    'spread',
    'syntax',
  ].sort(),
  codeSample: '[...a]',
  f: (d) => [...d[0]]
};

const copyFrom = {
  description: 'copy using Array.from() (ES6+)',
  keywords: [
    'array',
    'copy',
    'from',
    'method',
    'es6'
  ],
  codeSample: 'Array.from(a)',
  f: (d) => Array.from(d[0])
};

const copyNewArray = {
  description: 'copy using new Array constructor',
  keywords: [
    'array',
    'copy',
    'new',
    'constructor'
  ],
  codeSample: 'new Array(a)',
  f: (d) => new Array(d[0])
};

const copyConcatAB = {
  description: 'concatenate empty array literal',
  keywords: [
    'array',
    'copy',
    'concat',
    'method'
  ],
  codeSample: 'a.concat([])',
  f: (d) => d[0].concat([])
};

const copyConcatBA = {
  description: 'concatenate onto empty array literal',
  keywords: [
    'array',
    'copy',
    'concat',
    'method'
  ],
  codeSample: '[].concat(a)',
  f: (d) => [].concat(d[0])
};

const copyPrependLiteral = {
  description: 'prepend to empty array literal',
  codeSample: 'b = []; Array.prototype.unshift.apply(b, a)',
  keywords: [
    'array',
    'copy',
    'literal',
    'apply',
    'unshift',
    'prepend',
    'insert'
  ],
  f: (d) => {
    const b = []
    Array.prototype.unshift.apply(b, d[0])
    return b
  }
};

const copyPrependPreallocate = {
  description: 'preallocate then prepend',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'apply',
    'unshift',
    'prepend',
    'insert'
  ],
  codeSample: 'b = new Array(a.length); Array.prototype.unshift.apply(b, a)',
  f: (d) => {
    const b = new Array(a.length)
    Array.prototype.unshift.apply(b, d[0])
    return b
  }
};

const copyAppendLiteral = {
  description: 'append to array literal using push() and spread',
  keywords: [
    'array',
    'copy',
    'literal',
    'apply',
    'push',
    'spread',
    'append',
    'insert'
  ],
  codeSample: 'b = []; b.push(...a)',
  f: (d) => {
    const b = []
    b.push(...d[0])
    return b
  }
};

const copyAppendPreallocate = {
  description: 'preallocate new Array and append with spread',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'apply',
    'push',
    'spread',
    'append',
    'insert'
  ],
  codeSample: 'b = new Array(a.length); b.push(...a)',
  f: (d) => {
    const b = new Array(d[0].length)
    b.push(...d[0])
    return b
  }
};

const copyAppendForLiteral = {
  description: 'append to array literal in a for loop',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'apply',
    'push',
    'for',
    'loop',
    'append',
    'insert'
  ],
  codeSample: 'b = []; for (...) { b.push(a) }',
  f: (d) => {
    const a = d[0];
    const b = []
    const { length } = a;
    for (let i = 0; i < length; ++i) {
      b.push(a[i])
    }
    return b
  }
};

const copyAppendForPreallocate = {
  description: 'preallocate new Array and append in a for loop',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'apply',
    'push',
    'for',
    'loop',
    'append',
    'insert'
  ],
  codeSample: 'b = new Array(a.length); for (...) { b.push(a) }',
  f: (d) => {
    const a = d[0];
    const { length } = a;
    const b = new Array(length)
    for (let i = 0; i < length; ++i) {
      b.push(a[i])
    }
    return b
  }
};

const functions = [
  copySlice,
  copySpread,
  copyFrom,
  copyNewArray,
  copyConcatAB,
  copyConcatBA,
  copyPrependLiteral,
  copyPrependPreallocate,
  copyAppendLiteral,
  copyAppendPreallocate,
  copyAppendForLiteral,
  copyAppendForPreallocate
];

module.exports = {
  name: 'Array copying',
  description: {
    long: 'Array copying variations: creating a new array with the same elements as an existing array.',
    short: 'Array copying variations.',
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
    .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions,
  testDataType:'arrays'
};
