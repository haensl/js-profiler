'use strict';

const join = require('path').join;
const DEFAULTS = require(join(__appRoot, 'src/support/defaults'));

const testArray = (len) => {
  let i = len;
  const data = [];
  while (i--) {
    data.push(i);
  }

  return data;
};

const testObject = () => ({
    num: 1,
    obj: {
      str: 'd'
    },
    str: 'f',
    arr: [],
    bool: true
});

const testdata = (type = 'array', len = DEFAULTS.testdataMagnitude) => {
  switch(type) {
    case 'object':
      return testObject();
    default:
      return testArray(len);
  }
};

module.exports = testdata;
