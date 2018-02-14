const VERBOSITY = requireModule('lib/support/verbosity');

const randInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));
const alphabet = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
const randStr = () => {
  let str = '';
  while(str.length < 3) {
    str = `${str}${alphabet[randInt(alphabet.length - 1)]}`;
  }

  return str;
};

const setMap = {
  description: () => 'Map.set()',
  f: (d) => {
    const m = new Map();
    d.forEach((dp) => m.set(randStr(), dp));
    return m;
  }
};

const setObject = {
  description: () => '{}.prop =',
  f: (d) => {
    const m = {};
    d.forEach((dp) => m[randStr()] = dp);
    return m;
  }
};

module.exports = {
  description: (verbosity) => {
    switch (verbosity) {
      case VERBOSITY.QUIET:
        return '';
      case VERBOSITY.VERBOSE:
        return 'Object literal vs. Map: creating a map.';
      default:
        return 'Object literal vs. Map creation.';
    }
  },
  functions: [
    setMap,
    setObject
  ],
  testDataType: 'array'
};
