const units = {
  time: {
    auto: 'auto',
    microseconds: 'µs',
    milliseconds: 'ms',
    alias: {
      'microseconds': 'µs',
      'milliseconds': 'ms'
    },
    valid: [
      'auto',
      'ms',
      'µs',
      'microseconds',
      'milliseconds'
    ]
  },
  memory: [
    'B',
    'KB',
    'MB'
  ]
};

module.exports = {
  AUTO: units.time.auto,
  MILLISECONDS: units.time.milliseconds,
  MICROSECONDS: units.time.microseconds,
  BYTES: units.memory[0],
  KILOBYTES: units.memory[1],
  MEGABYTES: units.memory[2],
  MEMORY_CONVERSION_FACTOR: 1024,
  TIME_CONVERSTION_FACTOR: 1000,
  hrToMicro: (hrtime) => (hrtime[0] * 1000 * 1000) + (hrtime[1] / 1000),
  milliToMicro: (t) => t * 1000,
  microToMilli: (t) => t / 1000,
  byteToKilobyte: (m) => m / 1024,
  kilobyteToMegabyte: (m) => m / 1024,
  isValidTimeUnit: (u) => units.time.valid.includes(u),
  isValidMemoryUnit: (u) => units.memory.includes(u),
  isAliasForTimeUnit: (u) => Object.keys(units.time.alias).includes(u),
  getAliasForTimeUnit: (u) => units.time.alias[u]
};
