---
sidebar_label: el.triangle
---

# el.triangle([props], rate)

Outputs a naive triangle oscillator at the given frequency. Expects exactly one child
specifying the cycle frequency in `hz`.

Typically, due to the aliasing of the naive triangle at audio rates, this oscillator
is used for low frequencly modulation.

#### Props

None

