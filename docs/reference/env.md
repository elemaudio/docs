---
sidebar_label: el.env
---

# el.env([props], atkPole, relPole, x)

A one-pole envelope follower node with different attack and release times. This is
quite similar to `el.pole(p, el.abs(x))` in implementation. Expects three children,
the pole position for the attack phase, the pole position for the release phase, and
the signal to monitor. For example,

```js
el.env(el.tau2pole(0.01), el.tau2pole(0.1), x)
```

#### Props

None
