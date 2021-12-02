# Sample Accurate Rendering

When working in Elementary, there are generally two threads of computation in the runtime
that are worth knowing about. There's the main thread, on which all of your JavaScript is executed,
and then there's the realtime thread on which all of the actual audio processing maths takes place.
On the realtime thread, audio is processed in blocks, or buffers, provided by the system device. Typically
these blocks of audio hold a few (or tens of) milliseconds of audio data.

As you write your audio software, you have some flexibility to decide what changes take effect
and where, to make your own tradeoffs about the performance and structure of your app. The general
distiction to be aware of is that any time you execute javascript, changes made to the signal flow
of your application will only be applied at the beginning of the next audio block (which means that, due
to the block size, your change might not take effect for several milliseconds).

To illustrate the distinction in better detail, let's look at an example implementing an LFO (low
frequency oscillator) to manipulate the cutoff frequency of a lowpass filter. In traditional audio software,
it's a common pattern to only apply new LFO values at the beginning of a given audio processing block to
limit the computational expense of a given process. In Elementary, we can accomplish that like this:

```js
// Here we have a simple mono process which applies a lowpass filter to the input signal,
// and we modulate the cutoff frequency of that filter with a sine shape by computing the
// new value of our "oscillator" every 12ms.
core.on('load', function() {
  setInterval(function() {
    let time = Date.now();
    let cutoff = 800 * (1 + Math.sin(2.0 * Math.PI * Date.now() / 10000));
    core.render(
      el.lowpass(el.const({key: 'cut', value: cutoff}), 1.414, el.input({channel: 0})),
    );
  }, 12);
});
```

In this example, we can see that our JavaScript runs every 12ms to compute the new value
of the LFO and update our lowpass filter accordingly. This change occurs on the main thread
and is subsequently applied on the realtime thread at the start of the next block. The value in
taking an approach like this is that when running the audio processing step on any given block
of audio, the realtime thread doesn't have to compute the new position of the LFO: it simply receives
the new value computed in JavaScript.

However, there are times where this approach is not favored. For example, what if we want to drive
the rate of that LFO into the audible range, and modulate our cutoff frequency with a sine wave running
at 100Hz? Here, computing the new position of the modulator every 12ms isn't enough to accurately represent
this waveform with any real fidelity. So instead, we can express the LFO as a signal itself, which Elementary
will then compute on the realtime thread for each block:

```js
// Here we have a simple mono process which applies a lowpass filter to the input signal,
// and we modulate the cutoff frequency of that filter with a sine oscillator running at
// audio rate.
core.on('load', function() {
  let cutoff = el.mul(800, el.add(1, el.cycle(100)));
  core.render(
    el.lowpass(cutoff, 1.414, el.input({channel: 0})),
  );
});
```

In this example, our JavaScript runs exactly once, just enough to describe the full signal
chain to Elementary. From there, Elementary runs the full process on the audio thread with sample-level
accuracy.

Understanding how, when, and where changes are made and take effect will help you evaluate
which tradeoffs you want to make to build your apps. With the above examples you can see
the two general approaches: computing values in JavaScript to keep the audio processing more
lightweight, or deferring that computation to the audio processing domain to enable sample-accurate rendering.
