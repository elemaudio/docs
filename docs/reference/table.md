---
sidebar_label: el.table
---

# el.table([props], t)

Loads a lookup table from a buffer in the [virtual file system](../guides/Virtual_File_System.md), from which it
performs an interpolated read with a position determined by the incoming signal phase.

The lookup position is given as a normalized phase value with linear interpolation for
lookup positions that fall between two distinct values. For example, driving
a lookup table with a simple phasor will sweep through the entire lookup table at
the rate of the phasor (this example is great for wavetable synthesis). To read
only a partial segment of the wavetable, you can multiply and add to the phasor such
that the table sweeps through just the desired segment.

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
| path     | ''       | String                 | The name of the sample buffer in the VFS      |

