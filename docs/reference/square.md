---
sidebar_label: el.square
---

# el.square([props], rate)

Outputs a naive square oscillator at the given frequency. Expects exactly one child
specifying the cycle frequency in `hz`.

Typically, due to the aliasing of the naive square at audio rates, this oscillator
is used for low frequencly modulation.

#### Props

None

