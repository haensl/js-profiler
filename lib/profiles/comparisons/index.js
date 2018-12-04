
const compGreater = {
  description: 'a > b',
  f: (d) => d > 5
};

const compGreaterEqual = {
  description: 'a >= b',
  f: (d) => d >= 5
}

const compLess = {
  description: 'a < b',
  f: (d) => d < 5
};

const compLessEqual = {
  description: 'a <= b',
  f: (d) => d <= 5
};

const compEql = {
  description: 'a == b',
  f: (d) => d == 5
};

const compEqual = {
  description: 'a === b',
  f: (d) => d === 5
};

const compNotEql = {
  description: 'a != b',
  f: (d) => d != 5
};

const compNotEqual = {
  description: 'a !== b',
  f: (d) => d !== 5
};

const compAnd = {
  description: 'a && b',
  f: (d) => d && d - 5
};

const compOr = {
  description: 'a || b',
  f: (d) => d || d - 5
};

module.exports = {
  name: 'comparison operators',
  description: {
    long: 'Variable comparison operators.',
    short: 'Comparison operators.'
  },
  functions: [
    compGreater,
    compGreaterEqual,
    compLess,
    compLessEqual,
    compEql,
    compEqual,
    compNotEql,
    compNotEqual,
    compAnd,
    compOr
  ],
  testDataType: 'number'
};
