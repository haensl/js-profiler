const setMap = {
  description: 'Map.set()',
  f: (d) => {
    const m = new Map();
    d.forEach((dp, i) => m.set(i, dp));
    return m;
  }
};

const createMap = {
  description: 'new Map([props])',
  f: (d) => {
    return new Map(d.map((dp, i, arr) => [i, dp]));
  }
};

const setObject = {
  description: '{}.prop =',
  f: (d) => {
    const m = {};
    d.forEach((dp, i) => m[i] = dp);
    return m;
  }
};

const defineProperty = {
  description: 'Object.defineProperty({}, prop, desc)',
  f: (d) => {
    const m = {};
    d.forEach((dp, i) =>
      Object.defineProperty(m, i, {
        value: dp,
        enumerable: true
      })
    );
    return m;
  }
};

const defineProperties = {
  description: 'Object.defineProperties({}, props)',
  f: (d) => {
    const m = {};
    Object.defineProperties(m, d.reduce((props, dp, i) =>
      Object.assign(props, {
        [i]: {
          value: dp,
          enumerable: true
        }
      }), {}));
    return m;
  }
};

const spread = {
  description: '{ ...props }',
  f: (d) => ({
    ...d
  })
};

module.exports = {
  name: 'map:creation',
  description: {
    long: 'Object literal vs. Map: creating a map.',
    short: 'Object literal vs. Map creation.'
  },
  functions: [
    createMap,
    defineProperty,
    defineProperties,
    setMap,
    setObject,
    spread
  ],
  testDataType: 'array'
};
