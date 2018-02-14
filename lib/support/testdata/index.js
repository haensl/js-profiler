'use strict';

const DEFAULTS = requireModule('lib/support/defaults');

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

module.exports = (type = 'array', len = DEFAULTS.testdataMagnitude) => {
  switch(type) {
    case 'object':
      return definedObject();
    case 'objectMap':
      return objectMap(len);
    case 'map':
      return map(len);
    default:
      return intArray(len);
  }
};

