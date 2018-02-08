'use strict';

const join = require('path').join;
const VERBOSITY = require(join(__appRoot, 'src/support/verbosity'));

module.exports = {
  iterations: 1000,
  verbosity: VERBOSITY.NORMAL,
  testdataMagnitude: 1000,
  precision: 4
};
