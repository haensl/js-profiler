const units = {
  time: [
    'auto',
    'ms',
    'µs'
  ],
  memory: [
    'B',
    'KB',
    'MB'
  ]
};

module.exports = {
  AUTO: units.time[0],
  MILLISECONDS: units.time[1],
  MICROSECONDS: units.time[2],
  BYTES: units.memory[0],
  KILOBYTES: units.memory[1],
  MEGABYTES: units.memory[2],
  MEMORY_CONVERSION_FACTOR: 1024,
  hrToMicro: (hrtime) => (hrtime[0] * 1000 * 1000) + (hrtime[1] / 1000),
  milliToMicro: (t) => t * 1000,
  microToMilli: (t) => t / 1000,
  byteToKilobyte: (m) => m / 1024,
  kilobyteToMegabyte: (m) => m / 1024,
  isValidTimeUnit: (u) => units.time.includes(u),
  isValidMemoryUnit: (u) => units.memory.includes(u)
};
