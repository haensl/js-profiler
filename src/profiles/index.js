'use strict';

const glob = require('glob');
module.exports = glob.sync('**/*.profile.js')
  .reduce((allProfiles, profile) => {
    allProfiles.push(requireModule(profile)); // eslint-disable-line
    return allProfiles;
  }, []);
