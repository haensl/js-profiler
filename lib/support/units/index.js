const units = ['auto', 'ms', 'µs'];
module.exports = {
  AUTO: units[0],
  MILLISECONDS: units[1],
  MICROSECONDS: units[2],
  hrToMicro: (hrtime) => (hrtime[0] * 1000 * 1000) + (hrtime[1] / 1000),
  milliToMicro: (t) => t * 1000,
  microToMilli: (t) => t / 1000,
  isValidUnit: (u) => units.includes(u)
};
