# Basics

Basic signal processing operations and helpers.


### el.inputs()

Returns an array of `el.in` nodes, each one assigned to the corresponding input
from the system. For example, if you open two input channels when running Elementary,
then `el.inputs()` yields `[el.in({channel: 0}), el.in({channel: 1})]`. Useful for mapping
input channels over an input effect.

### el.sr

A constant value node whose value is the current sample rate of the system.

#### Props

None

### el.const

A constant value node whose value is set by the `value` prop. Commonly, you'll
see the `const` node expressed as a numeric literal. For example, the following
two expressions are equivalent.

```js
el.cycle(440)
```

```js
el.cycle(el.const({value: 440}))
```

#### Props

| Name     | Default  | Type   | Description                            |
| -------- | -------- | ----------------------------------------------- |
| value    | 0        | Number | Declare's the node's output value      |

### el.counter(g)

Outputs a continuous count of elapsed samples. Expects one child, `g`, a pulse
train alternating between 0 and 1. When `g` is high, the counter will run. When `g`
is low, the counter will reset and output 0 until `g` is high again.

#### Props

None

### el.tau2pole

Computes a real pole position giving exponential decay over `t`, where `t` is
the time to decay 60dB. Expects exactly one child, and passing a `number` will
eagerly perform the computation ahead of the realtime rendering.

#### Props

None

### el.ms2samps

Equivalent to `(x / 1000) * sampleRate`, where `x` is the input time in milliseconds.
Expects exactly one child, and passing a `number` will eagerly perform the computation
ahead of the realtime rendering.

#### Props

None

### el.db2gain([props], db)

Equivalent to `el.pow(10, el.mul(db, 1 / 20))`, where `db` is the input value in Decibels.
The return value is a signal representing the equivalent linear gain (amplitude).

#### Props

None

### el.select

A simple conditional operator. Given a gate signal, `g`, on the range [0, 1],
returns the signal `a` when the gate is high, and the signal `b` when the
gate is low. For values of `g` between (0, 1), performs a linear interpolation
between `a` and `b`.

Example:
```js
el.select(1, a, b); // Equivalent to `a`
el.select(0, a, b); // Equivalent to `b`
el.select(el.train(1), a, b); // Constantly switching between `a` and `b`
```

#### Props

None

