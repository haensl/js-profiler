# [JS-Profiler](https://js-profiler.com)

JavaScript profiling tool and library of profiling modules and benchmarks.

JS-Profiler allows you to compare different techniques, operators and functions regarding execution speed and memory consumption. It reports results either in text or JSON format.

JS-Profiler powers [https://js-profiler.com](https://js-profiler.com).

[![NPM](https://nodei.co/npm/js-profiler.png?downloads=true)](https://nodei.co/npm/js-profiler/)

[![Build Status](https://travis-ci.org/haensl/js-profiler.svg?branch=master)](https://travis-ci.org/haensl/js-profiler)

## Table of contents

* [Installation](#installation)
* [New in version 2 & Migration](#new-in-v2)
  * [Comparison of v1 vs. v2 profile object](#comp-v2-v1-profile)
    * [v1 profile object](#v1-profile)
    * [v2 profile object](#v2-profile)
* [Usage](#usage)
  * [CLI](#usage-cli)
  * [Library](#usage-lib)
* [Profiles](#profiles)
  * [array concatenation](#array-concat)
  * [comparison operators](#comparison-operators)
  * [guards](#guards)
  * [loops](#loops)
  * [map access](#map:access)
  * [map creation](#map:creation)
  * [object iteration](#object-iteration)
  * [recursion](#recursion)
* [Documentation](docs/index.md)
* [Changelog](CHANGELOG.md)
* [License](LICENSE)

## Installation<a name="installation"></a>

`npm i [-gS] js-profiler`

## New in version 2 & Migration from v1.x.y to v2.x.y<a name="new-in-v2"></a>

* `profile.tests` is renamed to `profile.functions`
* `function.description` _(formerly `test.description`)_ now contains a _nice_ human readable description.
* `function.codeSample` now contains a short pseudo-code sample of the function under test.
* use `function.code` to access the full source code of the function under test.
* `function.keywords` contains keywords associated with the function under test.
* `profile.keywords` contains keywords associated with this profile.

### Comparison of a v1 vs. v2 profile object<a name="comp-v2-v1-profile"></a>

#### Version 1.x.y profile object<a name="v1-profile"></a>

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

#### Version 2.x.y profile object<a name="v2-profile"></a>

```javascript
// v2
{
  "name": "recursion",
  "description": "Recursion.",
  "keywords": [
    "for",
    "loop",
    "recursion",
    "sum",
    "tail",
    "tailrecursion"
  ],
  "functions": [
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
        "average": "3.8774µs"
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
        "average": "733.7537µs"
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
        "average": "769.7328µs"
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
        "average": "3.8774µs"
      }
    }
  ]
}
```

## Usage<a name="usage"></a>

### CLI<a name="usage-cli"></a>

If installed with the `-g` flag you can simply run js-profiler from your command line:

![Intro](intro.gif)

For further information please refer to the [CLI documentation](docs/cli.md) and the man page.

### Library<a name="usage-lib"></a>

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

## Available performance profiles:<a name="profiles"></a>

### [guards](https://js-profiler.com/#guards)<a name="guards"></a>
Variable guards: checking whether a variable is defined or of a certain type.

Profiled operations:
  * `typeof !== 'undefined'`
  * `typeof != 'undefined'`
  * `typeof === 'function'`
  * `typeof == 'function'`
  * `typeof === 'number'`
  * `typeof == 'number'`
  * `typeof === 'object'`
  * `typeof == 'object'`
  * `typeof === 'string'`
  * `typeof == 'string'`
  * `Array.isArray`
  * `!!var`
  * `!var`
  * `isNaN(var)`
  * `Number.isNaN(var)`
  * `!isNaN(var)`
  * `!Number.IsNaN(var)`
  * `prop in obj`
  * `obj.hasOwnProperty(prop)`
  * `Object.prototype.hasOwnProperty.call(obj, prop)`

### [loops](https://js-profiler.com/#loops)<a name="loops"></a>
Loop variations: Converting an array of integers into an array of booleans satisfying a conjunction of two simple relational operations.

Profiled operations:
  * `[].forEach() => []`
  * `for(i++, i < d.length) => []`
  * `for(i++, i < len) => []`
  * `while(i--) => []`
  * `[].map() => []`
  * `while(i < d.length) => []`
  * `while(i < len) => []`
  * `do { } while (i < d.length)`
  * `do { } while (i < len)`
  * `for (prop of [])`

### [map access](https://js-profiler.com/#map:access)<a name="map:access"></a>
Object literal vs. Map: retrieving values.

Profiled operations:
  * `Map.get()`
  * `{}.prop`

### [map creation](https://js-profiler.com/#map:creation)<a name="map:creation"></a>
Object literal vs. Map: creating a map.

Profiled operations:
  * `Map.set()`
  * `new Map([props])`
  * `{}.prop = val`
  * `Object.defineProperty({}, prop, desc)`
  * `Object.defineProperties({}, props)`
  * `{ ...props }`

### [recursion](https://js-profiler.com/#recursion)<a name="recursion"></a>
Recurstion variations: Calculating sum of array of integers. Profile contains a simple for-loop for reference.

Profiled operations:
  * `for loop sum for reference`
  * `recursive sum`
  * `tail recursive sum`

### [array concatenation](https://js-profiler.com/#array-concatenation)<a name="array-concat"></a>
Array concatenation variations: Combining two arrays using different techniques.

Profiled operations:
  * `a.concat(b)`
  * `for (...) { a.push(b[i])}`
  * `for (...) { b.unshift(a[i])}`
  * `a.push.apply(a, b)`
  * `b.unshift.appy(b, a)`
  * `b.reduce((arr, item) => arr.push(item), a)`
  * `a.reduceRight((arr, item) => arr.unshift(item), b)`
  * `[...a, ...b]`

### [comarison operators](https://js-profiler.com/#comparison-operators)<a name="comparison-operators"></a>
Variable comparison operators.

Profiled operations:
  * `a > b`
  * `a >= b`
  * `a < b`
  * `a <= b`
  * `==`
  * `===`
  * `!=`
  * `!==`
  * `&&`
  * ||

### [object iteration](https://js-profiler.com/#object-iteration)<a name="object-iteration"></a>
Object iteration: different ways of iterating over properties of an object and concatenating property names into a single string.

Profiled operations:
  * `for (const prop in obj) {}`
  * `Object.keys(obj).forEach()`
  * `Object.entries(obj).forEach()`
  * `for (prop of Map.keys())`
  * `for (prop of Object.keys(obj))`
  * `for (prop of Object.keys(obj) { obj.hasOwnProperty(prop) && ... })`
  * `for (prop of Object.getOwnPropertyNames(obj))`
  * `Object.getOwnPropertyNames(obj).forEach()`


## [Documentation](docs/index.md)

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
