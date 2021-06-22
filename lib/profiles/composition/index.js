/* eslint-disable no-unused-vars */
const { unique } = require('../../support/array');

const destructureObject = {
  description: 'Destructuring an Object',
  codeSample: 'const { a, b } = obj',
  keywords: [
    'assignment',
    'object',
    'destructuring',
    'decomposition',
    'composition'
  ].sort(),
  f: (d) => {
    const { num, obj } = d;
  },
  testDataType: 'object'
};

const destructureObjectDefault = {
  description: 'Destructuring an Object with default values',
  codeSample: 'const { a = i } = obj',
  keywords: [
    'assignment',
    'object',
    'destructuring',
    'decomposition',
    'composition',
    'default',
    'values'
  ].sort(),
  f: (d) => {
    const { num = 5, foo = 'bar' } = d;
  },
  testDataType: 'object'
};

const destructureArray = {
  description: 'Destructuring an Array',
  codeSample: 'const [a,b] = arr',
  keywords: [
    'assignment',
    'array',
    'destructuring',
    'decomposition',
    'composition'
  ].sort(),
  f: (d) => {
    const [a, b] = d;
  },
  testDataType: 'array'
};

const destructureArrayDefault = {
  description: 'Destructuring an Array with default values',
  codeSample: 'const [a = i, b] = arr',
  keywords: [
    'assignment',
    'array',
    'destructuring',
    'decomposition',
    'composition',
    'default',
    'values'
  ].sort(),
  f: (d) => {
    const [a = 5, b] = d;
  },
  testDataType: 'array'
};

const destructureArrayTail = {
  description: 'Destructuring an Array with tail',
  codeSample: 'const [a,b, ...tail] = arr',
  keywords: [
    'assignment',
    'array',
    'destructuring',
    'decomposition',
    'composition',
    'rest',
    'tail'
  ].sort(),
  f: (d) => {
    const [a, b, ...tail] = d;
  },
  testDataType: 'array'
};

const assignArray = {
  description: 'Assignment from array items',
  codeSample: 'const a = arr[i]',
  keywords: [
    'array',
    'assignment',
    'decomposition',
    'composition'
  ].sort(),
  f: (d) => {
    const a = d[0];
    const b = d[1];
  },
  testDataType: 'array'
};

const assignArrayDefault = {
  description: 'Assignment from array items with default',
  codeSample: 'const a = arr[i] || j',
  keywords: [
    'array',
    'assignment',
    'decomposition',
    'composition',
    'default',
    'values'
  ].sort(),
  f: (d) => {
    const a = d[0] || 5;
    const b = d[1];
  },
  testDataType: 'array'
};

const assignObject = {
  description: 'Assignment from object properties',
  codeSample: 'const a = obj.b',
  keywords: [
    'object',
    'assignment',
    'decomposition',
    'composition'
  ].sort(),
  f: (d) => {
    const str = d.obj.str;
  },
  testDataType: 'object'
};

const assignObjectDefault = {
  description: 'Assignment from object properties with default',
  codeSample: 'const a = obj.b || i',
  keywords: [
    'object',
    'assignment',
    'decomposition',
    'composition',
    'default',
    'values'
  ].sort(),
  f: (d) => {
    const str = d.obj.foo || 'bar';
  },
  testDataType: 'object'
};

const destructureSwapArray = {
  description: 'Swapping variables via Array destructuring',
  codeSample: 'const [a, b] = [b, a]',
  keywords: [
    'array',
    'destructuring',
    'swap',
    'variables',
    'composition',
    'decomposition'
  ],
  f: (d) => {
    let a = d[0];
    let b = d[1];
    [a, b] = [b, a];
  },
  testDataType: 'array'
};

const assignSwapArray = {
  description: 'Swapping variables via assignment',
  codeSample: 'const c = b; b = a; a = c;',
  keywords: [
    'swap',
    'variables',
    'composition',
    'decomposition'
  ],
  f: (d) => {
    let a = d[0];
    let b = d[1];
    const c = b;
    b = a;
    a = c;
  },
  testDataType: 'array'
};

const functions = [
  destructureArray,
  destructureArrayDefault,
  destructureArrayTail,
  destructureObject,
  destructureObjectDefault,
  destructureSwapArray,
  assignArray,
  assignArrayDefault,
  assignObject,
  assignObjectDefault,
  assignSwapArray
];

module.exports = {
  name: '(de-)composition',
  description: {
    short: '(De-)composing objects, variables and arrays.',
    long: '(De-)composing objects, variables and arrays from each other.'
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions
};
/* eslint-enable no-unused-vars */
