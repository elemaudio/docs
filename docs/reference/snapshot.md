---
sidebar_label: el.snapshot
---

# el.snapshot([props], t, x)

_Added in v0.11.0 (Pro tier only)_

The snapshot node is conceptually very similar to `el.latch`, or sample and hold,
except that the value sampled is not propagated as a signal, rather sent as an
event through the core event emitter.

Specifically, `el.snapshot(t, x)` will _always_ propagate the input signal `x`,
but on the rising edge of a pulse train `t` it will capture the current value of
`x` and emit an event.

Expected children:
1. The control signal, `t`, a pulse train
2. The input signal to sample

Example:
```js
core.render(el.snapshot({name: "ss"}, el.train(1), el.cycle(20)));

core.on('snapshot', function(e) {
  console.log(e); // { source: "ss", data: 0.1394131 }
});
```

#### Props

| Name     | Default   | Type   | Description                            |
| -------- | --------- | ------ | -------------------------------------- |
| name     | undefined | String | For identifying snapshot events        |
