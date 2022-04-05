---
sidebar_label: el.tapIn
---

# el.tapIn([props])

See the description for the tapOut node above. Given a tapOut node with a known name
in a signal graph, we can use tapIn node to wire the signal into any other region of our graph,
allowing feedback around arbitrary subgraphs. A simple feedback loop might be implemented
as follows:

```js
core.render(
  el.tapOut({name: 'a', size: 22050},
    el.mul(
      0.5,
      el.add(
        el.in({channel: 0}),
        el.tapIn({name: 'a'}),
      ),
    ),
  )
);
```

**Note:** Feedback loops can very easily build unstable scenarios that grow in volume
extremely quickly. Elementary cannot provide implicit constraints to prevent this behavior. Please use care when implementing feedback to insert appropriate gains.

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| name     | ''       | String | Names the output tap from which we wire in    |

