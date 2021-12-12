---
sidebar_label: el.sample
---

# el.sample([props], t)

:::tip Stable
Full support across available targets
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

| Name        | Default   | Type                  | Description                                                          |
| ----------- | --------- | --------------------- | -------------------------------------------------------------------- |
| path        | ''        | String                | \*The location of the sample file                                    |
| channel     | 0         | Number                | \*The channel to read from the sample file                           |
| data        | null      | Array or Float32Array | \*Raw buffer data to load the sample from                            |
| mode        | 'trigger' | String                | One of "trigger", "gate", "loop"                                     |
| startOffset | 0         | Number                | Offset in samples from the start of the sample where playback starts |
| stopOffset  | 0         | Number                | Offset in samples from the end of the sample where playback ends     |

* Note: the `path`, `channel`, and `data` prop are all related in that their job is to provide a resource from which to
  load the sample player.
    * Providing a `path` property will first attempt to look the file up in the pre-loaded virtual file
      system (see [WebAudio](../../targets/WebAudio.md)), then fall back to a disk-read if running on a target that has disk access (i.e. the Plugin Dev Kit).
    * When falling back to a read from disk, the `channel` property will specify _which_ channel from a multi-channel sample file
      to load. `el.sample` outputs a mono signal, so you must choose _which_ channel you want to read from the underlying file.
    * When providing the `data` property, you'll pass either an Array or a Float32Array containing the raw sample buffer to be loaded
      into the sampler. This is a great solution for a quick hack or a small array, but any large arrays should preferably be loaded
      into the virtual file system ahead of time.
    * Behavior is _undefined_ when both the `path` and the `channel` prop are provided.


#### Mode prop

A brief elaboration on the available playback modes:

* `gate` means that sample playback will start from `startOffset` on the rising edge of the incoming
  pulse train, and will _stop_ on the subsequent falling edge.
* `trigger` mode means that sample playback will start from `startOffset` on the rising edge of the incoming
  pulse train and will _not stop_ on the subsequent falling edge.
* `loop` mode means that the sample will continuously loop between `startOffset` and `stopOffset` as long as
  the incoming pulse train is high.
