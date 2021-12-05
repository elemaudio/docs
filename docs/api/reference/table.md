---
sidebar_label: el.table
---

# el.table(props, t)

:::caution Partial Support
Available on all targets, but the webaudio target does not yet support Float32Array
types for the data prop.
:::

Loads a lookup table which is then read from with a position determined by the
incoming signal phase. The table can either be loaded directly or from a file on disk.

The lookup position is given as a normalized phase value, so for example, driving
a lookup table with a simple phasor will sweep through the entire lookup table at
the rate of the phasor (this example is great for wavetable synthesis). To read
only a partial segment of the wavetable, you can multiply and add to the phasor such
that the table sweeps through just the desired segment.

Because each Elementary node has strictly one channel output, the `channel` prop
can be used to decide which channel from the sample to propagate. In the example
below, if `kick.wav` is a stereo wav file sample, the `sample` node here will only
play the right channel.

Example:
```js
// Sweep the whole table, as in wavetable synthesis
el.table({path: '/path/to/squareWaveTable.wav'}, el.phasor(220));

// Or to sweep a specific segment
el.table({path: '/path/to/padSound.wav'}, el.add(0.1, el.mul(0.1, el.phasor(1))));
```

#### Props

| Name     | Default  | Type                   | Description                                   |
| -------- | -------- | ---------------------- | --------------------------------------------- |
| path     | ''       | String                 | The location of the sample file on disk       |
| data     | null     | Array or Float32Array  | Manually constructed lookup table data        |
| channel  | 0        | Number                 | The channel to read from the sample           |
