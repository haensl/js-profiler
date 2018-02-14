const VERBOSITY = requireModule('lib/support/verbosity');
const events = requireModule('lib/support/events');
const Reporter = requireModule('lib/reporter/reporter');

class JSONReporter extends Reporter {
  constructor(verbosity, precision) {
    super(verbosity, precision);
    this.report = [];
    this.profiles = {};
  }

  reportOn(profileRunner) {
    super.reportOn(profileRunner);

    profileRunner.on(events.END, (profiles) => {
      console.info(JSON.stringify(this.report, null, 2));
    });

    profileRunner.on(events.PROFILE_START, (profile) => {
      this.profiles[profile.name] = [];
    });

    profileRunner.on(events.PROFILE_END, (profile, result) => {
      const best = this.bestResults(result);
      const p = {
        name: profile.name,
        description: profile.description(this.verbosity)
      };

      if (this.verbosity >= VERBOSITY.NORMAL) {
        p.tests = this.profiles[profile.name];
        p.fastest = best.map((b) => ({
          description: `${b.func.description()}`,
          average: this.formatTime(b.averageTime, true)
        }));
      }

      this.report.push(p);
    });

    profileRunner.on(events.TEST_END, (profile, func, result) => {
      if (this.verbosity >= VERBOSITY.NORMAL) {
        this.profiles[profile.name].push({
          description: func.description(),
          average: this.formatTime(result.averageTime, true)
        });
      }
    });
  }
}

module.exports = JSONReporter;
