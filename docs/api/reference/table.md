---
sidebar_label: el.table
---

# el.table([props], t)

:::tip Stable
Full support across available targets
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

* Note: the `path`, `channel`, and `data` prop are all related in that their job is to provide a resource from which to
  load the lookup table
    * Providing a `path` property will first attempt to look the file up in the pre-loaded virtual file
      system (see [WebAudio](../../targets/WebAudio.md)), then fall back to a disk-read if running on a target that has disk access (i.e. the Plugin Dev Kit).
    * When falling back to a read from disk, the `channel` property will specify _which_ channel from a multi-channel sample file
      to load. `el.table` outputs a mono signal, so you must choose _which_ channel you want to read from the underlying file.
    * When providing the `data` property, you'll pass either an Array or a Float32Array containing the raw buffer to be loaded
      into the lookup table. This is a great solution for a quick hack or a small array, but any large arrays should preferably be loaded
      into the virtual file system ahead of time.
    * Behavior is _undefined_ when both the `path` and the `channel` prop are provided.

