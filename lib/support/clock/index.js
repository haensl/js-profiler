const {
  performance,
  PerformanceObserver
} = require('perf_hooks');
const testdata = require('../testdata')();

/**
 *  Measures function execution time.
 *  @param {function} f the function to profile.
 *  @param {any} d the arguments to supply to the function.
 *  @returns {Array} an Array with high-resolution time information.
 */
const time = (f, d = testdata) =>
  new Promise((resolve, reject) => {
    try {
      const wrapped = performance.timerify(f.bind(null, d));
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        observer.disconnect();
        resolve(entries[0].duration);
      });
      observer.observe({
        entryTypes: [
          'function'
        ]
      });
      wrapped();
    } catch (err) {
      reject(err);
    }
  });

module.exports = {
  time
};
