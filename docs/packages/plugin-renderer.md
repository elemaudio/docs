# @elemaudio/plugin-renderer

The official package for rendering Elementary applications within an audio plugin.

Currently, applications using this renderer must be run from within the Elementary Plugin Dev Kit,
which is installed separately, and **_currently supported only on MacOS 10.11+_**.

:::info
The `@elemaudio/plugin-renderer` package is available both on the public npm registry and in the Elementary private registry.
:::

## Installation

First, the npm package.

```js
npm install --save @elemaudio/plugin-renderer
```

Next, [download the latest plugin binaries here](https://github.com/nick-thompson/elementary/releases/latest), then:

1. Open up the DMG file and drag the appropriate plugin format to your install directory.
   Typically the VST3 will go in `~/Library/Audio/Plug-Ins/VST3`, and the AU in `~/Library/Audio/Plug-Ins/Components`.
2. Spin up a new web application dev server on `https://127.0.0.1:3000`. For a quick example, try `create-react-app`
   out of the box. See the note below on provisioning a dev certificate for serving your app over https.

At this point, with your dev server running, you can open the Elementary Plugin Dev Kit inside your DAW
and see your web application rendered there within the plugin window. Now we wire up Elementary as in the example below to start making noise.

## Example

```js
import {el} from '@elemaudio/core';
import {default as core} from '@elemaudio/plugin-renderer';

core.on('load', function() {
  core.render(
    el.mul(0.3, el.cycle(440)),
    el.mul(0.3, el.cycle(440)),
  );
});

core.initialize();
```

## Usage

```js
import PluginRenderer from '@elemaudio/plugin-renderer';

// Or,
import {default as core} from '@elemaudio/plugin-renderer';
```

### initialize

```js
core.initialize()
```

The default export from the `@elemaudio/plugin-renderer` package is a singleton instance which communicates with the underlying
plugin host. That instance must be initialized _after_ you've added a listener for the `load` event.

This method takes no arguments; configuring the input layout, sample rate, and block size is typically done via the plugin host.

### render

```js
core.render(...args: Array<NodeRepr_t | number>) : RenderStats;
```

Performs the reconciliation process for rendering your desired audio graph. This method expects one argument
for each available output channel. That is, if you want to render a stereo graph, you will invoke this method
with two arguments: `core.render(leftOut, rightOut)`.

The `RenderStats` object returned by this call provides some insight into what happened during the reconciliation
process: how many new nodes and edges were added to the graph, how long it took, etc.

## Events

The `NodeRenderer` singleton instance is an event emitter with an API matching that of the [Node.js Event Emitter](https://nodejs.org/api/events.html#class-eventemitter)
class.

The renderer will emit events from underlying audio processing graph for nodes such as `el.meter`, `el.snapshot`, etc. See
the reference documentation for each such node for details.

## Virtual File System

Unlike the [Web Renderer](./web-renderer.md) and the [Offline Renderer](./offline-renderer.md), the Elementary runtime in the
Plugin Renderer does have access to your file system. Therefore when you try to reference sample files during your render step, such as
with `el.sample({path: '/real/path/on/disk.wav'}, el.train(1), 1)`, Elementary will attempt to find and load that file from your
file system.

Currently, only wav files are supported for this file loading mechanism.

:::info
In a near future update, the PluginRenderer will move to using a virtual file system like the Web and Offline renderers.
At that time, loading directly from disk during `render()` will be deprecated.
:::

## MIDI

The PluginRenderer does not include MIDI support itself.

## Dev SSL Certificate

One thing to note, in order for the Plugin Dev Kit to load from 127.0.0.1, we need to equip the dev
server with a valid SSL certificate to serve over https. There are various ways of doing this depending
on which framework you're using. For example, `create-react-app` can be invoked with an `HTTPS=true` environment
variable, and a custom SSL certificate using `SSL_CRT_FILE` and `SSL_KEY_FILE`.

```bash
$ BROWSER=false HTTPS=true SSL_CRT_FILE=./localhost-cert.pem SSL_KEY_FILE=./localhost-key.pem npm start
```

To generate a valid, custom SSL certificate, we recommend [mkcert](https://github.com/FiloSottile/mkcert) configured
against a local certificate authority.

## Specialization

There are a few features of the `PluginRenderer` that are unique to the audio
plugin context.

### Event: `'/macro/\*'`

The `/macro/\*` event fires any time one of the eight macro parameter values changes
inside the DAW itself. These events will be enumerated by the index of the parameter changed. That is,
when the first parameter is changed the event name will be `'/macro/0'`, when the second parameter is
changed, the event name will be `'/macro/1'`, etc.

The argument given to any subscribed callbacks will simply be the new parameter value
as a number on the range [0, 1].

Example:

```js
core.on('/macro/5', function(v) {
  setCutoffFrequency(20 + v * 18000);
});
```

:::info
Note: currently these 8 parameter values cannot be written from JavaScript. This will
be addressed in a forthcoming update.
:::

### Event: `'playhead'`

The playhead event fires regularly to relay information about the host transport.

```js
interface PlayheadEvent {
  bpm: number,
  timeSigNumerator: number,
  timeSigDenominator: number,
  sampleTime: number,
  ppqPosition: number,
  ppqLoopStart: number,
  ppqLoopEnd: number,
  isPlaying: bool,
  isRecording: bool,
  isLooping: bool,
};
```

Example:

```js
core.on('playhead', function(e) {
  console.log(e);
});
```


### Window Size

You can configure what size the plugin window takes by serving a static configuration file
from your dev server at `https://127.0.0.1:3000/elementary.config.json`. This file must match
the example JSON specification below.

```json
{
  "window": {
    "width": 565,
    "height": 280,
    "maxWidth": 1130,
    "maxHeight": 560,
    "minWidth": 565,
    "minHeight": 280,
    "resizable": true,
    "preserveAspectRatio": true
  }
}
```

## Limitations

The Plugin DevKit itself currently ships with the follow constraints:

* It's currently MacOS only, 10.11+.
* It's branded the "Elementary Dev Kit" and will show up in your DAW that way
* It only exposes 8 parameters (which you can wire into your app, see below)
* It will only load your code from `https://127.0.0.1:3000`
* Only effect plugins are properly supported (MIDI information is not yet propagated)

:::info
In a near future update, we will formalize the process for shipping a production version of your plugin after building with the
Plugin Dev Kit. That process will remove the above limitations.
:::

