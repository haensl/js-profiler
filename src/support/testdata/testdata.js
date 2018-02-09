'use strict';

const DEFAULTS = requireModule('src/support/defaults');

const testdata = (len = DEFAULTS.testdataMagnitude) => {
  let i = len;
  const data = [];
  while (i--) {
    data.push(i);
  }
  return data;
};

module.exports = testdata;
