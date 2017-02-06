'use strict';

module.exports = {
  loopForEach: (d) => {
    const r = [];
    d.forEach((dp) => r.push(dp > 5 && dp < 3));
    return r;
  },
  loopInverseWhile: (d) => {
    const r = [];
    let i = d.length;
    while(i--) {
      r.push(dp > 5 && dp < 3);
    }
    return r;
  },
  loopMap: (d) => d.map(dp > 5 && dp < 3)
};


