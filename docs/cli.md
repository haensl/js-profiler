# JS-Profiler

## CLI

### Synopsis

```bash
js-profiler [options] [<profile1> <profile2> ...]

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
      ms|milliseconds (milliseconds)
      µs|microseconds (microseconds)
      B (bytes)
      KB (kilobytes)
      MB (megabytes)

  -v, --verbose
  Print verbose information.
```

### Getting help

```bash
js-profiler -h
js-profiler --help
```

### Listing available performance profiles

```bash
js-profiler -l
js-profiler --list
```

### Running specific profiles

To run specific profiles simply supply their names separated by spaces when starting `js-profiler`:

```bash
js-profiler loops
js-profiler recursion
js-profiler loops recursion
```

### Setting the number of iterations per profiled function

```bash
-i <iterations>
--iterations=<iterations>
```

**default:** `1000`

Example:

```bash
js-profiler -i 100
js-profiler --iterations=100
```

### Setting the magnitude of test data provided to the profiled functions

```bash
-m <magnitude>
--magnitude=<magnitude>
```

**default:** `1000`

Example:

```bash
js-profiler -m 100
js-profiler --magnitude=100
  ```

### Enable measurement of memory consumption

```bash
js-profiler --memory
```

**Attention:** Enabling measurement of memory consumption has significant effect on profiling runtime.


### Setting the (floating point) precision to use

```bash
-p <time-precision>,<memory-precision>
--precision=<time-precision>,<memory-precision>
```

**default:** `4,4`

Example:

```bash
js-profiler -p 2 # time: 2 decimals, memory: default
js-profiler --precision=2,10 # time: 2 decimals, memory: 10 decimals
```

### Setting units

```bash
-u <time-unit>,<memory-unit>
--unit=<time-unit>,<memory-unit>
```

**default:** `auto,auto`

Example:

```bash
js-profiler -u ms # time: milliseconds, memory: default
js-profiler --unit=ms,KB # time milliseconds, memory: kilobyte
```

available units:

* `auto`: automatically convert between milli- and microseconds
* `ms` or `milliseconds`: milliseconds
* `µs` or `microseconds`: microseconds
* `B`: bytes
* `KB`: kilobytes
* `MB`: megabytes

### Verbosity

To print verbose output:

```bash
js-profiler -v
js-profiler --verbose
```

To print results only:

```bash
js-profiler -q
js-profiler --quiet
```

### Report in JSON format

```bash
js-profiler -j
js-profiler --json
```
