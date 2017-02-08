'use strict';

const testdata = (() => {
  let i = 1000000;
  const data = [];
  while(i--) {
    data.push(i);
  }
  return data;
})();

const clock = (start) => {
  if (typeof start === 'undefined') {
    return process.hrtime();
  }

  const end = process.hrtime(start);
  return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

const time = (f, d) => {
  if (typeof f !== 'function') {
    throw new Error(`Invalid paramter: not a function! ${typeof f} ${f}`);
  }

  if (typeof d === 'undefined') {
    d = testdata;
  }

  const s = clock();
  f(d);
  return clock(s);
};

module.exports = {
  clock,
  time
};
