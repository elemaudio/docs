---
sidebar_label: el.ms2samps
---

# el.ms2samps([props], x)

Equivalent to `el.mul(el.div(x, 1000), sampleRate)`, where `x` is the input time in milliseconds.
Expects exactly one child, and passing a `number` will eagerly perform the computation
ahead of the realtime rendering.

#### Props

None

