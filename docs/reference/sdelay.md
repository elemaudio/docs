---
sidebar_label: el.sdelay
---

# el.sdelay([props], x)

A static delay line with a fixed length. Expects exactly one child: the input signal to delay.
This utility offers a subset of the functionality of the standard `el.delay`, but can be used as
a more lightweight and high-performance alternative when the desired delay has a fixed length.

Example:
```js
el.sdelay({size: 44100}, x)
```

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| size     | 0        | Number | Sets the maximum delay line length in samples |
