---
sidebar_label: el.phasor
---

# el.phasor([props], rate, reset)

Outputs a ramp from 0 to 1 at the given rate. Expects two children, the first providing
the ramp rate in `hz`, the second a pulse train for resetting the phasor.

The phasor will snap its phase back to 0 on each rising edge of the reset pulse train. To
avoid a reset you can simply pass a constant value `0` for the second argument.

#### Props

None

