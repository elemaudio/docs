# Native Rendering

To really understand how to work with Elementary, I think that there are generally two
components to grasp. The first is what happens "above" the call to `core.render`, and the
second is what happens "below."

Above the call to `core.render` is the construction of the signal flow graph, which is
done by composing over more primitive signals. For example, the number `440` represents a signal of a constant
value `440`, which is equivalent to writing `el.const({value: 440})`. We can compose over that with
`el.cycle(440)` or `el.cycle(el.const({value: 440}))` to describe a sine tone signal at 440Hz. We can
then further write something like,

```js
let x = el.cycle(el.const({value: 440}));
let y = el.mul(x, x);
```

Here we're composing over `x` to introduce a signal `y` which demonstrates amplitude modulation. My
goal is that with examples like these, simple tutorials, and comprehensive reference documentation for
all available signal nodes, building "up" is intuitive enough that your imagination can run free.

On the other side, it's important to understand what happens when you finally do call `core.render` to really
understand how to write an application with Elementary. Here, we first need to dig a little deeper into the signals
that we constructed above. In general, there are two types of signal nodes provided by the Elementary library:
primitives, and abstractions over primitives.

A primitive signal node is one understood by the underlying native rendering engine in Elementary. All other
library functions ultimately decay to primitive signals. For example, the following are primitive nodes:

* el.mul
* el.sin
* el.const
* el.phasor

By contrast, when you write `el.cycle(440)`, the native rendering engine won't understand the notion of a `cycle`. That's
because `el.cycle` is in fact just a composition over the above-listed primitives:

```js
function cycle(hz) {
  return el.sin(el.mul(2.0 * Math.PI, el.phasor(hz)));
}
```

So when you write `el.cycle` in your signal flow, it's basically just short-hand for the primitive construction shown here.
By the time you call `core.render`, the signal flow graph has already decayed to primitive nodes, and at this point Elementary
can study exactly what you've asked it to render, and carefully assemble native primitive nodes in exactly the same order in the realtime
audio thread.

One question I've often been asked is: "How do you get JavaScript to run fast enough for realtime audio processing?"
By now, the answer to this question is hopefully simple: the realtime audio processing is still done in highly-optimized, native
processing blocks. We use JavaScript here only to communicate what the signal flow should look like, and Elementary's realtime
engine handles the rest.
