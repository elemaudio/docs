---
sidebar_label: el.svfshelf
---

# el.svfshelf([props], fc, q, gainDecibels, x)

A second order state variable shelf filter with cutoff frequency `fc` and Q `q`, with a shelf gain
set by `gainDecibels` and which filters the incoming signal `x`. This filter's mode is set by the `mode` property to any of:

* lowshelf
* highshelf
* peak or bell

#### Props

| Name     | Default    | Type   | Description                                   |
| -------- | ---------- | ------ | --------------------------------------------- |
| mode     | 'lowshelf' | String | Set the filter behavior                       |

