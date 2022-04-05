---
sidebar_label: el.delay
---

# el.delay([props], len, fb, x)

A variable-length delay line with a feedback component. Expects three children:

1. The delay time in samples
2. A feedback coefficient on the range [-1, 1]
3. The signal to delay

Example:
```js
el.delay({size: 44100}, el.ms2samps(len), fb, x)

// Adding a simple feedforward component
el.add(el.mul(ff, x), el.delay({size: 44100}, el.ms2samps(len), fb, x))
```

When `fb = 0`, this gives a simple signal delay. At small delay times, and with various
feedback and feedforward components, this gives various comb filters. At
larger delay times with `fb > 0` this gives a simple feedback delay/echo. Adding
a feedforward component `ff = -fb`, this gives an allpass filter.

Reference: https://ccrma.stanford.edu/~jos/pasp/Allpass_Two_Combs.html

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| size     | 0        | Number | Sets the maximum delay line length in samples |
