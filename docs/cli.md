# JS Performance

## CLI

```bash
Usage: js-performance.js [options] [<profile1> <profile2> ...]

Parameters:
  <profile1> <profile2> ...
  Optionally specify the profiles you want to run separated by spaces.

Options:
  -h, --help
  Display this helptext.

  -i <iterations>, --iterations=<iterations>
  Specify the number of iterations per profiled function. Default: 1000.

  -j, --json
  Output results in JSON format.

  -l, --list
  List available profiles.

  -m <magnitude>, --magnitude=<magnitude>
  Specify the magnitude of testdata. Default: 1000.

  --memory
  Enable measurement of memory consumption.

  -p <time-precision>,<memory-precision>, --precision=<time-precision>,<memory-precision>
  Specify the precision in terms of decimal places of time and memory results. Default: 4 decimals.

  -q, --quiet
  Print results only.

  -u <time-unit>,<memory-unit>, --unit=<time-unit>,<memory-unit>
  Specify the unit for time output. Default: auto,auto.
    Possible values:
      auto (automatically convert between milli- and microseconds)
      ms (milliseconds)
      µs (microseconds)
      B (bytes)
      KB (kilobytes)
      MB (megabytes)

  -v, --verbose
  Print verbose information.
```

### Getting help

```bash
js-performance -h
js-performance --help
```

### Listing available performance profiles

```bash
js-performance -l
js-performance --list
```

### Running specific profiles

To run specific profiles simply supply their names separated by spaces when starting `js-performance`:

```bash
js-performance loops
js-performance recursion
js-performance loops recursion
```

### Setting the number of iterations per profiled function

```bash
-i <iterations>
--iterations=<iterations>
```

**default:** 1000

Example:

```bash
js-performance -i 100
js-performance --iterations=100
```

### Setting the magnitude of test data provided to the profiled functions

```bash
-m <magnitude>
--magnitude=<magnitude>
```

**default:** 1000

Example:

```bash
js-performance -m 100
js-performance --magnitude=100
  ```

### Enable measurement of memory consumption

```bash
js-performance --memory
```

**Attention:** Enabling measurement of memory consumption has significant effect on profiling runtime.


### Setting the (floating point) precision to use

```bash
-p <time-precision>,<memory-precision>
--precision=<time-precision>,<memory-precision>
```

**default:** 4,4

Example:

```bash
js-performance -p 2 # time: 2 decimals, memory: default
js-performance --precision=2,10 # time: 2 decimals, memory: 10 decimals
```

### Setting units

```bash
-u <time-unit>,<memory-unit>
--unit=<time-unit>,<memory-unit>
```

**default:** auto,auto

Example:

```bash
js-performance -u ms # time: milliseconds, memory: default
js-performance --unit=ms,KB # time milliseconds, memory: kilobyte
```

available units:

* auto (automatically convert between milli- and microseconds)
* ms (milliseconds)
* µs (microseconds)
* B (bytes)
* KB (kilobytes)
* MB (megabytes)

### Verbosity

To print verbose output:

```bash
js-performance -v
js-performance --verbose
```

To print results only:

```bash
js-performance -q
js-performance --quiet
```

### Report in JSON format

```bash
js-performance -j
js-performance --json
```
