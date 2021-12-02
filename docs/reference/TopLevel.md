# Top Level Imports

```js
import {
  ElementaryNodeRenderer,
  ElementaryPluginRenderer,
  ElementaryWebAudioRenderer,
  stdlib,
  el,
  sugar,
  candyWrap,
} from '@nick-thompson/elementary';
```

The Elementary package provides a couple of top-level exports designed to facilitate easily
porting from one target to another, and to provide utilities for easily composing DSP components.

* [ElementaryNodeRenderer](#elementarynoderenderer)
* [ElementaryPluginRenderer](#Elementarypluginrenderer)
* [ElementaryWebAudioRenderer](#elementarywebaudiorenderer)
* [stdlib](#library)
* [el](#library)
* [sugar](#sugar)
* [candyWrap](#sugar)

## Targets

### ElementaryNodeRenderer

A specialization of the [Renderer](#renderer) interface described below for rendering
to the Elementary command line tool.

### ElementaryPluginRenderer

A specialization of the [Renderer](#renderer) interface described below for rendering
to the Elementary Plugin DevKit.

### ElementaryWebAudioRenderer

A specialization of the [Renderer](#renderer) interface described below for rendering
to Web Audio.

See [WebAudio Applications](../targets/WebAudio.md) for a detailed description of the
important differences in this renderer. In particular, `initialize()` must be called with
a valid AudioContext as the first argument, and an optional AudioWorkletNode options object
as the second argument. With this renderer, `initialize()` is async (or, returns a Promise) that
resolves to an instance of the AudioWorkletNode in which the engine is running.

## Renderer

Each Renderer instance is an event emitter whose interface matches that of Node.js' `events.EventEmitter`.

### Events

* ['load'](#event-load)
* ['midi'](#event-midi)
* ['meter'](#event-meter)
* ['metro'](#event-metro)

#### Event: 'load'

The load event fires when the engine has finished preparing for audio rendering and is ready
to handle render calls. Any subscribed callback will be called with a single event object
describing the properties of the audio rendering engine.

```js
interface LoadEvent {
  sampleRate: number;
  blockSize: number;
  numInputs: number;
  numOutputs: number;
};
```

#### Event: 'midi'

The midi event fires any time the runtime receives a MIDI event from any connected and enabled device. By default,
the runtime will be listening to any such device, which may yield frequent MIDI events.

See [MIDI](./Midi.md) for detailed MIDI event documentation, and please note that this event is
currently only supported in the Elementary command line tool.

#### Event: 'meter'

The "meter" event fires any time one or more [Meter nodes](./library/Analysis.md#el.meter) are placed into a rendering graph.

#### Event: 'metro'

The "metro" event fires any time one or more [Metro nodes](./library/Core.md#el.meter) are placed into a rendering graph.

### Renderer.render(a, b, c, d, ...)

This method is the bread and butter of Elementary. After constructing a signal graph using
the available library components, you'll invoke `render()` with as many arguments as you have
expected output channels. That is, to render stereo output, you'll want to write `core.render(leftOut, rightOut)`.

This method should be called exactly once each time you need to change your rendering graph. Each
invocation prompts Elementary to reconcile the current state of the rendering graph with the new desired
state, and make any necessary changes to migrate the rendering engine from one to the other.

### Renderer.initialize

This method installs the necessary communication mechanisms between the Renderer and the
backend engine, and if necessary, spins up an instance of the underlying engine. It must be called
once at the beginning of your application's lifetime to kick off the Elementary engine, and should
be called only after installing a `"load"` event listener on the Renderer instance itself.

Unless otherwise specified in the above specializations of the Renderer, this method returns a Promise
which resolves to `undefined`.

## Library

The top level package offers two exports to access the Elementary standard library: `el` and `stdlib`.
The former export, `el` is simply a convenience export which is derived by

```js
const el = candyWrap(stdlib);
```

To understand the difference in detail, consider the Sugar section below.

## Sugar

The Elementary package has two helpers for syntactic sugar when construction a rendering graph.
To understand their value, we first have to start by explaining `Renderer.createNode`: every descrption
of a rendering graph passed to `Renderer.render` must be composed of either `Node` instances or numbers. A `Node`
instance is created by invoking `Renderer.createNode`, as defined in the documentation above.

Using `Renderer.createNode` directly can be cumbersome:

```js
import {ElementaryNodeRenderer as core, stdlib} from '@nick-thompson/elementary';

core.render(
  core.createNode(stdlib.cycle, {}, [500]),
  core.createNode(stdlib.cycle, {}, [500]),
);
```

The syntax here is very explicit and not particularly user friendly: we can't conveniently
omit the props object when we have no props to declare, and we must always write the children as an array.

The `sugar` function, abbreviated here `$`, is a small helper to clean this up and make the authorship
more flexible:

```js
import {ElementaryNodeRenderer as core, stdlib, sugar as $} from '@nick-thompson/elementary';

core.render(
  $(stdlib.cycle, 500),
  $(stdlib.cycle, 500),
);

// Or maybe, if we need keys:
core.render(
  $(stdlib.cycle, $("const", {key: 'a', value: 500})),
  $(stdlib.cycle, $("const", {key: 'b', value: 500})),
);
```

This is a step in the right direction. One step further and we arrive at an interface
that matches the `el` export:

```js
let el = {
  const: (...args) => $("const", ...args),
  cycle: (...args) => $(stdlib.cycle, ...args),
};

// Now I can write
core.render(
  el.cycle(el.const({key: 'a', value: 500})),
);
```

This is essentially exactly what the final export `candyWrap` is for. It's simply a function
which takes an object which maps string keys to function values, and wraps it up using the `sugar`
function over each function value. For example:

```js
let el = candyWrap({
  const: "const",
  cycle: stdlib.cycle,
});
```

Finally, we arrive back at that `el = candyWrap(stdlib)` expression from above. And one last
parting note, if your application only ever touches on nodes in Elementary's stdlib, you can
likely ignore this section as you can simply use `el` to write your app. The point where this
starts to become important is when you need to write your own composite nodes, which is detailed
in the [Writing Reusable Components](../guides/Writing_Reusable_Components.md) guide.


