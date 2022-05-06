---
sidebar_label: el.sparseq
---

# el.sparseq([props], t, reset)

Much like [`el.seq`](./seq.md) or [`el.seq2`](./seq2.md), the `sparseq` node is for
sequencing values over time. The difference is that `sparseq` is intended for sparse
sequences, whereas `seq` and `seq2` are intended for dense sequences. This is particularly
helpful for huge sequences or where precise timing is required for a small set of events.

Like `seq` and `seq2`, `sparseq` receives its sequence of values from the `seq` property
and steps through them on each rising edge of an incoming pulse train. It expects two children, first
the pulse train to trigger the next step of the sequence. The second child is another pulse train whose rising
edge will reset the sequence position back to the beginning or to the index specified by the `offset` prop.

Example:
```js
el.sample(
  {path: '/path/to/kick.wav'},
  el.sparseq({seq: [
    { value: 1, tickTime: 0 },
    { value: 0, tickTime: 100 },
    { value: 1, tickTime: 10000 },
    { value: 0, tickTime: 10100 },
  ]}, el.train(500), 0),
  1,
)
```

Note the format of the `seq` property value: it's an array of objects, each object indicating the
value to take and the time at which to take it. Time is specified here in "ticks", where a tick refers
to the rising edge of the incoming pulse train. In our example here, we have a trigger signal `el.train(500)`
which yields a rising edge every 2ms. Therefore when we specify `{ value: 0, tickTime: 100 }` we mean "take
the value 0 on the 100th rising edge of the incoming trigger train," which would be exactly 200ms after the
start of the sequence given a train with a 2ms period.

#### Props

| Name     | Default  | Type                | Description                                                                   |
| -------- | -------- | ------------------- | ----------------------------------------------------------------------------- |
| seq      | []       | Array               | The sequence of values to generate                                            |
| offset   | 0        | number              | The sequence offset value                                                     |
| loop     | false    | bool, null or Array | An array defining [start, end] loop points in ticks, or false/null to disable |

