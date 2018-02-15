if (!('requireModule' in global)) {
  const join = require('path').join;
  const appRoot = join('..', __dirname);
  global.requireModule = (module) => require(join(appRoot, module));
}

let profiles = requireModule('lib/profiles');
const DEFAULTS = requireModule('lib/support/defaults');
const ProfileRunner = requireModule('lib/profile-runner');
const Reporter = requireModule('lib/reporter/reporter');
const ConsoleReporter = requireModule('lib/reporter/console');
const JSONReporter = requireModule('lib/reporter/json');


/**
 * @param {object} options options := {
 *  list {boolean} indicate whether or not to list all available profiles
 */
module.exports = (options = DEFAULTS) => {
    if (options.list) {
      return Promise.resolve(profiles.map((profile) => ({
        name: profile.name,
        description: profile.description(options.verbosity)
      })));
    }

    if (Array.isArray(options.profiles)) {
      profiles = profiles.filter((profile) =>
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
      profiles
    });

    const promise = reporter.reportOn(profileRunner);
    profileRunner.run();
    return promise;
  };
