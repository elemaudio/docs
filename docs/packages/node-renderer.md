# @elemaudio/node-renderer

The official package for rendering Elementary applications at the command line using Node.js.

Currently, applications using this renderer at the command line must be invoked by Elementary's command line
binaries, which are installed separately. The command line binaries are nearly a forked version of Node.js: that is,
you can write and run your code as if you're writing a standard Node.js application that just also happens to know
how to make sound.

## Installation

First, the npm package.

```js
npm install --save @elemaudio/node-renderer
```

Next, the command line binaries.


### MacOS and Linux

```bash
$ curl -fsSL https://www.elementary.audio/install.sh | sh
```

### Windows and Manual Installation

Windows binaries must be installed manually. You can download the binaries
from [the releases page](https://github.com/nick-thompson/elementary/releases) on this repository,
and unpack the zip file to a directory of your choosing.

## Example

```js
import {el} from '@elemaudio/core';
import {default as core} from '@elemaudio/node-renderer';

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
import NodeRenderer from '@elemaudio/node-renderer';

// Or,
import {default as core} from '@elemaudio/node-renderer';
```

### initialize

```js
core.initialize()
```

The default export from the `@elemaudio/node-renderer` package is a singleton instance which communicates with the underlying
audio driver. That instance must be initialized _after_ you've added a listener for the `load` event.

This method takes no arguments; configuring the audio driver is done at the command line at the time of invocation. Run `elementary --help`
at your command line for options.

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
Node Renderer does have access to your file system. Therefore when you try to reference sample files during your render step, such as
with `el.sample({path: '/real/path/on/disk.wav'}, el.train(1), 1)`, Elementary will attempt to find and load that file from your
file system.

Currently, only wav files are supported for this file loading mechanism.

:::info
In a near future update, the NodeRenderer will move to using a virtual file system like the Web and Offline renderers.
At that time, loading directly from disk inside the runtime will be deprecated.
:::

## MIDI

NodeRenderer is currently the only renderer which does support MIDI out of the box. By default, when invoked at the command line,
the Elementary runtime will establish listeners to every available MIDI input device on your system.

:::caution
In a near future update, MIDI handling will be deprecated from the command line tool. You're encouraged to
explore MIDI handling alternatives such as [WebMIDI.js](https://webmidijs.org/), which can already be used with
the Elementary command line binaries.
:::

The `'midi'` event fires on the singleton renderer instance any time the runtime receives a
MIDI event from any connected and enabled device, which may yield frequent MIDI events.

The `'midi'` event is fired with a single argument: an object describing the event.
For example:

```js
// A noteOn event
{
  bytes: '90456a',
  noteFrequency: 440,
  noteName: 'A3',
  noteNumber: 69,
  source: 'Moog Grandmother',
  type: 'noteOn'
}

// A noteOff event
{
  bytes: '80456a',
  noteFrequency: 440,
  noteName: 'A3',
  noteNumber: 69,
  source: 'Moog Grandmother',
  type: 'noteOff'
}

// A controller event
{
  bytes: 'b0082d',
  channel: 1,
  source: 'Moog Grandmother',
  target: 8,
  type: 'controller',
  value: 45
}
```

Note: all MIDI events are enumerated with at least a `source`, `type`, and `bytes` property. Events for which
the runtime could not derive a helpful type will show `type: "raw"`. The `bytes` property is a hexidecimal string
containing the raw MIDI payload for further deserialization in such cases.

Supported events:
- NoteOn
- NoteOff
- ProgramChange
- PitchWheel
- Aftertouch
- ChannelPressure
- AllNotesOff
- AllSoundOff
- MetaEvent
- Controller
- Raw
