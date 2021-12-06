---
sidebar_label: el.convolve
---

# el.convolve([props], x)

:::caution Partial Support
Available in the Node.js cli target, but not yet in webaudio or the plugin.
:::

A convolution node which reads an impulse response from disk and convolves it with
the input signal `x`.

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------------------------------------------------------ |
| path     | ''       | String | The location of the impulse response on disk  |


