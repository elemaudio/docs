---
sidebar_label: el.counter
---

# el.counter([props], g)

Outputs a continuous count of elapsed samples. Expects one child, `g`, a pulse
train alternating between 0 and 1. When `g` is high, the counter will run. When `g`
is low, the counter will reset and output 0 until `g` is high again.

#### Props

None

