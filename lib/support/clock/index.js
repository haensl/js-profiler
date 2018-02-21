const testdata = require('../testdata')();

/**
 *  Measures function execution time.
 *  @param {function} f the function to profile.
 *  @param {any} d the arguments to supply to the function.
 *  @returns {Array} an Array with high-resolution time information.
 */
const time = (f, d = testdata) => {
  const start = process.hrtime()
  f(d);
  return process.hrtime(start);
};

module.exports = {
  time
};
