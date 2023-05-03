---
sidebar_label: el.metro
---

# el.metro([props])

:::info
Only available in the WASM-based renderers (web-renderer, offline-renderer). You may extend the runtime
in your own integration with a similar processor if you like, but it is not provided by default.
:::

Emits a pulse train signal much like `el.train`, alternating from 0 to 1 at a
given rate. Importantly, the `el.metro` ("Metronome") node is used for synchronized
train signals, and will emit an event through the core Renderer's interface on each
rising edge of its output signal.

For example, consider a graph like the following:

```js
core.on('load' function(e) {
  core.render(el.train(5));

  setTimeout(function() {
    core.render(el.or(el.train(10), el.train(5)));
  }, 1233);
});
```

In this example, we start with a pulse train running at 5Hz. We then introduce a new
train running at 10Hz without altering the train at 5Hz, and at an unsynchronized time
determined by the `setTimeout` timer duration. We know in this example that the second
train will run exactly twice as fast as the first, but we can't guarantee here that they
will ever share a synchronized rising edge in time.

Alternatively, consider this example:

```js
core.on('load' function(e) {
  core.render(el.metro({interval: 200}));

  setTimeout(function() {
    core.render(el.or(el.metro({interval: 400}), el.metro({interval: 200})));
  }, 1233);
});
```

Here we're describing an extremely similar scenario: start with a train at 5Hz, introduce
a train at 10Hz some time later. The difference is that `el.metro` relies on the underlying
host transport to determine its pulse train signal. Therefore in this case, we can expect
that the two trains will consistently share a synchronized rising edge.

Further, we can now listen for event callbacks to coordinate some JavaScript with the
metronome timing.

```js
core.on('load' function(e) {
  core.render(el.metro({interval: 200}));
});

// This will fire in time with the above metronome signal, so we can do things like
// updating our step sequencer visualization.
core.on('metro', function(e) {
  console.log(e);
});
```

Finally, the event object emitted with the "metro" event follows the given structure.

```javascript
interface MetroEvent {
  source: string?;
};
```

Use the `name` property to distinguish one metro node from another. The name
of a given metro node will propagate as the `source` property in the resulting
metro event objects.

#### Props

| Name     | Default   | Type   | Description                            |
| -------- | --------- | ----------------------------------------------- |
| name     | undefined | String | Identifies a metro node by name        |
| interval | undefined | Number | Metronome period in milliseconds       |
