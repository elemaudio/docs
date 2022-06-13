---
sidebar_label: el.maxhold
---

# el.maxhold([props], x, reset)

A simple peak-holding utility. By default, this will output a signal whose value matches the
maximum value so far seen from the incoming input signal `x`. The maximum value can be reset
using the `reset` signal, a pulse train which resets the internal node state on its rising edge.

Optionally, a `hold` property may be given which sets the maximum hold time in milliseconds.

Example:
```js
el.maxhold(x, 0)
el.maxhold({hold: 200}, x, 0)
```

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| hold     | 0        | Number | Sets the maximum hold time in milliseconds    |
