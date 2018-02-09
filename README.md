# JS Performance

JavaScript profiling tool and collection of profiling modules and benchmarks.

## Quick start

1. `npm i`
2. `npm start` or `./js-performance.js`

## Running specific profiles

To run specific profiles simply supply their names separated by spaces when starting `js-performance`:

```bash
./js-performance loops
./js-performance recursion
./js-performance loops recursion
```

## CLI

### Getting help

```bash
./js-performance -h
./js-performance --help
```

### Listing available performance profiles

```bash
./js-performance -l
./js-performance --list
```

### Setting the number of iterations per profiled function

**default:** 1000

```bash
./js-performance -i 100
./js-performance --iterations=100
```

### Setting the magnitude of test data provided to the profiled functions

**default:** 1000

```bash
./js-performance -m 100
./js-performance --magnitude=100
```

### Verbosity

To print verbose output:

```bash
./js-performance -v
./js-performance --verbose
```

To print results only:

```bash
./js-performance -q
./js-performance --quiet
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
