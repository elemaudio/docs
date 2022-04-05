---
sidebar_label: el.tapOut
---

# el.tapOut([props], xn)

The tapOut node pairs with the tapIn node to provide special case behavior for implementing
feedback around arbitrary parts of your signal graph. A tapOut node is identified by name,
and its signal can be fed back into any part of your signal graph using a tapIn node by the
same name.

It's important to note that in the digital domain, feedback requires at least a single sample
delay. For efficiency, the tapOut node implements an implicit delay _before_ the signal
is propagated onwards and to any corresponding tapIn nodes. Consider for example the following
render statement:

```js
core.render(el.tapOut({size: 512, name: 'a'}, el.in({channel: 0})));
```

Because we have no tapIn nodes in the above signal flow, the only behavior we will observe
is the implicit delay in the tapOut node. Therefore this expression is equivalent to

```js
core.render(el.delay(512, 0, el.in({channel: 0})));
```

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| name     | ''       | String | Names the output tap                          |
| size     | 512\*    | Number | Sets the delay length in samples              |


* Note: the default size is set to the length of the block provided by the audio driver.
  This may vary platform to platform, it is recommended that you explicitly provide a size.
* Also note: for efficiency, the minimum size allowed is also the block length provided by
  the audio driver, and will be implicitly clamped to that value if necessary. This constraint
  will likely be lessened in a forthcoming release.

