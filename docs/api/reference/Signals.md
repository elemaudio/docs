# Signals

Builtin helpers for deriving and manipulating specific signal flows.


### el.env

A one-pole envelope follower node with different attack and release times. This is
quite similar to `el.pole(p, el.abs(x))` in implementation. Expects three children,
the pole position for the attack phase, the pole position for the release phase, and
the signal to monitor. For example,

```js
el.env(el.tau2pole(0.01), el.tau2pole(0.1), x)
```

#### Props

None

### el.adsr(a, d, s, r, g)

An exponential ADSR envelope generator, triggered by the gate signal `g`. When the
gate is high (1), this generates the ADS phase. When the gate is low, the R phase.

Expected children:
1. Attack time in seconds (number or signal)
2. Decay time in seconds (number or signal)
3. Sustain amplitude between 0 and 1 (number or signal)
4. Release time in seconds (number or signal)
5. Gate signal; a pulse train alternating between 0 and 1

#### Props

None

### el.latch(t, x)

A sample and hold node. Samples a new value from `x` on a rising edge of a pulse
train `t`, then holds and emits that value until the next rising edge of `t`.

Expected children:
1. The control signal, `t`, a pulse train
2. The input signal to sample

#### Props

None

### el.seq(props, t, [r])

A simple signal sequencer. Receives a sequence of values from the `seq` property
and steps through them on each rising edge of an incoming pulse train. Expects at least
one child, the pulse train to trigger the next step of the sequence. An optional second
child may be provided: another control signal (pulse train) whose rising edge will reset
the sequence position back to the beginning.

Example:
```js
el.sample(
  {path: '/path/to/kick.wav'},
  el.seq(
    {seq: [1, 0, 1, 0, 0, 0, 1, 1]},
    el.train(2)
  )
)
```

#### Props

| Name     | Default  | Type   | Description                                                              |
| -------- | -------- | --------------------------------------------------------------------------------- |
| seq      | []       | Array  | The sequence of values to generate                                       |
| hold     | false    | Bool   | When true, continues to output the sequence value until the next trigger |
| loop     | true     | Bool   | When true, sequence repeats, looping from end to start, indefinitely     |

### el.hann(t)

A simple Hann window generator. The window is generated according to an incoming phasor
signal, where a phase value of 0 corresponds to the left hand side of the window, and a
phase value of 1 corresponds to the right hand side of the window. Expects exactly one child,
the incoming phase.

Example:
```js
el.hann(el.phasor(1))
```

#### Props

None
