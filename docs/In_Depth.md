# In Depth

Understanding an Elementary Audio application generally involves two major components: the audio
graph, and the renderer. In this article we'll cover each component in depth.

## Audio Graph

When building an application with Elementary, most of your time will be spent in the process
of building your audio graph (or signal flow graph). The workflow here is where we lean
heavily on the `@elemaudio/core` package, and specifically on the `el` export from that package.

The `el` export (short for "Elementary library") is a namespace object holding a big set of functions
that you can use to compose complex audio graphs from concrete nodes and subgraphs. Let's start by
looking at a simple example:

```js
import {el} from '@elemaudio/core';

let x = el.cycle(440);
let y = el.cycle(220);
let z = el.mul(x, y);
```

Here we have three audio nodes (each a graph, in its own right) where `x` and `y` are composed
with `el.mul()` to form `z`, showing a simple sine tone amplitude modulation example. This process
of composition is the fundamental technique of building an Elementary audio graph. It's important
to understand here that these library nodes are just functions, and this is just JavaScript, which
means that you can lean into this process in whatever way feels comfortable. For example, we can refactor
our above example to make the idea of amplitude modulation a function itself:

```js
import {el} from '@elemaudio/core';


function amplitudeModulator(modulationFrequency, input) {
  return el.mul(input, el.cycle(modulationFrequency));
}

// Here we have the same result as in our prior example
let z = amplitudeModulator(220, el.cycle(440));

// And here we can apply our new helper however we like
let zz = amplitudeModulator(220, amplitudeModulator(110, el.blepsaw(440)));
```

Building a complete audio application in Elementary is little more than applying this technique
over and over to build a larger graph from smaller ones. In general, as we'll see when we discuss
rendering, your goal should be to assemble your entire desired audio graph using functions that
receive simple application state and return Elementary nodes.

Of course, it's not just that simple; there are a few things worth deeply understanding here
in this process of building your graph.

1. Every audio node outputs a mono (single channel) signal, and every node accepts `N` input signals ("children," we sometimes call them). Each node
   expects a specific set of children, consult the Core API Reference for the specifics of each available node.

   * This means as well that working with multi-channel output formats (including stereo) will feel like building a new graph
     for each available output channel. This is not a problem, as we discuss in the rendering section below, because Elementary
     aggressively optimizes your graph during rendering.

2. Keys. By default, Elementary will do its best to optimize your graph during the render process, and keys are your best
   utility for helping Elementary see certain optimizations. We discuss keys in detail in [Understanding Keys](./guides/Understanding_Keys).

## Renderer

The second major component of building an Elementary Audio application is understanding what happens during the render process.
Elementary offers multiple different renderers for the available platforms: web, Node.js, audio plugins, etc.
Each renderer, though targeting a different platform, shares the same principles and methodology. This methodology is what we'll
discuss here, and if you're coming to Elementary with a background in web programming, this section will feel a lot like the
idea of rendering in React.js. For specifics on the subtle differences between each renderer, consult the relevant package documentation.

To start, let's briefly return to complete our first example.

```js
import {default as core} from '@elemaudio/plugin-renderer';
import {el} from '@elemaudio/core';

core.on('load', function(e) {
  let x = el.cycle(440);
  let y = el.cycle(220);
  let z = el.mul(x, y);

  core.render(z, z);
});

core.initialize();
```

Now that our example is complete you can see that the bulk of the changes are just boilerplate: imports, event listeners,
and initializing our renderer. But the thing we want to focus on is this call to `core.render(z, z)` and what's happening there.

At a high level, this call to `core.render()` is your opportunity to tell Elementary: "I want my audio process to look like this,
please make it happen." At this point, Elementary will take your input and coordinate everything it needs to with the underlying
platform to ensure you start hearing what you've asked to hear. To uncover the details of that coordination, we have to first
address the fact that applications are often dynamic: the user may provide some input such as "set the filter cutoff to X" and
we have to adapt. Elementary is designed exactly for this type of dynamic behavior: all you need to do is describe the _new_ state
of your desired graph, and call `core.render()` again. Let's extend our example,

```js
import {default as core} from '@elemaudio/plugin-renderer';
import {el} from '@elemaudio/core';

// A hypothetical event listener for input from a slider on the UI
mySlider.on('change', function(e) {
  // Let's assume that the event object here roughly matches the event object of an HTML Range input,
  // and that the slider value ranges from [0, 1]
  let newSliderValue = parseFloat(e.target.value);

  // Now maybe we want that [0, 1] range to map from [10, 1000] to represent our
  // amplitude modulation frequency.
  let x = el.cycle(440);
  let y = el.cycle(el.const({key: 'ampModFreq', value: 10 + newSliderValue * 9990}));
  let z = el.mul(x, y);

  core.render(z, z);
});

core.initialize();
```

Now our example is prepared for change: each time the user moves the slider, we'll receive a callback
informing the new value, and we simply describe the new audio graph and call `core.render()`. In this example,
we're calling `core.render()` many many times in succession as the user drags the slider: that's the idea!

Ok so now we have an appropriate backdrop to discuss what actually happens inside the call to `core.render()`.
Let's pick a point right in the middle of the lifetime of our application: we have already called `core.render()`
a few times, the user is now changing the slider, we have a new desired audio graph, and we call `core.render()` again.
At this point, our renderer understands two things: it understands the current state of the audio graph, that is, the
state of the graph that is currently making noise, and it understands that you're now asking for a new audio graph.

This kicks off the process of reconciliation. The renderer will carefully step through the new graph to identify
similarities and differences between the new graph and the one that's currently making sound. Along the way, it applies
a series of optimizations to ensure that the graph that actually makes noise is highly efficient. As the renderer
reconciles the two graphs, it precisely applies _only_ the required changes to the underlying platform to ensure
that what you're hearing reflects the new graph that you've described.

At this point, you may be wondering, how can this possibly be efficient or high performance? The answer lies in
the fact that nothing we've discussed so far actually does any of the realtime native audio processing. The graphs
that we're building and discussing here are extremely lightweight, virtual representations of the desired process.
It's only after the reconciliation process has completed that we introduce the corresponding native audio processing
nodes that actually handle the realtime audio data. Elementary can already assemble and then reconcile graphs of thousands and
thousands of deeply interconnected nodes within a couple milliseconds, and we expect to make this faster still. Of course, undergoing that process does add
those few millseconds of overhead, and this is exactly the tradeoff we aim to make to ensure one thing: you as an audio
application author never need to think about _how_ to address dynamic audio graph behavior. You can always rely on one simple
paradigm: describe how your audio graph should sound now, and let Elementary handle the rest.
