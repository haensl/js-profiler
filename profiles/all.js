'use strict';
const glob = require('glob');
const path = require('path');
module.exports =
  glob.sync('**/*.profile.js').reduce((allProfiles, profile) => Object.assign(allProfiles, require(path.join(__dirname, path.basename(profile)))), {});
