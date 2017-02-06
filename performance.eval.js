#!/usr/bin/env node
'use strict';
const DEFAULT_ITERATIONS = 1000;
const performance = require('performance');

console.log('args', process.argv);

const iterations = DEFAULT_ITERATIONS;

console.info(`Performing all available performance tests [${iterations} per test]...`);
const functionsToProfile = require('profiles/all');
Object.keys(functionsToProfile).forEach((functionName) => {
  const fn = functionsToProfile[functionName];
  let i = iterations;
  let sum = 0;
  while (i--) {
    sum += performance.profile(fn);
  }
  console.info(`${functionName}: ${sum / iterations}ms`);
});





