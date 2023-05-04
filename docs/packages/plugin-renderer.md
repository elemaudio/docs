# @elemaudio/plugin-renderer

:::warning
This package is deprecated, and continued use is no longer recommended.

If you want to build audio plugins with Elementary, please see the [Native Integrations guide](../guides/Native_Integrations.md), and
check out our [effects plugin example](https://github.com/elemaudio/effects-plugin).
:::

The official package for rendering Elementary applications within an audio plugin.

Applications using this renderer must be run from within the Elementary Plugin Dev Kit, a separate
audio plugin distributed with the npm package in VST3/AU formats, and supported only on the following platforms:

* macOS 10.11+ (x86/arm64)
* Windows 10+

## Installation

First, the npm package.

```bash
npm install --save @elemaudio/plugin-renderer
```

Next, the requisite plugin binaries are included in this npm package and can be copied to the appropriate install
directories using the `elem-copy-binaries` command. Generally you will want to copy the binaries
immediately after installing or updating to ensure that the plugin binaries match the version of the JavaScript
included herein.

```bash
npx elem-copy-binaries
```

Finally, the audio plugin will look at `https://127.0.0.1:3000` to load your application, so you'll need to spin
up your server before proceeding. For a quick example, try `create-react-app` out of the box. See the note below
on provisioning a dev certificate for serving your app over https.

At this point, with your dev server running, you can open the Elementary Plugin Dev Kit inside your DAW
and see your web application rendered there within the plugin window. Now we wire up Elementary as in the example
below to start making sound.

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

### dispatch

```js
core.dispatch(eventName: string, payload);
```

The `dispatch` method on the `PluginRenderer` interface is unique to Elementary's Audio Plugin runtime, and can be used
for communicating with the underlying audio processor within the DAW. There are two supported event types that can be
dispatched to the audio processor: `saveState`, and `setParameterValue`.

#### saveState

```js
core.dispatch('saveState', JSON.stringify(myAppState));
```

See the `loadState` event description below for more information; this mechanism can be used to inform the underlying
processor of any state that should be persisted by the audio plugin host (e.g. the DAW). This is necessary for behaviors
like saving and loading DAW project files. The payload here should be a string, and will be relayed back to your application
by the host via the loadState event at appropriate times.

#### setParameterValue

```js
core.dispatch('setParameterValue', {name: parameterName, value: newValue});
```

The `setParameterValue` event can be dispatched to the underlying audio plugin to ask the plugin host to update a
given parameter value. This is necessary for, say, capturing automation data in the host DAW's timeline as the user drags
a knob in your user interface.

Note: You should be careful here to ensure that your application state always reflects the values that the host knows
for your parameters. Therefore you should think of `setParameterValue` as an opportunity for the host to perform the update,
after which a `parameterValueChange` event will fire to inform you that the host has received your request and performed
the update.

#### resize

```js
core.dispatch('resize', {width: 500, height: 500});
```

Sends a request to the underlying plugin host to update the window size holding the plugin editor.

## Events

The `PluginRenderer` singleton instance is an event emitter with an API matching that of the [Node.js Event Emitter](https://nodejs.org/api/events.html#class-eventemitter)
class.

The renderer will emit events from underlying audio processing graph for nodes such as `el.meter`, `el.snapshot`, etc. See
the reference documentation for each such node for details.

### `'parameterValueChange'`

The `parameterValueChange` event fires any time one of your parameter values changes
inside the DAW itself. The associated event object passed to your callback will specify the ID of the
parameter whose value has changed, and the new value given. The new value given will be a number on
the range [0, 1].

Example:

```js
core.on('parameterValueChange', function(e) {
  console.log(e.paramId); // e.g. "feedback"
  console.log(e.value); // e.g. 0.193149
});
```

### `'loadState'`

The loadState event fires any time the plugin host (e.g. the DAW) is attempting to assign new state
to the plugin. This could be, for example, upon loading a saved project file: the DAW will open the
plugin in its default state, and then send the loadState event with the relevant state for the saved
project.

The event object contains a single `value` property, which is a string carrying any information you may
have requested to be saved using the `core.dispatch('saveState')` mechanism.

Example:

```js
core.on('loadState', function(e) {
  console.log(JSON.parse(e.value));
});
```

### `'playhead'`

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

## Configuration

When the Plugin Dev Kit loads inside its host, it will first try to reach `https://127.0.0.1:3000/elementary.config.json`
to retrieve a static JSON payload with configuration settings. An example configuration file is below.

```json
{
  "displayName": "BigDelay",
  "company": "My Company",
  "bundleId": "com.mycompany.bigdelay",
  "version": "1.0.0",
  "manufacturerCode": "MyCo",
  "pluginCode": "BgDe",
  "numInputChannels": 2,
  "numOutputChannels": 2,
  "window": {
    "width": 753,
    "height": 373,
    "showToolbar": false
  },
  "parameters": [
    { "paramId": "mix",     "name": "Mix",      "min": 0.0, "max": 1.0, "defaultValue": 1.0 },
    { "paramId": "size",    "name": "Size",     "min": 0.0, "max": 1.0, "defaultValue": 0.5 },
    { "paramId": "lowCut",  "name": "Lo-Cut",   "min": 0.0, "max": 1.0, "defaultValue": 0.0 },
    { "paramId": "highCut", "name": "Hi-Cut",   "min": 0.0, "max": 1.0, "defaultValue": 1.0 }
  ]
}
```

### Parameters

Note in the above example file: the `parameters` property is an array which can be populated with
as many parameters as you need. You must specify a `paramId`, `name`, `min`, `max` and `defaultValue` property
for each given parameter in the list.

### Window Size & Toolbar

By default, the Elementary Plugin Dev Kit will display a small pink toolbar with a window resizing handle.
You can disable this toolbar by setting `showToolbar` false within the `window` property as in the example above.
Window size and the available range for resizing can be configured using the following settings.

```json
{
  "window": {
    "width": 565,
    "height": 280,
    "maxWidth": 1130,
    "maxHeight": 560,
    "minWidth": 565,
    "minHeight": 280
  }
}
```

## Remote Configuration

Finally, you can configure the Elementary Plugin Dev Kit to point to a URL _other_ than `localhost:3000` by providing
a separate configuration file at `~/.ElementaryDevKitRemoteConfig.json`. This file may be used to provide a single `url`
property directing the plugin where to connect to load your resources. Example:

```json
{
  "url": "https://bigdelay.mycompany.com/static/"
}
```

## Limitations

* MacOS 10.11+ and Windows 10+
* Only effect plugins are properly supported (MIDI information is not yet propagated)

## Export (Beta)

When you're ready, you can package your plugin as a VST3 (Windows) or VST3/AU (MacOS) using the `elem-export`
command.

```bash
$ npx elem-export --help

Usage: elem-export [options] <assets>

Example:
  # With shorthand flags and a single index.html
  elem-export -o dist -m manifest.json index.html

  # With long flags and a directory of web assets
  elem-export --outputDir=dist --manifest=manifest.json build/

Options:
  -o, --outputDir <path>             Path to the directy in which to place the exported binaries
  -m, --manifest <path>              Path to the manifest file for your plugin
  -h, --help                         Display this help menu
  `);
```

Typically, you will want to prepare your web assets for production the same way you would in preparation for
hosting on a static web server (i.e. bundling and minification). This step is important; bundled assets within
the exported plugin will be loaded from relative file URLs. If your assets reference each other with absolute
paths, the exported plugin likely will fail to load. Now, once you've done that, point `elem-export` to
the directory where your prepared assets are with the `-o` flag, and to your `manifest.json` file, which here is
equivalent to the `elementary.config.json` discussed in the above configuration section.

Note: if you intend to distribute your exported binaries to other parties, you must follow a few additional steps.
First, in order to distribute a VST3, you must register and license the VST 3 Technology from Steinberg. Please see
the Steinberg website for more information: https://developer.steinberg.help/display/VST/VST+3+Licensing. Next, on MacOS,
the binaries produced via `elem-export` will need to be code signed with an appropriate certificate in order to run on
another MacOS machine.
