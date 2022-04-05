---
sidebar_label: el.meter
---

# el.meter([props], x)

A pass-through node which analyses its incoming signal, measuring the
maximum and minimum peak value each block. The result is emitted through the
core Renderer event interface with an event object matching the following
structure.

```javascript
interface MeterEvent {
  source: string?;
  min: number;
  max: number;
};
```

Use the `name` property to distinguish one meter node from another. The name
of a given meter node will propagate as the `source` property in the resulting
meter event objects. For example,

```
core.render(
  el.meter({name: 'left'}, el.cycle(440)),
  el.meter({name: 'right'}, el.cycle(441)),
);

core.on('meter', function(e) {
  if (e.source === 'left') {
    handleLeftPeakValue(e.max);
  }
  if (e.source === 'right') {
    handleRightPeakValue(e.max);
  }
});
```

#### Props

| Name     | Default   | Type   | Description                            |
| -------- | --------- | ----------------------------------------------- |
| name     | undefined | String | Identifies a meter node by name        |

