---
sidebar_label: el.svf
---

# el.svf([props], fc, q, x)

A second order state variable filter with cutoff frequency `fc` and Q `q` which filters the incoming signal `x`. This
filter's mode is set by the `mode` property to any of:

* lowpass
* bandpass
* highpass
* notch
* allpas

#### Props

| Name     | Default   | Type   | Description                                   |
| -------- | --------- | ------ | --------------------------------------------- |
| mode     | 'lowpass' | String | Set the filter behavior                       |

