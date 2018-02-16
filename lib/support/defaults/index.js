const VERBOSITY = requireModule('lib/support/verbosity');
const UNITS = requireModule('lib/support/units');

module.exports = {
  iterations: 1000,
  verbosity: VERBOSITY.NORMAL,
  magnitude: 1000,
  precision: 4,
  unit: UNITS.AUTO,
  json: false,
  console: false
};
