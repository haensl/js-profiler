'use strict';

const testdata = (() => {
  let i = 1000000;
  const data = [];
  while(i--) {
    data.push(i);
  }
  return data;
})();

module.exports = testdata;
