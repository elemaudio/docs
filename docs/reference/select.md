---
sidebar_label: el.select
---

# el.select(g, a, b)

A simple conditional operator. Given a gate signal, `g`, on the range [0, 1],
returns the signal `a` when the gate is high, and the signal `b` when the
gate is low. For values of `g` between (0, 1), performs a linear interpolation
between `a` and `b`.

Example:
```js
el.select(1, a, b); // Equivalent to `a`
el.select(0, a, b); // Equivalent to `b`
el.select(el.train(1), a, b); // Constantly switching between `a` and `b`
el.select(el.sm(el.train(1)), a, b); // Constantly fading between `a` and `b`
```

#### Props

None

