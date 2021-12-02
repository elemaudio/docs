# Noise

Noise generators and signals.

### el.noise

Generates a stream of random numbers uniformly distributed on the range [-1, 1].
This is generally referred to as "white" noise.

#### Props

None

### el.pinknoise

Equivalent to `el.pink(el.noise())`, this generates a noise signal with
a -3dB/octave frequency response, approximating "pink" noise.

#### Props

None
