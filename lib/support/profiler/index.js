const clock = require('../clock');

const profileWithMemory = async (fn, data) => {
  const heapUsedStart = process.memoryUsage().heapUsed;
  const time = await clock.time(fn, data);
  const heap = process.memoryUsage().heapUsed - heapUsedStart;
  return {
    time,
    heap
  };
};

module.exports = async (options) => {
  if (options.memory) {
    const result = await profileWithMemory(options.fn, options.data);
    return result;
  }

  const time = await clock.time(options.fn, options.data);
  return {
    time
  };
};
