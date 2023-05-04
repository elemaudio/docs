---
sidebar_label: el.sample
---

# el.sample([props], t, rate)


Loads a sample from the [virtual file system](../guides/Virtual_File_System.md) and triggers its playback on the rising edge of an incoming
pulse train. Expects two children: first the pulse train to trigger playback, and second a
signal which continuously directs the sample's playback rate. For example,

```js
el.sample({path: 'kick.wav'}, el.train(1), 1);   // Equivalent to the default playback
el.sample({path: 'kick.wav'}, el.train(1), 0.5); // Half speed playback
el.sample({path: 'kick.wav'}, el.train(1), el.add(1, el.cycle(1))); // Continuous pitch modulation
```

#### Props

| Name        | Default   | Type                  | Description                                                          |
| ----------- | --------- | --------------------- | -------------------------------------------------------------------- |
| path        | ''        | String                | The name of the sample buffer in the VFS                             |
| mode        | 'trigger' | String                | One of "trigger", "gate", "loop"                                     |
| startOffset | 0         | Number                | Offset in samples from the start of the sample where playback starts |
| stopOffset  | 0         | Number                | Offset in samples from the end of the sample where playback ends     |

