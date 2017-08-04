'use strict';

const join = require('path').join;
const VERBOSITY = require(join(__appRoot, 'support/verbosity'));

const filter = {
  description: () => '[].filter',
  f: (d) => {
    var i = d[Math.floor(Math.random() * d.length)];
    return d.filter((x) => x === i)[0];
  }
};

const binSearch = (d, i) => {
  if (!(Array.isArray(d) && d.length)) {
    return;
  }

  var pivot = Math.floor(d.length / 2);
  var pivotItem = d[pivot];
  if (pivotItem === i) {
    return pivotItem;
  } else if (pivotItem > i) {
    return binSearch(d.slice(0, pivot), i);
  }

  return binSearch(d.slice(pivot), i);
};

const binarySearch = {
  description: () => 'binary search',
  f(d) {
    var i = d[Math.floor(Math.random() * d.length)];
    return binSearch(d, i);
  }
};

module.exports = {
  description: (verbosity) => {
    switch (verbosity) {
      case VERBOSITY.QUIET:
        return '';
      case VERBOSITY.VERBOSE:
        return 'Array search variations. Array.prototype.filter vs. Binary-Search';
      default:
        return 'Array search';
    }
  },
  functions: [
    binarySearch,
    filter
  ]
};
