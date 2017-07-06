'use strict';

const join = require('path').join;
const DEFAULTS = require(join(__appRoot, 'support/defaults'));

const testdata = (len = DEFAULTS.testdataMagnitude) => {
  let i = 0;
  const data = [];
  while (++i < len) {
    data.push(i);
  }
  return data;
};

module.exports = testdata;
