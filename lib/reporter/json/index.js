const events = require('../../support/events');
const Reporter = require('../reporter');

class JSONReporter extends Reporter {
  reportOn(profileRunner) {
    return super.reportOn(profileRunner)
      .then((report) => {
        console.info(JSON.stringify(report, null, 2));
        return report;
      });
  }
}

module.exports = JSONReporter;
