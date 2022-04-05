---
sidebar_label: el.seq2
---

# el.seq2([props], t, reset)

A simple signal sequencer. Receives a sequence of values from the `seq` property
and steps through them on each rising edge of an incoming pulse train. Expects two children, first
the pulse train to trigger the next step of the sequence. The second child is another pulse train whose rising
edge will reset the sequence position back to the beginning or to the index specified by the `offset` prop.

This node is almost identical to `el.seq`, but for a rather simple difference: `el.seq`
will only reset to its provided `offset` index on the rising edge of an incoming reset signal.
By contrast, `el.seq2` continuously factors the provided `offset` into the current index calculation,
which means that changing the property value is immediately reflected in the sequence playback.

It's likely a rare case where you will need to differentiate between seq2 and seq, but prefer `seq2`
by default as its reset and offset behavior is more robust.

Example:
```js
el.sample(
  {path: '/path/to/kick.wav'},
  el.seq(
    {seq: [1, 0, 1, 0, 0, 0, 1, 1]},
    el.train(2)
  )
)
```

#### Props

| Name     | Default  | Type   | Description                                                              |
| -------- | -------- | --------------------------------------------------------------------------------- |
| seq      | []       | Array  | The sequence of values to generate                                       |
| offset   | 0        | number | The sequence offset value                                                |
| hold     | false    | Bool   | When true, continues to output the sequence value until the next trigger |
| loop     | true     | Bool   | When true, sequence repeats, looping from end to start, indefinitely     |

