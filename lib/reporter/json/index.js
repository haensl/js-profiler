const log = require('@haensl/log');
const Reporter = require('../reporter');

class JSONReporter extends Reporter {
  reportOn(profileRunner) {
    return super.reportOn(profileRunner)
      .then((report) => {
        log.info(JSON.stringify(report, null, 2));
        return report;
      });
  }
}

module.exports = JSONReporter;
