'use strict';
const join = require('path').join;
const appRoot = __dirname;
global.requireModule = (module) => require(join(appRoot, module));
