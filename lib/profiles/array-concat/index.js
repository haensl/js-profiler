const testdata = require('../../support/testdata');

const concat = {
  description: '[].concat([])',
  f: (d) => {
    const e = testdata();
    return d.concat(e);
  }
};

const concatForPush = {
  description: 'for (...) { [].push() }',
  f: (d) => {
    const e = testdata();
    for (let i = 0; i < e.length; i++) {
      d.push(e[i]);
    }

    return d;
  }
};

const concatForUnshift = {
  description: 'for (...) { [].unshift() }',
  f: (d) => {
    const e = testdata();
    for (let i = d.length - 1; i >= 0; i--) {
      e.unshift(d[i]);
    }

    return e;
  }
};

const concatApplyPush = {
  description: '[].push.apply()',
  f: (d) => {
    const e = testdata();
    d.push.apply(d, e);
    return d;
  }
};

const concatApplyUnshift = {
  description: '[].unshift.apply()',
  f: (d) => {
    const e = testdata();
    e.unshift.apply(e, d);
    return e;
  }
};

const concatReduce = {
  description: '[].reduce((arr, item) => arr.push(item))',
  f: (d) => {
    const e = testdata();
    return e.reduce((r, i) => {
      r.push(i);
      return r;
    }, d)
  }
};

const concatReduceRight = {
  description: '[].reduceRight((arr, item) => arr.unshift(item))',
  f: (d) => {
    const e = testdata();
    return d.reduceRight((r, i) => {
      r.unshift(i);
      return r;
    }, e)
  }
};

module.exports = {
  name: 'Array concatenation',
  description: {
    long: 'Array concatenation variations: Combining two arrays using different techniques.',
    short: 'Array concatenation variations.'
  },
  functions: [
    concat,
    concatForPush,
    concatForUnshift,
    concatApplyPush,
    concatApplyUnshift,
    concatReduce,
    concatReduceRight
  ]
};
