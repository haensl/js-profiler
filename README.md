# JS-Performance

JavaScript profiling tool and library of profiling modules and benchmarks.

JS-Performance allows you to compare different techniques and functions regarding execution speed and memory consumption. It features reporting to console and in JSON format.

Currently implemented performance profiles:
```bash

```

## Installation

`npm i [-g] js-performance`

## Usage

### CLI

If installed with the `-g` flag you can simply run js-performance from your command line:

![Intro](intro.gif)

For further information please refer to the [CLI documentation](docs/cli.md) and the man page.

### Library

```javascript
// 1. Import the library
const jsperformance = require('js-performance');

// 2. Run the profiler
jsperformance.run()
  .then((report) => {
    console.log(JSON.stringify(report, null, 2));
  });
```

For configuration options please refer to the [Library documentation](docs/lib.md).

## [Documentation](docs/index.md)

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
