const VERBOSITY = requireModule('lib/support/verbosity');
const UNITS = requireModule('lib/support/units');

module.exports = {
  iterations: 1000,
  verbosity: VERBOSITY.NORMAL,
  magnitude: 1000,
  memory: false,
  precision: {
    time: 4,
    memory: 4
  },
  units: {
    time: UNITS.AUTO,
    memory: UNITS.AUTO
  },
  json: false,
  console: false
};
