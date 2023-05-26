---
sidebar_label: el.fft
---

# el.fft([props], x)

:::info
Only available in the WASM-based renderers (web-renderer, offline-renderer). You may extend the runtime
in your own integration with the same FFT processors if you like, but it is not provided by default.
:::

Analyzes its input signal `x` with a real value to complex value Fast Fourier Transform, emitting the
results of each analysis block as a JavaScript event through the core event emitter. The input
signal `x` is otherwise propagated through unmodified.

The "fft" event carries a `source` property to identify which `el.fft()` the event relates
to as identified by the `name` prop, as well as a `data` object containing both a `real` and
an `imag` property, representing the results of the FFT analysis.

Example:
```js
core.render(el.fft({size: 1024, name: "myfft"}, el.blepsaw(20)));

core.on('fft', function(e) {
  console.log(e); // { source: "myfft", data: { real: [...], imag: [...] } }
});
```

#### Props

| Name     | Default   | Type   | Description                            |
| -------- | --------- | ------ | -------------------------------------- |
| name     | undefined | String | For identifying FFT events             |
| size     | 1024      | Number | FFT block size                         |
