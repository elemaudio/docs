# Writing Reusable Components

In [Native Rendering](./Native_Rendering.md) we touched on the idea of primitive signal
nodes and the abstractions we can form around those primitives nodes. Here we're going
to revisit that conversation in more detail, and introduce the idea of a composite signal
node. Let's start again with this idea:

> A primitive signal node is one understood by the underlying native rendering engine in Elementary. All other
library functions ultimately decay to primitive signals.

Suppose that we want to write something that looks like this:

```js
core.render(el.sub(el.phasor(440), 0.5));
```

This is a contrived example which shows the construction of a naive sawtooth waveform at
440Hz with an amplitude of 0.5. Here, both `el.sub` and `el.phasor` are primitive nodes, which means
that after Elementary has completed the render, the realtime engine will be operating with the
same idea of an `el.sub` node and an `el.phasor` node.

Suppose now that we wanted to make our naive sawtooth waveform into a more reusable abstraction.
One simple way we could do that is to just make a plain old function:

```js
function saw(frequency) {
  return el.sub(el.phasor(frequency), 0.5);
}

core.render(saw(440));
```

Here we can see that the arguments we're passing to `core.render` are identical to the ones
passed in the prior example, because the expression `saw(440)` resolves to the identical expression
`el.sub(el.phasor(440), 0.5)` from the prior example before we actually invoke `render`. This way of
abstracting over primitive nodes works well, and is a pattern you can use freely when building applications
in Elementary. But there's another way of accomplishing a similar feat which allows Elementary an opportunity
to sneak in some helpful rendering tactics.

Let's expand on our `saw` function to make what I call a supersaw: a big mess of detuned sawtooth
oscillators all playing at once (an awesome starting point for subtractive synthesis):

```js
// Here, `frequency` will be the the frequency we're aiming to play, `spread` controls
// the extent of the detuning in Hz, and voices tells how many saws we'll use to create
// our detuned supersaw.
function supersaw(frequency, spread, voices) {
  let saws = [];

  for (let i = 0; i < voices; ++i) {
    let detune = (i / voices) * spread;
    saws.push(el.sub(el.phasor(frequency + detune), 0.5));
  }

  return el.add(saws);
}

core.render(supersaw(440, 10, 6));
```

You can see in this example that we're using the same form of abstraction, and therefore
`core.render` sees a structure which has already completely decayed to primitive nodes.
This time, our node structure is significantly bigger than the former example. Let's add a little
more here to filter our supersaw with an imaginary user-controlled cutoff frequency:

```js
core.render(el.lowpass(userCutoff, 0.717, supersaw(440, 10, 6)));

// Now let's imagine a hypothetical callback which will be invoked when the
// user manipulates the cutoff frequency:
function onCutoffChange(newCutoffValue) {
  // And let's assume here that `newCutoffValue` is of type `number`
  core.render(el.lowpass(newCutoffValue, 0.717, supersaw(440, 10, 6)));
}
```

Now we have an interesting situation. First, remember from [Understanding Keys](./Understanding_Keys.md)
the way that Elementary reconciles the new structure with the old. If we change the cutoff frequency of
our lowpass filter in response to a user interaction in this way, Elementary will understand this as
describing a completely new filter (which in a real application we would address with a `key` prop,
but here it helps our example). Notice, though, before `core.render()` even sees this new structure,
we've already evaluated `supersaw` and built that whole substructure. Elementary in turn will traverse
this whole substructure before ultimately recognizing that our supersaw hasn't changed, only the filter
has– what a bunch of wasted effort! Here we can make this both faster and simpler by introducing a new type of
node: the composite node. Let's make a few small changes to our `supersaw` function:

```js
function supersaw({props, context, children}) {
  let saws = [];

  for (let i = 0; i < props.voices; ++i) {
    let detune = (i / props.voices) * props.spread;
    saws.push(el.sub(el.phasor(props.frequency + props.detune), 0.5));
  }

  return el.add(saws);
});
```

You should see two things: first, our `supersaw` function now takes a single argument, which destructures
into `props`, `context`, and `children`. A composite node like this is not one that you'll invoke directly,
it's a function-based node that can be rendered by `core.render`:

```js
core.render(core.createNode(supersaw, {voices: 6, spread: 10, frequency: 440}, []));
```

To ease the syntax here a bit, we can use Elementary's syntactic sugar helpers:

```js
import {ElementaryNodeRenderer as core, sugar as $} from '@nick-thompson/elementary';

core.render($(supersaw, {voices: 6, spread: 10, frequency: 440}));
```

Or, using the `candyWrap` helper:

```js
import {ElementaryNodeRenderer as core, candyWrap} from '@nick-thompson/elementary';

const my = candyWrap({
  supersaw: supersaw,
});

core.render(my.supersaw({voices: 6, spread: 10, frequency: 440}));
```

Read more about the syntactic sugar helpers in the [Top Level API](../reference/TopLevel.md).

Now, when we write a composite node like this and construct it using `createNode` or the helper
functions, we ultimately receive a node which has not yet decayed to its primitive components. This
step won't happen until `core.render` deems it necessary; hence it will be Elementary which invokes
your composite node– the `supersaw` function here is not one that you'll ever need to invoke manually.

## Why Write Composite Nodes?

At this point you might be wondering: how does this even help me? Why would I not just write
my functional abstractions using the approach mentioned at the beginning of the article?

First, let's clarify that using the first approach here is totally fine! You will likely want
to write a composite node as described in the second approach for one of two reasons: (1) when Elementary
eventually invokes your composite node function, it will do so passing in a `RenderContext` object, and (2)
Elementary offers a simple memoization step around composite nodes that allows us to skip rendering parts
of our graph when we know they haven't changed.

### Memoization

Let's return to our example above: if we pack our supersaw function up as a composite node and memoize it,
then when the filter cutoff changes we can help Elementary take a shortcut directly around rendering and reconciling
the supersaw underneath– no unnecessary work! So how do we memo?

```js
function supersaw({props, context, children}) {
  let saws = [];

  for (let i = 0; i < props.voices; ++i) {
    let detune = (i / props.voices) * props.spread;
    saws.push(el.sub(el.phasor(props.frequency + props.detune), 0.5));
  }

  return el.add(saws);
});

// It's easy!
export default core.memo(supersaw);
```

That's it. We simply wrap our `supersaw` function with `core.memo` and Elementary will take care of the rest.
And if you need careful control over how the memoization step works, you can provide a compare function as well:

```js
export default core.memo(supersaw, function(prevProps, nextProps) {
  return shallowEqual(prevProps, nextProps);
});
```

### RenderContext

Now the other reason you might want to consider using a composite node is to have access
to the RenderContext during your graph construction step. Recall our supersaw function:

```js
function supersaw({props, context, children}) {
  let saws = [];

  for (let i = 0; i < props.voices; ++i) {
    let detune = (i / props.voices) * props.spread;
    saws.push(el.sub(el.phasor(props.frequency + props.detune), 0.5));
  }

  return el.add(saws);
});
```

Here the RenderContext is available as the `context` property destructured from the
input argument. The RenderContext has the following structure:

```js
interface RenderContext {
  sampleRate: number;
  blockSize: number;
  numInputs: number;
  numOutputs: number;
};
```

This context will typically match the information emitted during the "load" event on
the core renderer instance.

As an example of when using the RenderContext might be effective, consider a filter
whose coefficients are calculated according to the underlying sample rate. You can of course use
the `el.sr` node to do this within the signal graph, but if we can perform that coefficient
calculation in JavaScript during our graph construction, we save a bunch of computational
complexity in the resulting render graph.

Or another example, using the input count to dynamically adapt your app to an arbitrary
number of input channels:

```js
function myApp({props, context, children}) {
  let inputs = Array.from({length: context.numInputs}).map(function(x, i) {
    return el.in({channel: i});
  });

  return el.add(inputs.map(perInputProcessingHelper));
}
```
