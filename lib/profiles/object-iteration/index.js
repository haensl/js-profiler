const forIn = {
  description: 'for prop in obj => string',
  f: (d) => {
    let s = '';
    for (const p in d) {
      s = `${s}${p}`;
    }
    return s;
  }
};

const keys = {
  description: 'Object.keys(obj).forEach => string',
  f: (d) => {
    let s = '';
    Object.keys(d).forEach((p) => {
      s = `${s}${p}`;
    });
    return s;
  }
};

const entries = {
  description: 'Object.entries(obj).forEach => string',
  f: (d) => {
    let s = '';
    Object.entries(d).forEach((e) => {
      s = `${s}${e[0]}`;
    });
    return s;
  }
};

const forOfMap = {
  description: 'for (prop of Map.keys()) => string',
  f: (d) => {
    let s = '';
    for (let p of d.keys()) {
      s = `${s}${p}`;
    }
    return s;
  },
  testDataType: 'map'
};

const forOfObject = {
  description: 'for (prop of Object.keys(obj)) => string',
  f: (d) => {
    let s = '';
    for (let p of Object.keys(d)) {
      s = `${s}${p}`;
    }
    return s;
  }
};

const forOfObjectChecked = {
  description: 'for (prop of Object.keys(obj)) with hasOwnProperty() check => string',
  f: (d) => {
    let s = '';
    for (let p of Object.keys(d)) {
      if (d.hasOwnProperty(p)) {
        s = `${s}${p}`;
      }
    }
    return s;
  }
};

const forOfNames = {
  description: 'for (prop of Object.getOwnPropertyNames(obj)) => string',
  f: (d) => {
    let s = '';
    for (let p of Object.getOwnPropertyNames(d)) {
      s = `${s}${p}`;
    }
    return s;
  }
};

const ownPropNames = {
  description: 'Object.getOwnPropertyNames(obj).forEach => string',
  f: (d) => {
    let s = '';
    Object.getOwnPropertyNames(d).forEach((p) => {
      s = `${s}${p}`;
    });
    return s;
  }
};

module.exports = {
  name: 'object iteration',
  description: {
    long: 'Object iteration: different ways of iterating over properties of an object and concatenating property names into a single string.',
    short: 'Object iteration: concatenating property names into a string.'
  },
  functions: [
    entries,
    forIn,
    forOfMap,
    forOfNames,
    forOfObject,
    forOfObjectChecked,
    keys
  ],
  testDataType: 'object'
};
