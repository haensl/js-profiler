const unique = require('../../support/array').unique;

const forIn = {
  description: 'for property in object loop',
  keywords: [
    'for',
    'in',
    'property',
    'forin',
    'loop',
    'object',
    'iteration'
  ].sort(),
  codeSample: 'for (const prop in obj) { } => string',
  f: (d) => {
    let s = '';
    for (const p in d) {
      s = `${s}${p}`;
    }
    return s;
  }
};

const keys = {
  description: 'iterating an object\'s keys with forEach',
  keywords: [
    'foreach',
    'loop',
    'iteration',
    'object',
    'keys',
    'property'
  ].sort(),
  codeSample: 'Object.keys(obj).forEach() => string',
  f: (d) => {
    let s = '';
    Object.keys(d).forEach((p) => {
      s = `${s}${p}`;
    });
    return s;
  }
};

const entries = {
  description: 'iterating an object\'s entries with forEach',
  keywords: [
    'foreach',
    'loop',
    'iteration',
    'object',
    'entries',
    'property'
  ].sort(),
  codeSample: 'Object.entries(obj).forEach => string',
  f: (d) => {
    let s = '';
    Object.entries(d).forEach((e) => {
      s = `${s}${e[0]}`;
    });
    return s;
  }
};

const forOfMap = {
  description: 'iterating a Map\'s keys with for of',
  keywords: [
    'forof',
    'for',
    'of',
    'keys',
    'map',
    'property',
    'loop',
    'iteration'
  ].sort(),
  codeSample: 'for (prop of Map.keys()) => string',
  f: (d) => {
    let s = '';
    for (const p of d.keys()) {
      s = `${s}${p}`;
    }
    return s;
  },
  testDataType: 'map'
};

const forOfObject = {
  description: 'iterating an object\'s keys with for of',
  keywords: [
    'forof',
    'for',
    'of',
    'keys',
    'object',
    'property',
    'loop',
    'iteration'
  ].sort(),
  codeSample: 'for (prop of Object.keys(obj)) => string',
  f: (d) => {
    let s = '';
    for (const p of Object.keys(d)) {
      s = `${s}${p}`;
    }
    return s;
  }
};

const forOfObjectChecked = {
  description: 'iterating an object\'s keys in a for of loop with own-property check',
  keywords: [
    'forof',
    'for',
    'of',
    'keys',
    'object',
    'property',
    'loop',
    'iteration',
    'check',
    'hasownperperty',
    'own',
    'ownproperty'
  ].sort(),
  codeSample: 'for (prop of Object.keys(obj)) { obj.hasOwnProperty(prop) && ... }',
  f: (d) => {
    let s = '';
    for (const p of Object.keys(d)) {
      if (d.hasOwnProperty(p)) { // eslint-disable-line
        s = `${s}${p}`;
      }
    }
    return s;
  }
};

const forOfNames = {
  description: 'iterating an object\'s own property names with for of',
  keywords: [
    'forof',
    'for',
    'of',
    'names',
    'property',
    'own',
    'ownpropertynames',
    'ownprops',
    'ownproperties',
    'getownpropertynames',
    'object',
    'loop'
  ].sort(),
  codeSample: 'for (prop of Object.getOwnPropertyNames(obj)) => string',
  f: (d) => {
    let s = '';
    for (const p of Object.getOwnPropertyNames(d)) {
      s = `${s}${p}`;
    }
    return s;
  }
};

const ownPropNames = {
  description: 'iterating an object\'s own property names with forEach',
  keywords: [
    'foreach',
    'names',
    'property',
    'own',
    'names',
    'ownpropertynames',
    'ownprops',
    'ownproperties',
    'getownpropertynames',
    'object',
    'loop'
  ].sort(),
  codeSample: 'Object.getOwnPropertyNames(obj).forEach() => string',
  f: (d) => {
    let s = '';
    Object.getOwnPropertyNames(d).forEach((p) => {
      s = `${s}${p}`;
    });
    return s;
  }
};

const functions = [
  entries,
  forIn,
  forOfMap,
  forOfNames,
  forOfObject,
  forOfObjectChecked,
  keys,
  ownPropNames
];

module.exports = {
  name: 'object iteration',
  description: {
    long: 'Object iteration: different ways of iterating over properties of an object and concatenating property names into a single string.',
    short: 'Object iteration: concatenating property names into a string.'
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions,
  testDataType: 'object'
};
