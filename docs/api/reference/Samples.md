# Sample Playback

Builtin processors for sample loading and playback.


### el.sample

Loads a sample from disk and triggers its playback on the rising edge of an incoming
pulse train. Expects exactly one child, the pulse train to trigger playback.

Because each Elementary node has strictly one channel output, the `channel` prop
can be used to decide which channel from the sample to propagate. In the example
below, if `kick.wav` is a stereo wav file sample, the `sample` node here will only
play the right channel.

Example:
```js
el.sample({path: '/path/to/kick.wav', channel: 1}, el.train(1));
```

#### Props

| Name        | Default   | Type   | Description                                                          |
| ----------- | --------- | ------ | -------------------------------------------------------------------- |
| path        | ''        | String | The location of the sample file on disk                              |
| channel     | 0         | Number | The channel to read from the sample                                  |
| mode        | 'trigger' | String | One of "trigger", "gate", "loop"                                     |
| startOffset | 0         | Number | Offset in samples from the start of the sample where playback starts |
| stopOffset  | 0         | Number | Offset in samples from the end of the sample where playback ends     |


### el.table(props, t)

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

| Name     | Default  | Type          | Description                                   |
| -------- | -------- | ------------------------------------------------------------- |
| path     | ''       | String        | The location of the sample file on disk       |
| data     | null     | Float32Array  | Manually constructed lookup table data        |
| channel  | 0        | Number        | The channel to read from the sample           |

