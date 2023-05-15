# Custom Native Nodes

One of Elementary's primary goals is to provide a comprehensive vocabulary of
native audio processing nodes from which functional, declarative composition
can derive a huge set of higher level audio processes. But sometimes that's not
quite enough; sometimes you will need audio processing primitives
that Elementary doesn't provide:

* maybe you have existing DSP in C++ that you want to lean on
* maybe the constraints around expressing feedback loops in JavaScript preclude the type of audio process that you want to build
* maybe you have certain performance considerations for a particular, static piece of your process

Whatever your reason, Elementary's engine offers an API for extending its vocabulary
with your own, custom built, native audio processing nodes in C++. This guide
illustrates the process for using this API.

## GraphNode

Assuming you've already followed the [Native Integrations](./Native_Integrations.md) guide,
the first step of building your own custom node is to define a C++ class which
derives from Elementary's `elem::GraphNode<FloatType>`:


```cpp
#include <GraphNode.h>


class MyCustomNode : public elem::GraphNode<float> {
public:
    using elem::GraphNode<float>::GraphNode;

    void setProperty(std::string const& key, elem::js::Value const& val) override
    {
        // TODO
    }

    void process (elem::BlockContext<float> const& ctx) override
    {
        // TODO
    }
};
```

The simplest custom node begins with something like the above. Typically, you will only need to
consider (1) what properties, if any, your node configures itself by, and (2) how to implement the
real-time audio processing step given those properties. Thanks to Elementary's graph reconciling algorithm,
you don't need to spend any effort on handling scenarios where the graph is changing around your node.
However, you will need to be careful about thread safety between `setProperty` and `process` if you're using
the engine in the typical real-time audio scenario. As an extremely simple example, `el.const` looks something
like the following:

```cpp
#include <GraphNode.h>


class ConstNode : public elem::GraphNode<float> {
public:
    using elem::GraphNode<float>::GraphNode;

    void setProperty(std::string const& key, elem::js::Value const& val) override
    {
        if (key == "value") {
            value.store((elem::js::Number) val);
        }
    }

    void process (elem::BlockContext<float> const& ctx) override
    {
        std::fill_n(ctx.outputData, ctx.numSamples, value.load())
    }

    std::atomic<float> value { 0 };
};
```

As you build your custom node instance, all relevant real-time signal data, both input and output, is available
in the `elem::BlockContext` instance passed to `process`. The `elem::BlockContext` structure is as follows:

```cpp
template <typename FloatType>
struct BlockContext
{
    FloatType const** inputData;
    size_t numInputChannels;
    FloatType* outputData;
    size_t numSamples;
    void* userData;
};
```

Notice in particular that there is exactly 1 output channel (all Elementary nodes emit single-channel signals), and that the
opaque `userData` pointer is passed through from your higher level call to `elem::Runtime<FloatType>::process`. This allows you
to pass host-level information through your audio graph, and for your custom node instances to act upon it. A typical use case
for this feature might be passing current time information (say, `ppqn` position from a host DAW) so that your custom nodes
might emit host-synced LFO signals.

## Runtime Node Registry

Now, once we have our custom C++ node type, we simply have to register a factory function with our `elem::Runtime`
instance to establish our node as part of the Elementary vocabulary.

```cpp
runtime.registerNodeType("myCustomNode", [](elem::NodeId const id, double sampleRate, int const blockSize) {
    return std::make_shared<MyCustomNode>(id, sampleRate, blockSize);
});
```

That's it! Now our runtime is prepared to handle instructions for nodes of type `"myCustonNode"` by delegating the requisite
calls to an instance of your custom node type. From the JavaScript side then, we simply need the `createNode` method
from `@elemaudio/core`:

```js
import { el, createNode } from '@elemaudio/core';


// A simple wrapper for calling to createNode
let custom = (props, ...children) => createNode("myCustonNode", props, children);

// Some time later, we can use our custom node
core.render(el.add(custom({value: 5}), custom({value: 6})));
```

Notice here the distinction between `props` and `children`:
* `props` should carry a plain JavaScript object with key/value pairs
meant to configure the instance of your custom node. If you write `{value: 5}` then your custom node instance will see a call
to `setProperty(std::string const& key, elem::js::Value const& val)` with a `key` of `"value"` and a `val` of `5`.
* `children` should be an array of other Elementary nodes that serve as real-time signal inputs to your custom node instance. These
inputs will be served to your custom node instance as input buffer data in `elem::BlockContext<FloatType>::inputData`.


## API

For a complete and current enumeration of the `elem::GraphNode<FloatType>` API, please see [GraphNode.h](https://github.com/elemaudio/elementary/blob/main/runtime/GraphNode.h).
