---
sidebar_label: el.tapOut
---

# el.tapOut([props], xn)

The tapOut node pairs with the tapIn node to provide special case behavior for implementing
feedback around arbitrary parts of your signal graph. A tapOut node is identified by name,
and its signal can be fed back into any part of your signal graph using a tapIn node by the
same name.

It's important to note that in the digital domain, feedback requires at least a single sample
delay. For efficiency, the tapOut node implements an implicit block-size delay _before_ the signal
is propagated onwards and to any corresponding tapIn nodes.


### Example

This example implements a simple feedback loop with no other delay time other than the implicit block-size
delay. Depending on the block size then, this example may exhibit characteristics of a comb filter or perhaps more
of a feedback delay.

```js
let input = el.in({channel: 0});
let output = el.add(
  // Propagate the input signal and insert a tap out
  el.tapOut({name: 'a'}, input),
  // Feed the tap back in here with a 0.5 gain in the loop
  el.mul(
    0.5,
    el.tapIn({name: 'a'})
  ),
);

core.render(output);
```

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| name     | ''       | String | Names the output tap                          |


* Note: the implicit delay is always exactly one block long. You therefore have some level of flexibility
  in your use case by configuring the engine with a block size that suits your needs.
