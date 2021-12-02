# Library

```js
const el = require('@nick-thompson/elementary');
```

The library component of Elementary is a node.js module and npm package available
at `@nick-thompson/elementary`. This module provides a set of prebuilt signal processing
functions and a set of convenience APIs over the `elementary.core` interface.

In general, the signal processing functions provided by the library are of two types:
either a simple wrapper around a corresponding native processing block, or a pure JavaScript
function which is itself ultimately a composition of the underlying native processing blocks.

See the Reference documentation for a complete listing and description of the available signal
processing functions.
