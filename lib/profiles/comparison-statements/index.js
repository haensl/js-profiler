const unique = require('../../support/array').unique;

const compIf = {
  description: 'if statement',
  codeSample: 'if (d > 0) { return d / 2; }',
  keyowrds: [
    'if',
    'comparison',
    'statement',
    'else',
    'else if'
  ],
  f: (d) => {
    if (d === 0) {
      return d;
    } else if (d > 0) {
      return d / 2;
    } else {
      return 0;
    }
  }
};

const compSwitch = {
  description: 'switch (d) { case 0: return d; default: return d / 2; }',
  f: (d) => {
    switch (d) {
      case 0:
        return d;
      default:
        return d / 2;
    }
  }
};

const compTernary = {
  description: 'd > 0 ? d / 2 : d',
  f: (d) => d > 0 ? d / 2 : d
};

const compAnd = {
  description: '(d > 0 && d / 2) || d',
  f: (d) => (d > 0 && d / 2) || d
};

const functions = [
  compIf,
  compSwitch,
  compTernary,
  compAnd
];

module.exports = {
  name: 'comparison statements',
  description: {
    long: 'Comparison statements: conditionally branching in a function based on simple comparisons.',
    short: 'Comparison statements: if vs. switch vs. ternary vs. logical.'
  },
  functions: [
    compIf,
    compSwitch,
    compTernary,
    compAnd
  ],
  keywords: unique(
    functions.map((fn) => fn.keywords)
      .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
  ).sort(),
  testDataType: 'number'
};
