'use strict';

const join = require('path').join;
const DEFAULTS = require(join(__appRoot, 'src/support/defaults'));

const testdata = (len = DEFAULTS.testdataMagnitude) => {
  let i = len;
  const data = [];
  while (i--) {
    data.push(i);
  }
  return data;
};

module.exports = testdata;
