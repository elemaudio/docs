---
sidebar_label: el.freeverb
---

# el.freeverb([props], feedback, damping, x)

:::tip Stable
Full support across available targets
:::

A simple reverb implementing the classic Freeverb algorithm.

See https://ccrma.stanford.edu/~jos/pasp/Freeverb.html

* @param {Node | number} feedback: [0, 1) – how long the reverb should ring out
* @param {Node | number} damping : [0, 1) – pole position of the lowpass filters
* @param {Node} x – input signal to filter

#### Props

| Name     | Default  | Type   | Description                                    |
| -------- | -------- | ------ | ---------------------------------------------- |
| name     | None     | String | Name for the feedback tap structure. Required. |

