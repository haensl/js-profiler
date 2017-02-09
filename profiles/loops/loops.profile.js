'use strict';
const join = require('path').join;
const VERBOSITY = require(join(__appRoot, 'support/verbosity'));

const loopForEach = {
  description: (verbosity) => '[].forEach() => []',
  f: (d) => {
    const r = [];
    d.forEach((dp) => r.push(dp < 5 && dp > 3));
    return r;
  }
};

const loopFor = {
  description: () => 'for(i++, i < d.length) => []',
  f: (d) => {
    const r = [];
    let dp;
    for (let i = 0; i < d.length; i++) {
      dp = d[i];
      r.push(dp < 5 && dp > 3);
    }

    return r;
  }
};

const loopForFixedLen = {
  description: () => 'for(i++, i < len) => []',
  f: (d) => {
    const r = [];
    const len = d.length;
    let dp;
    for (let i = 0; i < len; i++) {
      dp = d[i];
      r.push(dp < 5 && dp > 3);
    }

    return r;
  }
};

const loopInverseWhile = {
  description: () => 'while(i--) => []',
  f: (d) => {
    const r = [];
    let i = d.length;
    let dp;
    while(i--) {
      dp = d[i];
      r.push(dp < 5 && dp > 3);
    }

    return r.reverse();
  }
};

const loopWhile = {
  description: () => 'while(i < d.length) => []',
  f: (d) => {
    const r = [];
    let i = 0;
    let dp;
    while (i < d.length) {
      dp = d[i];
      r.push(dp < 5 && dp > 3);
      i++;
    }

    return r;
  }
};

const loopWhileFixedLen = {
  description: () => 'while(i < len) => []',
  f: (d) => {
    const r = [];
    const len = d.length;
    let i = 0;
    let dp;
    while (i < len) {
      dp = d[i];
      r.push(dp < 5 && dp > 3);
      i++;
    }

    return r;
  }
};

const loopMap = {
  description: () => '[].map() => []',
  f: (d) => d.map((dp) => dp < 5 && dp > 3)
};

module.exports = {
  description: (verbosity) => {
    switch (verbosity) {
      case VERBOSITY.QUIET:
        return '';
      case VERBOSITY.VERBOSE:
        return 'Loop variations: Converting an array of integers into an array of booleans satisfying a conjunction of two simple relational operations.';
      default:
        return 'Loop variations.';
    }
  },
  functions: [
    loopForEach,
    loopFor,
    loopForFixedLen,
    loopInverseWhile,
    loopMap,
    loopWhile,
    loopWhileFixedLen
  ]
};
