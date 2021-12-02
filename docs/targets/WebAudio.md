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

Here, the `ElementaryWebAudioRenderer.initialize` function expects at least argument, an AudioContext,
and an optional second argument which will be passed on to the construction of the underlying AudioWorkletNode.
See the documentation for the AudioWorkletNode options object [here](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode/AudioWorkletNode).

Finally, `ElementaryWebAudioRenderer.initialize` is an async function (or, returns a promise) which resolves
to the resulting AudioWorkletNode. You may connect inputs to and outputs from the returned node to insert the Elementary
node into your WebAudio graph.
