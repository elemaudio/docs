---
sidebar_label: el.adsr
---

# el.adsr([props], a, d, s, r, g)

An exponential ADSR envelope generator, triggered by the gate signal `g`. When the
gate is high (1), this generates the ADS phase. When the gate is low, the R phase.

Expected children:
1. Attack time in seconds (number or signal)
2. Decay time in seconds (number or signal)
3. Sustain amplitude between 0 and 1 (number or signal)
4. Release time in seconds (number or signal)
5. Gate signal; a pulse train alternating between 0 and 1

#### Props

None
