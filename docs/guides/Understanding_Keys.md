# Understanding Keys

This guide assumes that you've already read the [In Depth](../In_Depth) introduction to Elementary,
and picks up where the In Depth introduction leaves off when it references keys.

If your application only ever makes a single call to `core.render`, then this section won't
really apply, and in such a case the behavior is well explained in [In Depth](./In_Depth).
However, audio applications frequently exhibit dynamic behavior, and it's in this context that
we'll explore what happens when you make multiple successive calls to `core.render`.

To start, let's examine a simple synthesizer:

```js
let voices = [
  {gate: 0.0, freq: 440},
  {gate: 0.0, freq: 440},
];

function synth(vs) {
  return el.add(vs.map(function(v) {
    return el.mul(v.gate, el.cycle(v.freq));
  });
}

core.on('load', function() {
  core.on('midi', function(e) {
    let vs = updateVoices(voices, e);

    core.render(synth(vs), synth(vs));
  });
});
```

In this example, we start by installing a `'midi'` event handler in the `'load'` event
callback. The `'midi'` event handler will be fired on any incoming MIDI event from a connected
MIDI controller, and the argument `e` is an object describing the event. When that happens,
we will update our `voices` object appropriately, and invoke `core.render` again with the result
of calling `synth` with our updated voices.

For brevity, we're omitting the actual implementation of `updateVoices`, but we can imagine here that
such an implementation would look at the incoming event, `e`, and if it's a `noteOn` event, we'd update
one of the voices in our array to set its `gate: 1.0` and its `frequency: e.noteFrequency`. Perhaps in
such a case, our resulting voices array would look like this:

```js
[
  {gate: 1.0, freq: 110},
  {gate: 0.0, freq: 440},
];
```

And similarly during a `noteOff` event we'll consult the voices object to set the appropriate voice's
`gate` value back to `0`.

Now, after updating our voices, we re-run the `synth` function and then call `core.render` again. Here's
where the behavior gets interesting. On the first call to `core.render`, Elementary is starting from a
blank slate and simply does the work to realize the graph you've provided. On the second call, Elementary will compare the
new signal to render with the one that it has most recently rendered for you already. While doing this, Elementary
will look for the the minimal set of changes to apply to the existing rendering to arrive at the new desired state, and
apply those changes. This is much like the "virtual DOM diff" that React.js popularized for web applications.

## Keys

Now, to explain what keys are and how they're useful, we have to understand this diff in a little more detail. To
start, consider the following two signals:

```js
let x = el.cycle(440);
let y = el.cycle(441);
```

Intuitively, we might look at these and think "well, those are the same thing just at different frequencies." While that's
true in one sense, Elementary here takes a very literal, mathematical approach. In Elementary, signals are all represented
as functions. Even the constant value node, `440` or `el.const({value: 440})` is seen as a function `f(x) = 440`. In the
mathematical sense, then, all signals are ultimately represented as composed functions, such as `h(g(f(x)))`. In this particular case,
Elementary views `f(x) = 440` as a strictly different function from `e(x) = 441`, and therefore `g(f(x))` is strictly a different
function from `g(e(x))`, even if these functions have similar properties (such as, that they both produce a continuous sinusoidal signal).

Through that lens, if we then write:

```js
let x = el.cycle(440);
let y = el.cycle(441);

core.render(x);
core.render(y);
```

We ask Elementary to render what it believes to be two strictly different signals. In this case, Elementary won't, by default, be
able to find the most minimal change to move from `x` to `y`, and so it will render a new graph and smoothly fade over to it. Here
is exactly where the notion of keys fit in. When we ask Elementary to render `x = g(f(x))` and then render `y = g(e(x))`, keys are our
way of helping Elementary see that `f = e` but for a small property change (in this case, setting the property `value` of our const node
from 440 to 441). So, if instead of the above, we write:

```js
let x = el.cycle(el.const({key: 'test', value: 440}));
let y = el.cycle(el.const({key: 'test', value: 441}));

core.render(x);
core.render(y);
```

Elementary will be able to find that the signals you're rendering are identical but for the property change, and it will simply apply
that property change and be done.

So, returning to our synth example above and applying what we now know, we can see that as written, Elementary
will render a completely new graph every time we change the `voices` array and re-render. To fix this and help
Elementary find the minimal change set and preserve all running notes, we need to make the following update:

```js
let voices = [
  {gate: 0.0, freq: 440, key: 'v1'},
  {gate: 0.0, freq: 440, key: 'v2'},
];

function synth(vs) {
  return el.add(vs.map(function(v) {
    return el.mul(
      el.const({key: `${v.key}:gate`, value: v.gate}),
      el.cycle(el.const({key: `${v.key}:freq`, value: v.freq}))
    );
  });
}
```

With these changes, you can see that we're uniquely identifying the `const` node responsible for each voice's
gate value, and the `const` node responsible for each voice's frequency value, which is all Elementary needs
to find and make the minimal set of changes (two property value changes) for each noteOn/noteOff event.

Finally, it's worth noting that the `key` prop can be passed down to any primitive rendering node for this
unique identification between render passes, but it's almost always at the leaf nodes (nodes which have no children themselves, like `const`) where
using a key is valuable.
