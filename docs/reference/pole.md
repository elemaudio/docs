---
sidebar_label: el.pole
---

# el.pole([props], p, x)

Implements a simple one-pole filter, also sometimes called a leaky integrator.
Expects two children, the first is the pole position, the second is the signal to filter.

Difference equation: y[n] = x[n] + p * y[n-1]

Reference: https://ccrma.stanford.edu/~jos/filters/One_Pole.html

#### Props

None

