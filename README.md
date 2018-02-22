# JS-Profiler

JavaScript profiling tool and library of profiling modules and benchmarks.

JS-Profiler allows you to compare different techniques and functions regarding execution speed and memory consumption. It reports results either in text or JSON format.

[![NPM](https://nodei.co/npm/js-profiler.png?downloads=true)](https://nodei.co/npm/js-profiler/)

[![Build Status](https://travis-ci.org/haensl/js-profiler.svg?branch=master)](https://travis-ci.org/haensl/js-profiler)

## Installation

`npm i [-g] js-profiler`

## Usage

### CLI

If installed with the `-g` flag you can simply run js-profiler from your command line:

![Intro](intro.gif)

For further information please refer to the [CLI documentation](docs/cli.md) and the man page.

### Library

```javascript
// 1. Import the library
const jsProfiler = require('js-profiler');

// 2. Run the profiler
jsProfiler.run()
  .then((report) => {
    console.log(JSON.stringify(report, null, 2));
  });
```

For configuration options please refer to the [Library documentation](docs/lib.md).

## Currently implemented performance profiles:

##### guards
Variable guards: checking whether a variable is defined or of a certain type.

Profiled functions:
  * `typeof !== undefined`
  * `typeof === type`
  * `Array.isArray`
  * `!!var`
  * `!var`
  * `isNaN(var)`
  * `prop in obj`
  * `obj.hasOwnProperty(prop)`

##### loops
Loop variations: Converting an array of integers into an array of booleans satisfying a conjunction of two simple relational operations.

Profiled functions:
  * `[].forEach() => []`
  * `for(i++, i < d.length) => []`
  * `for(i++, i < len) => []`
  * `while(i--) => []`
  * `[].map() => []`
  * `while(i < d.length) => []`
  * `while(i < len) => []`

##### map:access
Object literal vs. Map: retrieving values.

Profiled functions:
  * `Map.get()`
  * `{}.prop`

##### map:creation
Object literal vs. Map: creating a map.

Profiled functions:
  * `Map.set()`
  * `{}.prop =`

##### recursion
Recurstion variations: Calculating sum of array of integers. Profile contains a simple for-loop for reference.

Profiled functions:
  * `for loop sum for reference`
  * `recursive sum`
  * `tail recursive sum`

### [Documentation](docs/index.md)

### [Changelog](CHANGELOG.md)

### [License](LICENSE)
