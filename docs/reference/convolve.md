---
sidebar_label: el.convolve
---

# el.convolve([props], x)

:::info
Only available in the WASM-based renderers (web-renderer, offline-renderer). You may extend the runtime
in your own integration with a similar processor if you like, but it is not provided by default.
:::

A convolution node which reads an impulse response from the [virtual file system](../guides/Virtual_File_System.md) and convolves it with
the input signal `x`.

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| path     | ''       | String | The name of the IR buffer in the VFS          |


