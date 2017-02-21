'use strict';

const join = require('path').join;
const VERBOSITY = require(join(__appRoot, 'src/support/verbosity'));

module.exports = {
  iterations: 1000,
  verbosity: VERBOSITY.DEFAULT,
  testdataMagnitude: 1000
};
