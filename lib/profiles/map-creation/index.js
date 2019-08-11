const unique = require('../../support/array').unique;

const setMap = {
  description: 'Map.set() in a forEach loop',
  keywords: [
    'map',
    'creation',
    'set'
  ].sort(),
  codeSample: 'Map.set()',
  f: (d) => {
    const m = new Map();
    d.forEach((dp, i) => m.set(i, dp));
    return m;
  }
};

const createMap = {
  description: 'passing key-value pairs to the Map constructor',
  keywords: [
    'map',
    'creation',
    'construtor',
    'key-value',
    'pairs'
  ].sort(),
  codeSample: 'new Map([props])',
  f: (d) => new Map(d.map((dp, i) => [i, dp]))
};

const setObject = {
  description: 'setting properties on an Object literal',
  keywords: [
    'map',
    'creation',
    'object',
    'literal',
    'properties'
  ].sort(),
  codeSample: '{}.prop = val',
  f: (d) => {
    const m = {};
    d.forEach((dp, i) => m[i] = dp);
    return m;
  }
};

const defineProperty = {
  description: 'Object\'s definePropety() method on an Object literal',
  keywords: [
    'map',
    'creation',
    'object',
    'literal',
    'defineProperty',
    'properties'
  ].sort(),
  codeSample: 'Object.defineProperty({}, prop, desc)',
  f: (d) => {
    const m = {};
    d.forEach((dp, i) =>
      Object.defineProperty(m, i, {
        value: dp,
        enumerable: true
      })
    );
    return m;
  }
};

const defineProperties = {
  description: 'Object\'s defineProperties method on an Object literal',
  keywords: [
    'map',
    'creation',
    'object',
    'literal',
    'defineProperties',
    'properties'
  ].sort(),
  codeSample: 'Object.defineProperties({}, props)',
  f: (d) => {
    const m = {};
    Object.defineProperties(m, d.reduce((props, dp, i) =>
      Object.assign(props, {
        [i]: {
          value: dp,
          enumerable: true
        }
      }), {}));
    return m;
  }
};

const spread = {
  description: 'object spread syntax',
  keywords: [
    'map',
    'creation',
    'object',
    'literal',
    'spread',
    'syntax',
    'properties'
  ].sort(),
  codeSample: '{ ...props }',
  f: (d) => ({
    ...d
  })
};

const functions = [
  createMap,
  defineProperty,
  defineProperties,
  setMap,
  setObject,
  spread
];

module.exports = {
  name: 'map:creation',
  description: {
    long: 'Object literal vs. Map: creating a map.',
    short: 'Object literal vs. Map creation.'
  },
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  functions,
  testDataType: 'array'
};
