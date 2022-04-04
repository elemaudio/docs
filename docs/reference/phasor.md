---
sidebar_label: el.phasor
---

# el.phasor([props], rate, [reset])

:::tip Stable
Full support across available targets
:::

Outputs a ramp from 0 to 1 at the given rate. Expects one child, providing
the ramp rate in `hz`.

Optionally, a pulse train can be provided as the second argument, `reset`. When
the reset signal is provided, the phasor will snap its phase back to 0 on each
rising edge of the "reset" pulse train.

#### Props

None

