'use strict';

const join = require('path').join;
const testdata = require(join(__appRoot, 'support/testdata/testdata'))();

const delta = (start) => {
  if (!Array.isArray(start)) {
    throw new Error(`Invalid parameter: not an array! ${typeof start} ${start}`);
  }

  const end = process.hrtime(start);
  return (end[0] * 1000) + (end[1] / 1000000);
};

const time = (f, d) => {
  if (typeof f !== 'function') {
    throw new Error(`Invalid parameter: not a function! ${typeof f} ${f}`);
  }

  if (typeof d === 'undefined') {
    d = testdata;
  }

  const s = process.hrtime();
  f(d);
  return delta(s);
};

module.exports = {
  delta,
  time
};
