if (!('requireModule' in global)) {
  const join = require('path').join;
  const appRoot = join('..', __dirname);
  global.requireModule = (module) => require(join(appRoot, module));
}

const profiles = requireModule('lib/profiles');
const DEFAULTS = requireModule('lib/support/defaults');
const ProfileRunner = requireModule('lib/profile-runner');
const Reporter = requireModule('lib/reporter/reporter');
const ConsoleReporter = requireModule('lib/reporter/console');
const JSONReporter = requireModule('lib/reporter/json');

module.exports = {
  list: (verbosity = DEFAULTS.verbosity) => profiles.map((profile) => ({
    name: profile.name,
    description: profile.description,
    functions: profile.functions.map((f) => f.description)
  })),
  run: (options = DEFAULTS) => {
    let p = profiles.slice();
    if (Array.isArray(options.profiles)) {
      p = profiles.filter((profile) =>
        options.profiles.includes(profile.name));
    }

    let reporter;
    if (options.json) {
      reporter = new JSONReporter(options);
    } else if (options.console) {
      reporter = new ConsoleReporter(options);
    } else {
      reporter = new Reporter(options);
    }

    const profileRunner = new ProfileRunner({
      iterations: options.iterations,
      magnitude: options.magnitude,
      memory: options.memory,
      profiles: p
    });

    const promise = reporter.reportOn(profileRunner);
    profileRunner.run();
    return promise;
  }
};
