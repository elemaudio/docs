---
sidebar_label: el.const
---

# el.const([props])

A constant value node whose value is set by the `value` prop. Commonly, you'll
see the `const` node expressed as a numeric literal. For example, the following
two expressions are equivalent.

```js
el.cycle(440)
```

```js
el.cycle(el.const({value: 440}))
```

#### Props

| Name     | Default  | Type   | Description                            |
| -------- | -------- | ----------------------------------------------- |
| value    | 0        | Number | Declare's the node's output value      |


