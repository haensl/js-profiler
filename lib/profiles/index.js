'use strict';

const glob = require('glob');
module.exports = glob.sync('lib/profiles/*/index.js')
  .reduce((allProfiles, profile) => {
    allProfiles.push(requireModule(profile));
    return allProfiles;
  }, []);
