---
slug: /reference
---

# Core Library Reference

The Elementary standard library is available as a named import `el` from the
core npm package. This module provides a set of prebuilt signal processing
functions to facilitate more easily assembling larger, complex applications.

```js
import {el} from '@elemaudio/core';
```

Below lists an index of all available standard library functions, organized by
category.

### Analysis

* [el.meter](./reference/meter.md)
* [el.scope](./reference/scope.md)
* [el.fft](./reference/fft.md)
* [el.snapshot](./reference/snapshot.md)

### Basics

* [el.accum](./reference/accum.md)
* [el.const](./reference/const.md)
* [el.counter](./reference/counter.md)
* [el.db2gain](./reference/db2gain.md)
* [el.maxhold](./reference/maxhold.md)
* [el.metro](./reference/metro.md)
* [el.ms2samps](./reference/ms2samps.md)
* [el.select](./reference/select.md)
* [el.sr](./reference/sr.md)
* [el.tau2pole](./reference/tau2pole.md)
* [el.time](./reference/time.md)

### Delays

* [el.delay](./reference/delay.md)
* [el.sdelay](./reference/sdelay.md)
* [el.tapIn](./reference/tapIn.md)
* [el.tapOut](./reference/tapOut.md)
* [el.z](./reference/z.md)

### Dynamics

* [el.compress](./reference/compress.md)

### Filters

* [el.allpass](./reference/allpass.md)
* [el.bandpass](./reference/bandpass.md)
* [el.biquad](./reference/biquad.md)
* [el.convolve](./reference/convolve.md)
* [el.dcblock](./reference/dcblock.md)
* [el.df11](./reference/df11.md)
* [el.highpass](./reference/highpass.md)
* [el.highshelf](./reference/highshelf.md)
* [el.lowpass](./reference/lowpass.md)
* [el.lowshelf](./reference/lowshelf.md)
* [el.notch](./reference/notch.md)
* [el.peak](./reference/peak.md)
* [el.pink](./reference/pink.md)
* [el.pole](./reference/pole.md)
* [el.scope](./reference/scope.md)
* [el.sm](./reference/sm.md)
* [el.smooth](./reference/smooth.md)
* [el.svf](./reference/svf.md)
* [el.svfshelf](./reference/svfshelf.md)
* [el.zero](./reference/zero.md)

### Math

* [el.rand](./reference/rand.md)
* See [Math](./reference/Math.md)

### Noise

* [el.noise](./reference/noise.md)
* [el.pinknoise](./reference/pinknoise.md)

### Oscillators

* [el.blepsaw](./reference/blepsaw.md)
* [el.blepsquare](./reference/blepsquare.md)
* [el.bleptriangle](./reference/bleptriangle.md)
* [el.cycle](./reference/cycle.md)
* [el.phasor](./reference/phasor.md)
* [el.saw](./reference/saw.md)
* [el.square](./reference/square.md)
* [el.train](./reference/train.md)
* [el.triangle](./reference/triangle.md)

### Samples

* [el.sample](./reference/sample.md)
* [el.table](./reference/table.md)

### Signals

* [el.adsr](./reference/adsr.md)
* [el.env](./reference/env.md)
* [el.latch](./reference/latch.md)
* [el.select](./reference/select.md)
* [el.seq](./reference/seq.md)
* [el.seq2](./reference/seq2.md)
* [el.sparseq](./reference/sparseq.md)
