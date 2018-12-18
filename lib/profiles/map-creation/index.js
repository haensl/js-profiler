const randInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

const alphabet = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const randStr = (len = 3) => {
  let str = '';
  while(str.length < len) {
    str = `${str}${alphabet[randInt(alphabet.length - 1)]}`;
  }

  return str;
};

const genKey = (numProps, obj) => {
  const hashLen = Math.ceil(numProps / alphabet.length);
  let h = randStr(hashLen);
  const isTaken = (k, obj) => {
    if (obj instanceof Map) {
      return obj.has(k);
    }

    return h in obj;
  }

  while (isTaken(h, obj)) {
    h = randStr(hashLen);
  }

  return h;
};

const setMap = {
  description: 'Map.set()',
  f: (d) => {
    const m = new Map();
    d.forEach((dp) => m.set(genKey(d.length, m), dp));
    return m;
  }
};

const createMap = {
  description: 'new Map([props])',
  f: (d) => {
    return new Map(d.map((dp, i, arr) => [genKey(d.length, arr), dp]));
  }
};

const setObject = {
  description: '{}.prop =',
  f: (d) => {
    const m = {};
    d.forEach((dp) => m[genKey(d.length, m)] = dp);
    return m;
  }
};

const defineProperty = {
  description: 'Object.defineProperty({}, prop, desc)',
  f: (d) => {
    const m = {};
    d.forEach((dp) =>
      Object.defineProperty(m, genKey(d.length, m), {
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
    Object.defineProperties(m, d.reduce((props, dp) =>
      Object.assign(props, {
        [genKey(d.length, props)]: {
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
