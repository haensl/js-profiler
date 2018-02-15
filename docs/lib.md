## Library

```javascript
// 1. Import the library
const jsperformance = require('js-performance');

// 2. Configure js-performance
const options = {
  json: true,
  precision: 2,
  unit: 'µs'
};

// 3. Run the profiler
jsperformance(options)
  .then((report) => {
    console.log(JSON.stringify(report, null, 2));
  });
```

Calling `jsperformance()` returns a `Promise` which resolves with either the profiling results or the list of available profiles.

### Options

The library provides analogous options to the [CLI](cli.md).

#### console `boolean`

**default:** `false`

If set to true, a [ConsoleReporter](../lib/reporter/console/index.js) is attached, writing profile results to the console.

#### iterations `int`

**default:** `1000`

Specify the number of iterations per profiled function.

#### json `boolean`

**default:** `false`

If set to true, a [JSONReporter](../lib/reporter/json/index.js) is attached, writing profile results to the console in JSON format.

#### list `boolean`

**default:** `false`

Makes the call to `jsperformance` resolve with an array of available profiles without executing them.

```javascript
jsperformance({
  list: true
}).then((profiles) => {
  console.log(profiles);
});
```

#### magnitude `int`

**default:** `1000`

Specify the magnitude of test data, i.e. the number of items to supply to each profiled function.

#### precision `int`

**default:** 4

Specify the number of decimal places to output for results.

#### profiles `Array<string>`

**default:** `undefined`

If specified, only profiles with the names provided are executed.

```javascript
jsperformance({
  profiles: [
    'recursion',
    'loops'
  ]
}).then((report) => {
  console.log(report);
});
```

#### unit `string`

**default:** `auto`

Specify the unit to use for time output. Possible values are:

* `auto`  Automatically convert between milli- and microseconds where appropriate.
* `ms`    Milliseconds
* `µs`    Microseconds

Use the constants found in [units](../lib/support/units/index.js).

#### verbosity `int`

**default:** `1`

Set output verbosity. Possible values are:

* `0` Quiet. Output only results
* `1` Normal. Output name, description and result of profiled functions.
* `2` Verbose. Output verbose data.

Use the constants found in [verbosity](../lib/support/verbosity/index.js);

