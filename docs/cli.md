# JS Performance

## CLI

```bash
Usage: js-performance.js [options] [<profile1> <profile2> ...]

Parameters:
  <profile1> <profile2> ...
  Optionally specify the profiles you want to run separated by spaces.

Options:
  -h, --help                                    Display this helptext.
  -i <iterations>, --iterations=<iterations>    Specify the number of iterations per profiled function. Default: 1000.
  -j, --json                                    Output results in JSON format.
  -l, --list                                    List available profiles.
  -m <magnitude>, --magnitude=<magnitude>       Specify the magnitude of testdata. Default: 1000.
  -p <precision>, --precision=<precision>       Specify the precision in terms of decimal places of results. Default: 4 decimals.
  -q, --quiet                                   Print results only.
  -u <unit>, --unit=<unit>                      Specify the unit for time output. Default: auto.
                                                Possible values:
                                                  auto (automatically convert between milli- and microseconds)
                                                  ms (milliseconds)
                                                  µs (microseconds)
  -v, --verbose                                 Print verbose information.
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

**default:** 1000

```bash
js-performance -i 100
js-performance --iterations=100
```

### Setting the magnitude of test data provided to the profiled functions

**default:** 1000

```bash
js-performance -m 100
js-performance --magnitude=100
```

### Setting the (floating point) precision to use

**default:** 4

```bash
js-performance -p 2
js-performance --precision=2
```

### Setting units

**default:** auto

```bash
js-performance -u ms
js-performance --unit=ms
```

available units:

* auto (automatically convert between milli- and microseconds)
* ms (milliseconds)
* µs (microseconds)

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
