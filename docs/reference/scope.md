---
sidebar_label: el.scope
---

# el.scope([props], x, [y, [...]])

A pass-through node which buffers its incoming signal(s), and reports them to the
JavaScript environment through the core Renderer event emitting interface.

```javascript
interface ScopeEvent {
  source: string?;
  data: Array<Array<Number>>;
};
```

In this event object, the `data` property will always be an array of blocks of data, one
for each child being inspected. See below on multi-channel support.

Use the `name` property to distinguish one scope node from another. The name
of a given scope node will propagate as the `source` property in the resulting
scope event objects. For example,

```
core.render(
  el.scope({name: 'left'}, el.cycle(440)),
  el.scope({name: 'right'}, el.cycle(441)),
);

core.on('scope', function(e) {
  if (e.source === 'left') {
    handleLeftScopeData(e.data);
  }
  if (e.source === 'right') {
    handleRightScopeData(e.data);
  }
});
```

The scope node can optionally take multiple children to guarantee multi-channel
synchronization in the reported data. To see why this is helpful, consider the
example above. In such an example, there is no information in the event callback to
tell you _which_ event object relates to _which_ block of data, leaving it up to you to
try to apply your own multi-channel synchronization efforts.

Multi-channel synchronization through the scope node itself requires only:
* Passing more than one child node
* Specifying how many children the scope should report on with the `channels` prop

#### Props

| Name     | Default   | Type   | Description                            |
| -------- | --------- | ----------------------------------------------- |
| name     | undefined | String | Identifies a scope node by name        |
| size     | 512       | Number | Block size to buffer and report to js  |
| channels | 1         | Number | The number of children to report on    |

