const units = ['auto', 'ms', 'µs', 'B', 'KB', 'MB'];
module.exports = {
  AUTO: units[0],
  MILLISECONDS: units[1],
  MICROSECONDS: units[2],
  BYTES: units[3],
  KILOBYTES: units[4],
  MEGABYTES: units[5],
  MEMORY_CONVERSION_FACTOR: 1024,
  hrToMicro: (hrtime) => (hrtime[0] * 1000 * 1000) + (hrtime[1] / 1000),
  milliToMicro: (t) => t * 1000,
  microToMilli: (t) => t / 1000,
  byteToKilobyte: (m) => m / 1024,
  kilobyteToMegabyte: (m) => m / 1024,
  isValidUnit: (u) => units.includes(u)
};
