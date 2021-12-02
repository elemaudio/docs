# MIDI Handling

The midi event fires on the core `Renderer` interface any time the runtime receives a
MIDI event from any connected and enabled device. By default, the runtime will be listening
to any such device, which may yield frequent MIDI events. Note: this event is currently only supported
by the Elementary Command line tool.

The `'midi'` event is fired with a single argument: an object describing the event.
For example:

```js
// A noteOn event
{
  bytes: '90456a',
  noteFrequency: 440,
  noteName: 'A3',
  noteNumber: 69,
  source: 'Moog Grandmother',
  type: 'noteOn'
}

// A noteOff event
{
  bytes: '80456a',
  noteFrequency: 440,
  noteName: 'A3',
  noteNumber: 69,
  source: 'Moog Grandmother',
  type: 'noteOff'
}

// A controller event
{
  bytes: 'b0082d',
  channel: 1,
  source: 'Moog Grandmother',
  target: 8,
  type: 'controller',
  value: 45
}
```

Note: all MIDI events are enumerated with at least a `source`, `type`, and `bytes` property. Events for which
the runtime could not derive a helpful type will show `type: "raw"`. The `bytes` property is a hexidecimal string
containing the raw MIDI payload for further deserialization in such cases.

Supported events:
- NoteOn
- NoteOff
- ProgramChange
- PitchWheel
- Aftertouch
- ChannelPressure
- AllNotesOff
- AllSoundOff
- MetaEvent
- Controller
- Raw
