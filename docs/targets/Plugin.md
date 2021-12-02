# Plugin Dev Kit

The Plugin Dev Kit is currently in public beta for MacOS. Windows and Linux
will be following shortly. MacOS users may download the plugin binaries [here](https://www.dropbox.com/s/ul20u6lpofrviv2/PluginDevKit-v0.10.5.zip?dl=0).

## Getting Started

1. Open up the DMG file and drag the appropriate plugin format to your install directory.
   Typically the VST3 will go in `~/Library/Audio/Plug-Ins/VST3`, and the AU in `~/Library/Audio/Plug-Ins/Components`.
2. Spin up a new web application dev server on 127.0.0.1:3000. For a quick example, try create-react-app
   out of the box. See the note below on provisioning a dev certificate for serving your app over https.

At this point, you should be able to spin up your dev server, then open the Elementary Dev Kit
plugin inside your DAW and see your web application rendered there within the plugin window. Now
all we need is to wire up Elementary to start making noise:

First we need to install Elementary from npm into our app:
```
npm install --save @nick-thompson/elementary
```

Then add just a tiny bit of code using the `ElementaryPluginRenderer` as our core rendering
interface.

```js
import {
  ElementaryPluginRenderer as core,
   el
} from '@nick-thompson/elementary';

core.on('load', function(e) {
  // Render anything you like! This here is a simple stereo lowpass filter.
  core.render(
    el.lowpass(800, 1, el.in({channel: 0})),
    el.lowpass(800, 1, el.in({channel: 1})),
  );
});

core.initialize()
```

## Limitations

The Plugin DevKit itself currently ships with the follow constraints:

* It's currently MacOS only, 10.11+. It will be cross-platform soon!
* It's branded the "Elementary Dev Kit" and will show up in your DAW that way
* It only exposes 8 parameters (which you can wire into your app, see below)
* It will only load your code from `https://127.0.0.1:3000`
* Only effect plugins are properly supported (MIDI information is not yet propagated)
* Sample, Table, and Convolve nodes are currently disabled in this build
* Plugin state saving and loading is disabled in this build (it's a development tool, not a proper plugin!)

All of the limitations noted above will be removed either in upcoming releases or at the time you're ready to package up and distribute to your customers.

## Dev SSL Certificate

One thing to note, in order for the Plugin Dev Kit to load from 127.0.0.1, we need to equip the dev
server with a valid SSL certificate to serve over https. There are various ways of doing this depending
on which framework you're using. For example, `create-react-app` can be invoked with an `HTTPS=true` environment
variable, and a custom SSL certificate using `SSL_CRT_FILE` and `SSL_KEY_FILE`.

```bash
$ BROWSER=false HTTPS=true SSL_CRT_FILE=./localhost-cert.pem SSL_KEY_FILE=./localhost-key.pem npm start
```

To generate a valid, custom SSL certificate, I recommend [mkcert](https://github.com/FiloSottile/mkcert) configured
against a local certificate authority.

## Specialization

There are a few features of the `ElementaryPluginRenderer` that are unique to the audio
plugin context.

#### Event: '/macro/\*'

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

*Note: currently these 8 parameter values cannot be written from JavaScript. This will
be addressed in a forthcoming update.*

#### Event: 'playhead'

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

#### Window Size

You can configure what size the plugin window takes by serving a static configuration file
from your dev server at `https://127.0.0.1:3000/elementary.config.json`. This config file will
likely be extended for further customization, but currently it only provides support for the
window which is detailed in the example JSON config below.

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
