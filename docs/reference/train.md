---
sidebar_label: el.train
---

# el.train([props], rate)

Outputs a pulse train alternating between 0 and 1 at the given rate. Equivalent to
`el.le(el.phasor(x), 0.5)` where `x` is the train rate. Expects exactly one child,
providing the train rate in `hz`.

#### Props

None

