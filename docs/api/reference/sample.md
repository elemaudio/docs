---
sidebar_label: el.sample
---

# el.sample([props], t)

:::caution Partial Support
Available in the Node.js cli target, but not yet in webaudio or the plugin.
:::

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


#### Mode prop

A brief elaboration on the available playback modes:

* `gate` means that sample playback will start from `startOffset` on the rising edge of the incoming
  pulse train, and will _stop_ on the subsequent falling edge.
* `trigger` mode means that sample playback will start from `startOffset` on the rising edge of the incoming
  pulse train and will _not stop_ on the subsequent falling edge.
* `loop` mode means that the sample will continuously loop between `startOffset` and `stopOffset` as long as
  the incoming pulse train is high.
