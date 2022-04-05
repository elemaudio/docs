---
sidebar_label: el.accum
---

# el.accum([props], xn, reset)

Outputs a continuous and running sum over the samples in the input signal `xn`. This
value can grow very large, very quickly, use with care. The second argument `reset` is
a pulse train signal which resets the running sum to 0 on each rising edge.

#### Props

None
