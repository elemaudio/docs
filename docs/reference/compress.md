---
sidebar_label: el.compress
---

# el.compress([props], atkMs, relMs, threshold, ratio, sidechain, xn)

A simple hard-knee compressor with parameterized attack, release, threshold,
and ratio, with an optional sidechain input.

* `@param {Node | number} atkMs` – attack time in milliseconds
* `@param {Node | number} relMs` – release time in millseconds
* `@param {Node | number} threshold` – decibel value above which the comp kicks in
* `@param {Node | number} ratio` – ratio by which we squash signal above the threshold
* `@param {Node} sidechain – sidechain` signal to drive the compressor
* `@param {Node} xn` – input signal to filter

Example:

```js
// Imagine we have some drum sequences with the following names, summed into
// a single drum bus
let drumBus = el.add(kick, hat, snare, cymbals);

// We can compress the drumBus directly by passing it both as the sidechain
// signal and as the signal to filter
let out = el.compress(10, 100, -48, 4, drumBus, drumBus);
```

#### Props

None
