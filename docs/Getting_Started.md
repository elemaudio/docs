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

To start, you'll first need to install the Elementary npm package. Beginning in v0.11.0, Elementary is available
in one of two packages: the free, limited `@elemaudio/core-lite` package, and the paid, pro `@elemaudio/core` package.

### npm

#### @elemaudio/core-lite

If you want to get started immediately with the free package, you can find it on npm
just like you'd normally expect:

```bash
npm install --save @elemaudio/core-lite
```

If you're building an app for the browser, then that's it, you're done! If you're building
at the command line for a desktop application, or using the Plugin Dev Kit for audio plugin development, see below.

#### @elemaudio/core

If you need the extra firepower of the pro `@elemaudio/core` package, purchasing a license is simple.

1. Head to [https://www.elementary.audio/account](https://www.elementary.audio/account) to make an account and sign in
2. Head to [https://www.elementary.audio/pricing](https://www.elementary.audio/pricing) to purchase your Pro license
3. Configure npm for Elementary's Private Registry
4. `npm install --save @elemaudio/core`

To configure npm for the Elementary Private Registry, you'll find instructions in your account dashboard
alongside your API key. Those instructions are repeated here:

```
# Point npm to the Elementary private registry for the @elemaudio package scope
$ npm config set @elemaudio:registry "https://www.elementary.audio/api/v1/registry/"

# Configure npm with your new API Key
$ npm config set "//www.elementary.audio/api/v1/registry/:_authToken" "$YOUR_API_KEY_HERE"
```

If you're building an app for the browser, then that's it, you're done! If you're building
at the command line for a desktop application, or using the Plugin Dev Kit for audio plugin development, see below.

### Command line

#### MacOS and Linux

```bash
$ curl -fsSL https://www.elementary.audio/install.sh | sh
```

#### Windows and Manual Installation

You can also install the appropriate binaries for your platform manually, downloading
from [the releases page](https://github.com/nick-thompson/elementary/releases) on this repository,
and unpacking the zip file to a directory of your choosing.

### Plugin Dev Kit

See [Plugin Dev Kit Target](targets/Plugin.md)

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

See [https://www.elementary.audio/license](https://www.elementary.audio/license)
