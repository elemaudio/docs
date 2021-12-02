# Oscillators

A collection of various signal generators and oscillators.


### el.phasor([props], rate, [reset])

Outputs a ramp from 0 to 1 at the given rate. Expects one child, providing
the ramp rate in `hz`.

Optionally, a pulse train can be provided as the second argument, `reset`. When
the reset signal is provided, the phasor will snap its phase back to 0 on each
rising edge of the "reset" pulse train.

#### Props

None

### el.train

Outputs a pulse train alternating between 0 and 1 at the given rate. Equivalent to
`el.le(el.phasor(x), 0.5)` where `x` is the train rate. Expects exactly one child,
providing the train rate in `hz`.

#### Props

None

### el.cycle

Outputs a periodic sine tone at the given frequency. Expects exactly one child
specifying the cycle crequency in `hz`.

#### Props

None

### el.saw

Outputs a naive sawtooth oscillator at the given frequency. Expects exactly one child
specifying the cycle crequency in `hz`.

Typically, due to the aliasing of the naive sawtooth at audio rates, this oscillator
is used for low frequencly modulation.

#### Props

None

### el.square

Outputs a naive square oscillator at the given frequency. Expects exactly one child
specifying the cycle crequency in `hz`.

Typically, due to the aliasing of the naive square at audio rates, this oscillator
is used for low frequencly modulation.

#### Props

None

### el.triangle

Outputs a naive triangle oscillator at the given frequency. Expects exactly one child
specifying the cycle crequency in `hz`.

Typically, due to the aliasing of the naive triangle at audio rates, this oscillator
is used for low frequencly modulation.

#### Props

None

### el.blepsaw

Outputs a band-limited polyblep sawtooth waveform at the given frequency. Expects
exactly one child specifying the saw frequency in `hz`.

#### Props

None

### el.blepsquare

Outputs a band-limited polyblep square waveform at the given frequency. Expects
exactly one child specifying the saw frequency in `hz`.

#### Props

None

### el.bleptriangle

Outputs a band-limited polyblep triangle waveform at the given frequency. Expects
exactly one child specifying the saw frequency in `hz`.

#### Props

None

