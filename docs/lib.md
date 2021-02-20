# JS-Profiler

## Library

```javascript
// 1. Import the library
const jsProfiler = require('js-profiler');

// 2. Configure js-profiler
const options = {
  json: true,
  precision: 2,
  unit: 'µs'
};

// 3. Run the profiler
jsProfiler.run(options)
  .then((report) => {
    console.log(JSON.stringify(report, null, 2));
  });
```

The `js-profiler` module exports an object providing two functions:

### `list(verbosity) => Array<object>`

Returns an array of available profiles. Each profile is represented by a name and description.

#### Parameters

##### verbosity `int`

**default:** `1`

The verbosity to use for profile description output.

Use the constants provided in [verbosity](../lib/support/verbosity/index.js).

### `run(options) => Promise`

Calling `run()` starts profile execution and returns a `Promise` which resolves with the profiling results.

#### Parameters

#### options `object`

The library provides analogous options to the [CLI](cli.md).

##### console `boolean`

**default:** `false`

If set to true, a [ConsoleReporter](../lib/reporter/console/index.js) is attached, writing profile results to the console.

##### iterations `int`

**default:** `1000`

Specify the number of iterations per profiled function.

##### json `boolean`

**default:** `false`

If set to true, a [JSONReporter](../lib/reporter/json/index.js) is attached, writing profile results to the console in JSON format.

##### magnitude `int`

**default:** `1000`

Specify the magnitude of test data, i.e. the number of items to supply to each profiled function.

##### memory `boolean`

**default:** `false`

If set to true, memory consumption is measured and reported.

**ATTENTION:** Enabling memory reporting significantly slows down profile execution.

##### precision `object`

**default:** `{
  time: 4,
  memory: 4
}`

Specify the number of decimal places to output for results.

##### profiles `Array<string>`

**default:** `undefined`

If specified, only profiles with the names provided are executed.

```javascript
jsperformance.run({
  profiles: [
    'recursion',
    'loops'
  ]
}).then((report) => {
  console.log(report);
});
```

##### units `object`

**default:** `{
  time: 'auto',
  memory: 'auto'
}`

Specify the unit to use for time output. Possible values are:

* `auto`:  Automatically convert between units where appropriate.
* `ms` or `milliseconds`:    Milliseconds
* `µs` or `microseconds`:    Microseconds
* `B`:     Byte
* `KB`:    Kilobyte
* `MB`:    Megabyte

Use the constants found in [units](../lib/support/units/index.js).

##### verbosity `int`

**default:** `1`

Set output verbosity. Possible values are:

* `0` Quiet. Output only results
* `1` Normal. Output name, description and result of profiled functions.
* `2` Verbose. Output verbose data.

Use the constants found in [verbosity](../lib/support/verbosity/index.js);

