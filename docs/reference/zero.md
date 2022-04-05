---
sidebar_label: el.zero
---

# el.zero([props], b0, b1, x)

Implements a simple one-zero filter. Expects the b0 coefficient as the first
argument, the zero position b1 as the second argument, and the input to the filter as the third.

Difference equation: y[n] = b0 * x[n] + b1 * x[n-1]

Reference: https://ccrma.stanford.edu/~jos/filters/One_Zero.html

#### Props

None

