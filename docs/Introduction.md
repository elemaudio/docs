---
sidebar_position: 1
slug: /
---

# Introduction

Elementary is a JavaScript framework for writing high performance, native audio applications that
can run on a wide variety of target platforms. This is a novel approach to the way that we think about
and write our audio software that prioritizes simplicity, iteration speed, developer experience, and time to market.
With those priorities, we think we can help you develop and ship your audio application faster and more easily than
any similar tool in this space.

## Motivation

The conventional approach to writing audio software is an challenging process requiring expertise
in a wide breadth of topics– C++, multi-threading and thread safety, lock-free programming, and realtime thread safety
come to quickly to mind, and we haven't even mentioned digital signal processing itself. Moreover, the tooling, workflow,
and developer experience that we have in this approach pales in comparison to that of the web software industry, for example.
All together, the reality of these complications is that the conventional approach for writing audio software is
difficult and time consuming. We believe it doesn't have to be that way.

Elementary aims to eliminate as much of that complexity and difficulty as possible, removing every barrier that we can that
stands between you and shipping your audio application. We do that through a functional, declarative programming model that
allows you to describe your desired audio process as a pure function of your application state, and leave everything else
up to Elementary. You can write your software focusing solely on _what_ your application is, leaving the _how_ to the framework.

```js
// An example synthesizer voice describing a detuned saw pair running through
// a lowpass filter, all as a pure function of our application state, received
// here as "props," short for "properties."
function synthVoice(props) {
  return el.lowpass(props.cutoffFrequency, 0.707, el.add(
    el.blepsaw(props.noteFrequency),
    el.blepsaw(el.mul(1.01, props.noteFrequency)),
  ));
}

// Rendering a hypothetical array of voice data by mapping the state through
// our synthVoice function above.
core.render(el.add(...voiceData.map(synthVoice)));
```

Notice how in our example here, though contrived as it may be, we don't pay any mind to any of the complexity
mentioned above: multi-threading and thread safety, lock-free programming, and realtime thread safety. More importantly,
as our state (our `voiceData` array) changes, the rest of our program doesn't: our audio process is still simply a function
of that state. This design decision here is why working with Elementary can be faster, easier, and fundamentally more simple
than the conventional approach.

To deeply understand what's happening in this example, check out [In Depth](./In_Depth.md).
