const randInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

const accessMap = {
  description: 'Map.get()',
  f: (d) => d.get(randInt(d.size - 1)),
  testDataType: 'map'
};

const accessObject = {
  description: '{}.prop',
  f: (d) => d[randInt(d.size - 1)],
  testDataType: 'objectMap'
};

module.exports = {
  name: 'map:access',
  description: {
    long: 'Object literal vs. Map: retrieving values.',
    short: 'Object literal vs. Map access.'
  },
  functions: [
    accessMap,
    accessObject,
  ]
};
