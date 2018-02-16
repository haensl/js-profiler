const VERBOSITY = requireModule('lib/support/verbosity');

const randInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

const accessMap = {
  description: () => 'Map.get()',
  f: (d) => d.get(randInt(d.size - 1)),
  testDataType: 'map'
};

const accessObject = {
  description: () => '{}.prop',
  f: (d) => d[randInt(d.size - 1)],
  testDataType: 'objectMap'
};

module.exports = {
  name: 'map:access',
  description: (verbosity) => {
    switch (verbosity) {
      case VERBOSITY.QUIET:
        return '';
      case VERBOSITY.VERBOSE:
        return 'Object literal vs. Map: retrieving values.';
      default:
        return 'Object literal vs. Map access.';
    }
  },
  functions: [
    accessMap,
    accessObject,
  ]
};
