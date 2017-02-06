'use strict';

const testdata = (() => {
  const i = 100;
  const data = [];
  while(i--) {
    data.push(i);
  }
})();

module.exports = {
  time: (f, d) => {
    if (typeof f !== 'function') {
      throw new Error('Invalid paramter: not a function!');
    }

    if (typeof d === 'undefined') {
      d = testdata;
    }

    const s = performance.now();
    f(d);
    return performance.now() - s;
  }
};
