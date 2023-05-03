---
sidebar_label: el.convolve
---

# el.convolve([props], x)

:::info
Only available in the WASM-based renderers (web-renderer, offline-renderer). You may extend the runtime
in your own integration with a similar processor if you like, but it is not provided by default.
:::

A convolution node which reads an impulse response from disk and convolves it with
the input signal `x`.

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------------------------------------------------------ |
| path     | ''       | String | The location of the impulse response on disk  |


