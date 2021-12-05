---
sidebar_label: el.seq
---

# el.seq([props], t, [r])

:::tip Stable
Full support across available targets
:::

A simple signal sequencer. Receives a sequence of values from the `seq` property
and steps through them on each rising edge of an incoming pulse train. Expects at least
one child, the pulse train to trigger the next step of the sequence. An optional second
child may be provided: another control signal (pulse train) whose rising edge will reset
the sequence position back to the beginning.

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
| hold     | false    | Bool   | When true, continues to output the sequence value until the next trigger |
| loop     | true     | Bool   | When true, sequence repeats, looping from end to start, indefinitely     |

