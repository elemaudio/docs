---
sidebar_label: el.latch
---

# el.latch([props], t, x)

A sample and hold node. Samples a new value from `x` on a rising edge of a pulse
train `t`, then holds and emits that value until the next rising edge of `t`.

Expected children:
1. The control signal, `t`, a pulse train
2. The input signal to sample

#### Props

None
