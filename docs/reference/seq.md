---
sidebar_label: el.seq
---

# el.seq([props], t, reset)

A simple signal sequencer. Receives a sequence of values from the `seq` property
and steps through them on each rising edge of an incoming pulse train. Expects two children, first
the pulse train to trigger the next step of the sequence. The second child is another pulse train whose rising
edge will reset the sequence position back to the beginning or to the index specified by the `offset` prop.

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
| offset   | 0        | number | The offset index to reset to on the rising edge of the reset signal      |
| hold     | false    | Bool   | When true, continues to output the sequence value until the next trigger |
| loop     | true     | Bool   | When true, sequence repeats, looping from end to start, indefinitely     |

