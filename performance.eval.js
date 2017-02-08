#!/usr/bin/env node
'use strict';
const DEFAULT_ITERATIONS = 1000000;
const join = require('path').join;
const pf = require(join(__dirname, 'performance/performance'));

console.log('args', process.argv);

const iterations = DEFAULT_ITERATIONS;

console.info(`Performing all available performance tests [average of ${iterations} iterations per test]...`);
const functionsToProfile = require(join(__dirname, 'profiles/all'));

Object.keys(functionsToProfile).forEach((functionName) => {
  const fn = functionsToProfile[functionName];
  let i = iterations;
  let sum = 0;
  while (i--) {
    sum += pf.time(fn);
  }
  console.info(`${functionName}: ${sum / iterations}ms`);
});





