const testdata = require('../../support/testdata');

const concat = {
  description: 'a.concat(b)',
  f: (d) => {
    const e = testdata();
    return d.concat(e);
  }
};

const concatForPush = {
  description: 'for (...) { a.push(b[i]) }',
  f: (d) => {
    const e = testdata();
    for (let i = 0; i < e.length; i++) {
      d.push(e[i]);
    }

    return d;
  }
};

const concatForUnshift = {
  description: 'for (...) { b.unshift(a[i]) }',
  f: (d) => {
    const e = testdata();
    for (let i = d.length - 1; i >= 0; i--) {
      e.unshift(d[i]);
    }

    return e;
  }
};

const concatApplyPush = {
  description: 'a.push.apply(a, b)',
  f: (d) => {
    const e = testdata();
    d.push.apply(d, e);
    return d;
  }
};

const concatApplyUnshift = {
  description: 'b.unshift.apply(b, a)',
  f: (d) => {
    const e = testdata();
    e.unshift.apply(e, d);
    return e;
  }
};

const concatReduce = {
  description: 'b.reduce((arr, item) => arr.push(item), a)',
  f: (d) => {
    const e = testdata();
    return e.reduce((r, i) => {
      r.push(i);
      return r;
    }, d)
  }
};

const concatReduceRight = {
  description: 'a.reduceRight((arr, item) => arr.unshift(item), b)',
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
