const clock = require('../clock');

const profileWithMemory = (fn, data) => {
  gc();
  const heapUsedStart = process.memoryUsage().heapUsed;
  return {
    time: clock.time(fn, data),
    heap: process.memoryUsage().heapUsed - heapUsedStart
  };
};

module.exports = (options) => {
  if (options.memory) {
    if (typeof gc !== 'function') {
      throw new Error('Set to measure memory consumption without exposing the garbage collector! Try running with the --expose-gc flag.');
    }

    return profileWithMemory(options.fn, options.data);
  }

  return {
    time: clock.time(options.fn, options.data)
  };
};
