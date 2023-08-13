---
sidebar_label: el.capture
---

# el.capture([props], g, x)

Records its input signal `x` precisely in accordance with the gate signal `g`. When the gate signal is high (== 1.0),
the capture node will record its input into an internal buffer. When the gate signal goes low (-> 0.0), recording
immediately stops, and the captured buffer is emitted via an event named "capture" through the event propagation interface.

The "capture" event carries a `source` property to identify which `el.capture()` node the event relates
to, as identified by the `name` prop, as well as a `data` property containing the captured data.

Example:
```js
core.render(el.capture({name: "test"}, el.train(1), el.in({channel: 0})));

core.on('capture', function(e) {
  console.log(e); // { source: "test", data: Float32Array([...]) }
});
```

#### Props

| Name     | Default   | Type   | Description                            |
| -------- | --------- | ------ | -------------------------------------- |
| name     | undefined | String | For identifying events                 |
