# Filters

The core filtering constructs.


### el.pole

Implements a simple one-pole filter, also sometimes called a leaky integrator.
Expects two children, the first is the pole position, the second is the signal to filter.

Difference equation: y[n] = x[n] + p * y[n-1]

Reference: https://ccrma.stanford.edu/~jos/filters/One_Pole.html

#### Props

None

### el.zero(b0, b1, x)

Implements a simple one-zero filter. Expects the b0 coefficient as the first
argument, the zero position b1 as the second argument, and the input to the filter as the third.

Difference equation: y[n] = b0 * x[n] + b1 * x[n-1]

Reference: https://ccrma.stanford.edu/~jos/filters/One_Zero.html

#### Props

None

### el.dbclock(x)

Implements a default DC blocking filter with a pole at 0.995 and a
zero at 1. This filter has a -3dB point near 35Hz at 44.1kHz.

#### Props

None

### el.df11(b0, b1, a1, x)

A simple first order pole-zero filter, Direct Form 1.

#### Props

None

### el.smooth

Unity gain one-pole smoothing. Commonly used for addressing discontinuities in
control signals. Expects two children, the first is the pole position, the second
is the signal to filter.

#### Props

None

### el.sm

A pre-defined smoothing function with a 20ms decay time equivalent
to `el.smooth(el.tau2pole(0.02), x)`.

#### Props

None

### el.biquad(b0, b1, b2, a1, a2, x)

A second order transposed direct-form II filter implementation. Expects six children,
the first five of which are the raw filter coefficients (b0, b1, b2, a1, a2). The final
input is the signal to filter.

#### Props

None

### el.lowpass(fc, q, x)

A simple lowpass biquad filter with a cutoff frequency at `fc`, a Q of `q`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.highpass(fc, q, x)

A simple highpass biquad filter with a cutoff frequency at `fc`, a Q of `q`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.bandpass(fc, q, x)

A simple bandpass biquad filter with a cutoff frequency at `fc`, a Q of `q`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.allpass(fc, q, x)

An allpass biquad filter with a cutoff frequency at `fc`, a Q of `q`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.notch(fc, q, x)

A notch biquad filter with a cutoff frequency at `fc`, a Q of `q`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.peak(fc, q, gainDecibels, x)

A peaking (bell) biquad filter with a cutoff frequency at `fc`, a Q of `q`, gain in decibels as `gainDecibels`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.lowshelf(fc, q, gainDecibels, x)

A lowshelf biquad filter with a cutoff frequency at `fc`, a Q of `q`, gain in decibels as `gainDecibels`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.highshelf(fc, q, gainDecibels, x)

A lowshelf biquad filter with a cutoff frequency at `fc`, a Q of `q`, gain in decibels as `gainDecibels`, and which
filters the input signal `x`.

Reference: https://www.musicdsp.org/en/latest/Filters/197-rbj-audio-eq-cookbook.html

#### Props

None

### el.convolve([props], x)

A convolution node which reads an impulse response from disk and convolves it with
the input signal `x`.

#### Props

| Name     | Default  | Type   | Description                                   |
| -------- | -------- | ------------------------------------------------------ |
| path     | ''       | String | The location of the impulse response on disk  |


### el.pink

A pink noise filter designed to apply a -3dB/octave lowpass to the incoming signal.

Reference: https://www.firstpr.com.au/dsp/pink-noise/#Filtering

#### Props

None
