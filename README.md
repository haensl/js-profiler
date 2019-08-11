# JS-Profiler

JavaScript profiling tool and library of profiling modules and benchmarks.

JS-Profiler allows you to compare different techniques and functions regarding execution speed and memory consumption. It reports results either in text or JSON format.

[![NPM](https://nodei.co/npm/js-profiler.png?downloads=true)](https://nodei.co/npm/js-profiler/)

[![Build Status](https://travis-ci.org/haensl/js-profiler.svg?branch=master)](https://travis-ci.org/haensl/js-profiler)

## Installation

`npm i [-g] js-profiler`

## New in version 2 & Migration from v1.x.y to v2.x.y
* `test.description` now containsa _nice_ human readable description.
* `test.codeSample` now contains a short pseudo-code sample of the function under test.
* use `test.code` to access the full source code of the function under test.
* `test.keywords` contains keywords associated with the function under test.

### Comparison of v2 vs. v1 profile object

#### Version 1.x.y profile object

```javascript
// v1
{
  "name" : "recursion",
  "description" : "Recursion variations: Calculating sum of array of integers. Profile contains a simple for-loop for reference.",
  "tests" : [
      {
          "description" : "for loop sum for reference",
          "time" : {
              "average" : "1.4923μs",
              "minimum" : "1.0970μs",
              "maximum" : "38.8230μs"
          }
      }, 
      {
          "description" : "recursive sum",
          "time" : {
              "average" : "1080.3024μs",
              "minimum" : "703.3320μs",
              "maximum" : "10215.1650μs"
          }
      }, 
      {
          "description" : "tail recursive sum",
          "time" : {
              "average" : "1041.0375μs",
              "minimum" : "704.2790μs",
              "maximum" : "16476.7110μs"
          }
      }
  ],
  "fastest" : [
      {
          "description" : "for loop sum for reference",
          "time" : {
              "average" : "1.4923μs",
              "minimum" : "1.0970μs",
              "maximum" : "38.8230μs"
          }
      }
  ]
}
```

#### Version 2.x.y profile object

```javascript
// v2
{
  "name": "recursion",
  "description": "Recursion.",
  "tests": [
    {
      "description": "for loop sum for reference",
      "keywords": [
        "for",
        "loop",
        "sum"
      ],
      "codeSample": "for (...) { sum += d[i] }",
      "code": "(d) => {\n    let sum = 0;\n    for (let i = 0; i < d.length; i++) {\n      sum += d[i];\n    }\n\n    return sum;\n  }",
      "time": {
        "average": "2.8409µs"
      }
    },
    {
      "description": "recursive sum",
      "keywords": [
        "recursion",
        "sum"
      ],
      "codeSample": "const f = (d) => (d && d.length && (d[0] + f(d.slice(1)))) || 0",
      "code": "(d) => (d && d.length && (d[0] + recursiveSum.f(d.slice(1)))) || 0",
      "time": {
        "average": "735.3804µs"
      }
    },
    {
      "description": "tail recursive sum",
      "keywords": [
        "recursion",
        "sum",
        "tail",
        "tailrecursion"
      ],
      "codeSample": "const f = (d, i = 0) => (!d.length && i) || f(d.slice(1), i + d[0])",
      "code": "(d, i = 0) => (!d.length && i)\n    || tailRecursiveSum.f(d.slice(1), i + d[0])",
      "time": {
        "average": "683.1078µs"
      }
    }
  ],
  "fastest": [
    {
      "description": "for loop sum for reference",
      "keywords": [
        "for",
        "loop",
        "sum"
      ],
      "codeSample": "for (...) { sum += d[i] }",
      "code": "(d) => {\n    let sum = 0;\n    for (let i = 0; i < d.length; i++) {\n      sum += d[i];\n    }\n\n    return sum;\n  }",
      "time": {
        "average": "2.8409µs"
      }
    }
  ]
}
```

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
