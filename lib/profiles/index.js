const glob = require('glob');
const path = require('path');

module.exports = glob.sync('lib/profiles/*/index.js')
  .reduce((allProfiles, profile) => {
    const profileName = path.dirname(profile)
      .split(path.sep)
      .pop();
    allProfiles.push(require(path.join(__dirname, profileName)));
    return allProfiles;
  }, []);
