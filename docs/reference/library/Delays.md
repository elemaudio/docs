# Delays

Builtin processors for signal delays.


### el.z

A very simple single-sample delay node (z^-1).

#### Props

None

### el.tapOut

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

### el.tapIn

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
extremely quickly. Elementary cannot provide implicit constraints to prevent this behavior. Please
use care when implementing feedback to insert appropriate gains.

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| name     | ''       | String | Names the output tap from which we wire in    |


### el.delay([props], len, fb, x)

A variable-length delay line with a feedback component. Expects three children:

1. The delay time in samples
2. A feedback coefficient on the range [-1, 1]
3. The signal to delay

Example:
```js
el.delay({size: 44100}, el.ms2samps(len), fb, x)

// Adding a simple feedforward component
el.add(el.mul(ff, x), el.delay({size: 44100}, el.ms2samps(len), fb, x))
```

When `fb = 0`, this gives a simple signal delay. At small delay times, and with various
feedback and feedforward components, this gives various comb filters. At
larger delay times with `fb > 0` this gives a simple feedback delay/echo. Adding
a feedforward component `ff = -fb`, this gives an allpass filter.

Reference: https://ccrma.stanford.edu/~jos/pasp/Allpass_Two_Combs.html

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------ | --------------------------------------------- |
| size     | 0        | Number | Sets the maximum delay line length in samples |

