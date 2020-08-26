const { unique } = require('../../support/array');

const copySlice = {
  description: 'Array\'s slice() method',
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
  description: 'copy using Array spread syntax',
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
  description: 'copy using Array.from()',
  keywords: [
    'array',
    'copy',
    'from',
    'method'
  ],
  codeSample: 'Array.from(a)',
  f: (d) => Array.from(d[0])
};

const copyNewArray = {
  description: 'spread into Array constructor',
  keywords: [
    'array',
    'copy',
    'new',
    'constructor'
  ],
  codeSample: 'new Array(...a)',
  f: (d) => new Array(...d[0])
};

const copyConcatAB = {
  description: 'concatenate empty Array literal',
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
  description: 'concatenate onto empty Array literal',
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
  description: 'prepend to empty Array literal',
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
    const b = [];
    Array.prototype.unshift.apply(b, d[0]);
    return b;
  }
};

const copyPrependPreallocate = {
  description: 'prepend to constructed Array',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'apply',
    'unshift',
    'prepend',
    'insert',
    'constructor',
    'new'
  ],
  codeSample: 'b = new Array(); Array.prototype.unshift.apply(b, a)',
  f: (d) => {
    const b = new Array();
    Array.prototype.unshift.apply(b, d[0]);
    return b;
  }
};

const copyAppendLiteral = {
  description: 'append to Array literal using spread',
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
    const b = [];
    b.push(...d[0]);
    return b;
  }
};

const copyAppendSpreadPreallocate = {
  description: 'append to constructed Array using spread',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'constructor',
    'new',
    'push',
    'spread',
    'append',
    'insert'
  ],
  codeSample: 'b = new Array(); b.push(...a)',
  f: (d) => {
    const b = new Array();
    b.push(...d[0]);
    return b;
  }
};

const copyAppendForPreallocate = {
  description: 'append to constructed Array in a for loop',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'constructor',
    'new',
    'push',
    'append',
    'insert'
  ],
  codeSample: 'b = new Array(); for (...) { b.push(a[i]) }',
  f: (d) => {
    const a = d[0];
    const b = new Array();
    const { length } = a;
    for (let i = 0; i < length; i++) {
      b.push(a[i]);
    }

    return b;
  }
};

const copyAppendForLiteral = {
  description: 'append to Array literal in a for loop',
  keywords: [
    'array',
    'copy',
    'push',
    'for',
    'loop',
    'append',
    'insert',
    'literal'
  ],
  codeSample: 'b = []; for (...) { b.push(a[i]) }',
  f: (d) => {
    const a = d[0];
    const b = [];
    const { length } = a;
    for (let i = 0; i < length; ++i) {
      b.push(a[i]);
    }

    return b;
  }
};

const copySetForPreallocate = {
  description: 'preallocate new Array and assign values in a for loop',
  keywords: [
    'array',
    'copy',
    'preallocate',
    'set',
    'for',
    'loop',
    'assign',
    'constructor',
    'new'
  ],
  codeSample: 'b = new Array(a.length); for (...) { b[i] = a[i]; }',
  f: (d) => {
    const a = d[0];
    const { length } = a;
    const b = new Array(length);
    for (let i = 0; i < length; ++i) {
      b[i] = a[i];
    }

    return b;
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
  copyAppendForPreallocate,
  copyAppendSpreadPreallocate,
  copyAppendForLiteral,
  copySetForPreallocate
];

module.exports = {
  name: 'array copying',
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
