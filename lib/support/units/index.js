const units = ['auto', 'ms', 'µs'];
module.exports = {
  AUTO: units[0],
  MILLISECONDS: units[1],
  MICROSECONDS: units[2],
  milliToMicro: (t) => t * 1000,
  isValidUnit: (u) => units.includes(u)
};
