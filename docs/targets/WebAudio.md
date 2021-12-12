# WebAudio Applications

Rendering Elementary applications via WebAudio is extremely simple. In general,
you'll just need to import the `ElementaryWebAudioRenderer` from the top level package,
establish a callback for the "load" event, initialize the renderer by passing in an AudioContext
and an optional configuration object, then connect the resulting AudioWorkletNode to your desired destination.

```javascript
import {ElementaryWebAudioRenderer as core, el} from '@nick-thompson/elementary';

core.on('load', function() {
  core.render(el.cycle(440), el.cycle(441));
});

(async function main() {
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });

  node.connect(ctx.destination);
})();
```

Here, the `ElementaryWebAudioRenderer.initialize` function expects at least one argument, an AudioContext,
and an optional second argument which will be passed on to the construction of the underlying AudioWorkletNode.
See the documentation for the AudioWorkletNode options object [here](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode/AudioWorkletNode).

## Virtual File System

The underlying Elementary processor supports additional configuration through the `processorOptions` field
of the AudioWorkletNode options object. In particular, this field can be used to pre-load a set of sample buffers
that can later be read from by nodes like `el.sample` or `el.table`. This option is configured via the `virtualFileSystem`
property on the `processorOptions` object:

```js
(async function main() {
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
    processorOptions: {
      // Maps from String -> Array|Float32Array
      virtualFileSystem: {
        '/any/arbitrary/path.wav': (new Float32Array(512)).map(() => Math.random()),
      }
    }
  });

  node.connect(ctx.destination);
})();
```

After configuring the core processor this way, you may use `el.sample` or any other node which
reads from file as you'd expect:

```
core.render(el.sample({path: '/any/arbitrary/path.wav'}, el.train(1)))
```

This configuration process is important for applications running in WebAudio which want to load sample buffers
because Elementary, running via WASM, does not have access to your file system or the network to try to load samples
for you.

Finally, `ElementaryWebAudioRenderer.initialize` is an async function (or, returns a promise) which resolves
to the resulting AudioWorkletNode. You may connect inputs to and outputs from the returned node to insert the Elementary
node into your WebAudio graph.
