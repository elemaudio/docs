---
sidebar_position: 1
slug: /
---

# Introduction

Elementary is a JavaScript framework that simplifies the process of writing high performance native audio applications.

With Elementary, you can build audio software that runs on a variety of platforms, all while prioritizing simplicity and speed, for an enhanced developer experience. By streamlining the development process and reducing time to market, Elementary is the most efficient and effective tool available for building and deploying audio applications.

## Motivation

Writing audio software can be a daunting task, even for experienced programmers. It requires a deep understanding of complex concepts such as multithreading, lock-free programming, and real-time thread safety, as well as expertise in C++ and Digital Signal Processing. In addition, the tools and workflows available to audio software developers truly pale in comparison to those available in other industries, such as web development. However, we believe it doesn't have to be this way.

At Elementary, our mission is to make the process of creating and shipping audio applications as seamless and straightforward as possible. We do this by providing a functional, declarative programming model that allows you to describe your desired audio process simply as a pure function of your application state, while leaving the technical details to the framework. This approach allows you to focus on the functionality of your application, rather than getting bogged down in the complexities of its implementation. Let Elementary handle the _how_ so you can concentrate on the _what_.

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

As you can see in this quick example, when using Elementary, you don't have to worry about the complexities of multi-threading, lock-free programming, and real-time thread safety. More importantly, as our state (our `voiceData` array) changes, the rest of our program doesn't: our audio process is still simply a function of that state. This design choice is what makes Elementary a faster, easier, and more intuitive tool for building audio software compared to the conventional approach.

To gain a more thorough understanding of what's happening in this example, check out [In Depth](./In_Depth.md).

## Supported Platforms

As of v1.0 (the current stable version), Elementary applications can run in a web browser, at the command line via Node.js,
as an audio plugin (MacOS, Windows; AU/VST3), and offline (file-to-file processing, for example), with minimal changes required in your code.

To understand how to target each platform, please refer to the following package documentation:

* [@elemaudio/web-renderer](./packages/web-renderer.md)
* [@elemaudio/node-renderer](./packages/node-renderer.md)
* [@elemaudio/plugin-renderer](./packages/plugin-renderer.md)
* [@elemaudio/offline-renderer](./packages/offline-renderer.md)

## Licensing

Elementary is not open source, but it is available to use under the [Elementary Audio SDK License Agreement](https://www.elementary.audio/license), which
invites you to build and ship your code with Elementary without a fee.
