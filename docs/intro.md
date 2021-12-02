---
sidebar_position: 1
slug: /
---

# Getting Started

Elementary is a JavaScript framework for writing functional, declarative audio applications with a high
performance, native audio engine. Elementary aims to lower the barrier to entry into the
audio application space, eliminate the gap between prototyping and production, and bring the functional reactive
programming model to DSP.

Watch the [intro video](https://www.youtube.com/watch?v=AvCdrflFHu8) for the full story.

Out of the box, the Elementary engine can run in the browser via the [Web Audio target](targets/WebAudio.md), in an
audio plugin using the [Plugin Dev Kit target](targets/Plugin.md), or on desktop at the command line using the
[Node.js-based command line target](targets/Nodejs.md).

For additional flexibility and extensibility, the Elementary engine is also available via the embedded SDK for
custom native integrations. The embedded SDK is not yet publicly available, please email nick@elementary.audio
for details.

## Installation

To start, you'll first need to install the Elementary npm package:

```bash
npm install --save @nick-thompson/elementary
```

If you're building an app for the browser, then that's it, you're done! If you're building
at the command line for a desktop application, see below.

#### MacOS and Linux

```bash
$ curl -fsSL https://www.elementary.audio/install.sh | sh
```

#### Windows and Manual Installation

You can also install the appropriate binaries for your platform manually, downloading
from [the releases page](https://github.com/nick-thompson/elementary/releases) on this repository,
and unpacking the zip file to a directory of your choosing.

## Examples

Here in the `examples/` directory you'll find a small set of example projects aiming to provide a brief introduction to various functionality. Each
example can be invoked on its own:

```bash
$ cd examples/
$ npm install
$ elementary 00_HelloSine/
```

And of course you can open these example files, poke around, and edit as you like!

## Licensing

Elementary is available for use under either the PolyForm Strict 1.0.0 license, or under
the terms of a commercial license, at your choosing. Please see LICENSE.md in the npm package
for the full text of the PolyForm Strict 1.0.0 license, and please contact nick@elementary.audio to inquire for a commercial license.

For use under the PolyForm Strict 1.0.0 license you must also include a note, "Made with Elementary Audio" either
somewhere on the visible part of your application or webpage, or within the documentation.
