const DEFAULTS = require('../defaults');

const intArray = (len) => {
  let i = len;
  const data = [];
  while (i--) {
    data.push(i);
  }

  return data;
};

const definedObject = () => ({
  num: 1,
  obj: {
    str: 'd'
  },
  str: 'f',
  arr: [],
  bool: true
});

const objectMap = (len) => {
  let i = len;
  const m = {};
  while (i--) {
    m[i] = i;
  }

  m.size = len;
  return m;
};

const map = (len) => {
  let i = len;
  const m = new Map();
  while (i--) {
    m.set(i, i);
  }

  return m;
};

const randFloat = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) =>
  Math.random() * (max - min) + min;

module.exports = (type = 'array', len = DEFAULTS.magnitude, min, max) => {
  switch(type) {
    case 'object':
      return definedObject();
    case 'objectMap':
      return objectMap(len);
    case 'map':
      return map(len);
    case 'number':
      return randFloat(min, max);
    case 'arrays':
      return [intArray(len), intArray(len)];
    default:
      return intArray(len);
  }
};

