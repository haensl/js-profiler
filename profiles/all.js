'use strict';

const glob = require('glob');
const path = require('path');
module.exports = glob.sync('**/*.profile.js')
  .reduce((allProfiles, profile) => {
    allProfiles.push(require(path.join(__appRoot, profile))); // eslint-disable-line
    return allProfiles;
  }, []);
