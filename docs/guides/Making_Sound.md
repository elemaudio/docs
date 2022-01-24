# Making Sound 101

Ok, you're sold. You've read the website, seen the introductory video, you've already
run `npm install`, gotten your text editor open, and... you remember that you're brand
new to writing DSP. This is the guide for you.

The first thing to know is that you're at the beginning of what might be a long and wonderful
journey into the field of audio signal processing. There's a lot to learn and plenty of ways
to learn it. In this guide, we'll only dip our toes with a basic understanding just broad
enough to make your first sound with Elementary and set you on your way.

Before we get started, then, a brief list of books and resources that I recommend for after
you've finished this guide and you're ready to dig in deeper:

* [Digital Signal Processing on Wikipedia](https://en.wikipedia.org/wiki/Digital_signal_processing)
* [Julius O. Smith III's Online Books](https://ccrma.stanford.edu/~jos/)
* [Seeing Circles and Sines](https://jackschaedler.github.io/circles-sines-signals/)
* [SOS Synth Secrets](https://www.soundonsound.com/synthesizers/synth-secrets)
* [The Audio Programmer](https://theaudioprogrammer.com/)
* [DSPRelated](https://www.dsprelated.com/)
* [Earlevel Engineering](https://www.earlevel.com/main/)
* [Will Pirkle's Books](http://www.willpirkle.com/)
* [Hack Audio](https://www.hackaudio.com/)

Now, typically a beginner's introduction to digital signal processing will touch on continuous versus
discrete signals, the Nyquist-Shannon sampling theorem, and the implications of working with discrete
signals. This is a helpful background to have, but it's not a necessary prerequisite for making your
first sounds with Elementary. Instead, we're going to work with a simple, intuitive model of audio signals.

To start, our first goal will be to make a simple sine tone: sine tones are a fundamental
building block of other sounds. Therefore, if we understand ways to generate sine tones, and
especially if you then read up on [Fourier's Theorem](https://en.wikipedia.org/wiki/Fourier_series), we have
a framework for understanding more complicated sounds.

So first, to generate a single sine tone, we want to write a continuous function whose
input is time, and whose output is a sine wave. In mathematics, such a function might
look like this:

```
f(t) = sin(2 * PI * t)
```

An analogous function in JavaScript might look like this:

```js
function sine(t) {
  return Math.sin(2 * Math.PI * t);
}
```

And if we continuously invoke our `sine` function with increasing, discrete values
of time, we could plot the results to show a continuous sine wave over time:

```js
for (let i = 0; i < 10000; ++i) {
  // With real time stamps
  out = sine(Date.now());

  // Or, with simulated time stamps representing the passage of "time"
  // out = sine(i);
}
```

Now, in the digital audio domain, the above functions look quite the same. Perhaps
the big question is: how do we represent time? What is our input `t` to such functions?
In digital audio, we can compute a representation of the passage of time by looking at the
sample rate and counting how many discrete samples have elapsed since we began processing,
but with Elementary we can remain on a more intuitive plane by introducing the notion of a `phasor`.

A `phasor` is a core building block in Elementary which itself is a function of time, and which
outputs a value that increments from 0 until it reaches 1, then snaps back down to 0 and repeats. The
rate at which it does this is given in Hertz: at 440Hz, the phasor will ramp from 0 to 1 exactly 440 times
a second. Thus, the `phasor` is itself a continuous signal whose increments provide a representation of the
passage of time. We can therefore use this construct to help with our sine tone generator.

Let's start writing some audio processing functions:

```js
function sineTone(t) {
  return el.sin(el.mul(2 * Math.PI, t));
}
```

This function `sineTone` is a valid audio processing function in Elementary, and you'll notice
that it looks extremely similar to the examples above and to the intuitive mathematical model. Here,
instead of using `Math.sin` or the `*` operator we're using the builtin Elementary operators `el.sin` and
`el.mul`. The reason for these operators is that we don't actually want to compute a discrete sine value here
for some discrete input `t`: we want to describe a representation of a continuous function which outputs
a sine tone over time. Working in the language of Elementary's builtin operators (like `el.sin` and `el.mul`)
lets us do exactly that, and this description of our signal process is exactly what Elementary will ultimately
render for you within the realtime audio processing thread.

But wait, why have we written `2 * Math.PI` here then, instead of `el.mul(2, Math.PI)`. If you already noticed that,
good catch! Indeed, writing `el.mul(2, Math.PI)` is perfectly valid. Here it's helpful to explain how Elementary views
constant numbers: when Elementary encounters an expression like `el.mul(2, t)`, it will automatically rewrite that
expression to `el.mul(el.const({value: 2}), t)`. These expressions are equivalent; the former is simply shorthand for the
latter.

Writing `el.const({value: 2})` is a way of using another Elementary builtin operator to describe a function whose input
is, again, time, and whose output is always the value `2`. That means that writing `el.mul(2, Math.PI)` actually describes
three functions:

- `f(x) = 2`
- `g(x) = 3.14159...`
- A third composite function, `h(x) = f(x) * g(x)`

Elementary will happily go ahead with that for you, but note that writing `el.mul(2 * Math.PI, t)` evaluates first to the
expression `el.mul(6.28318.., t)`. Therefore, instead of `h(x) = f(x) * g(x)` describing three functions, we simply have `h(x) = 6.28318`.

This simple trick is helpful to keep in mind as you write more and more complicated Elementary applications, because
it lets you compute constant values ahead of time that might otherwise be reduntant to actually compute continuously
at audio rate (Elementary can and often will find and perform simple optimizations like this for you, but being explicit never hurts).

Ok, backing up: we've got our `sineTone` function, and we know that we want to use a `phasor` to represent time. What
will this look like?

```js
let tone = sineTone(el.phasor(440));
elementary.core.render(tone);
```

Simple! We've now arrived at a complete Elementary application for generating a continous sine tone. Let's
walk this back through one more time. To start, we have our `el.phasor(440)` which generates a ramp from 0 to 1
continuously, 440 times a second. We take this signal and multiply it by two Pi: `el.mul(2 * Math.PI, t)`. The result
is then a signal which ramps from 0 to 6.28318... continuously, 440 times a second. Finally, we take the sin of that signal
with `el.sin()`, and, remembering that [0, 2 * Pi] describes a complete cycle of the sin function, we therefore have a continuous
signal which outputs a continguous sequence of sine wave cycles, 440 per second. The complete program in Elementary is as follows:

```js
import {ElementaryPluginRenderer as core, el} from '@elemaudio/core';

function sineTone(t) {
  return el.sin(el.mul(2 * Math.PI, t));
}

core.on('load', function() {
  let tone = sineTone(el.phasor(440));
  core.render(tone);
});
```

Now before we wrap up and send you on your way, I want to prompt a small exploration for the reader. With the program
we've just completed, we have a simple sine tone playing a 440Hz, much of which is driven by `el.phasor(440)`. Remember here
that Elementary views this as identical to `el.phasor(el.const({value: 440}))`. This means that the rate at which `el.phasor`
outputs its ramp from 0 to 1 is actually itself decided by a signal. So, what if we got creative here?

```js
// Maybe slowly ramping up to 440Hz?
let tone = sineTone(el.phasor(el.mul(440, el.phasor(1))));

// Or maybe slowly ramping from 200Hz up to 640Hz?
let tone = sineTone(el.phasor(el.add(200, el.mul(440, el.phasor(1)))));

// Or maybe quickly ramping between 200Hz up to 640Hz?
let tone = sineTone(el.phasor(el.add(200, el.mul(440, el.phasor(20)))));
```

You'll notice as you go that the opportunities for experimentation here are already boundless, and if you want to
get into the proper maths of these particular experiments, see [FM Synthesis](https://en.wikipedia.org/wiki/Frequency_modulation_synthesis).
Or, if you're like me, the maths can come later: try it and see how it sounds!
