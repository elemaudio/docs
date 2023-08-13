# Virtual File System (VFS)

Elementary uses the notion of a virtual file system to coordinate audio processing nodes
which have dependencies on large, static audio buffers. A common example is the `el.sample`
node which manages playback of an audio sample, or `el.table` which performs an interpolated
read from a lookup table. Using the virtual file system enables internal shared memory optimizations
and allows the audio processing nodes to remain lightweight.

:::info
While we refer to this feature as a virtual "file system," it's really just a flat storage object
which maps from an arbitrary string name (key) to a single-channel buffer of audio data (value).

In future versions, the API naming may be updated to reflect this. The native C++ interface already
referes to the same feature as a "shared resource map."
:::

## Loading data into the VFS

The process for loading data into the virtual file system depends on how you're using Elementary, although
the concept is the same everywhere: you add key-value entries to the virtual file system map, where the key is
a "virtual file path" or simply a name of your choosing, and the value is an audio buffer, and then you build
your audio graph by referencing the associated name or virtual file path of the buffer you want to use.

If you're working strictly in JavaScript with one of the provided renderers, consult the documentation
for your specific renderer on adding entries to the VFS.

If you're working with the C++ API, see [`elem::Runtime<FloatType>::updateSharedResourceMap`](./Native_Integrations#updatesharedresourcemap). For
your custom integrations, it may be worth establishing a dedicated message or FFI to allow your scripting environment to make calls to this native
method. This is exactly how the provided renderers offer their VFS APIs.

## Reading data from the VFS

Again the details differ here depending on your use case. In most cases, however, you will simply read from the VFS by
giving relevant nodes the right name or virtual file system path to perform the lookup themselves. For example, suppose
that we've loaded a particular buffer into the map with the name "sample0":

```js
// In the case of the web-renderer, for example we might use Web APIs to fetch and decode the
// audio buffer data, then `updateVirtualFileSystem` to load it in
let res = await fetch('https://ia800407.us.archive.org/9/items/999WavFiles/10.mp3');
let sampleBuffer = await ctx.decodeAudioData(await res.arrayBuffer());

core.updateVirtualFileSystem({
  'sample0': sampleBuffer.getChannelData(0),
});
```
or equivalently:

```cpp
std::vector<float> myAudioBuffer (...);
runtime->updateSharedResourceMap("sample0", myAudioBuffer.data(), myAudioBuffer.size());
```

Now we should be ok to render an audio graph which references `sample0` from one of the appropriate nodes:

```
// In our JavaScript environment somewhere
core.render(el.sample({path: 'sample0'}, 1, 1));
```

## Inspecting

As of v2.1.0, you can now use the `listVirtualFileSystem()` method on the web and offline renderers, or equivalently the `getSharedResourceMapKeys()` method on the `elem::Runtime<FloatType>` interface, to list by name the contents of shared map. This API intentionally does
not share access to the underlying buffers to ensure immutability and thread safety.

## Pruning

As of v2.1.0, you can also now use the `pruneVirtualFileSystem()` method on the web and offline renderers, or equivalently the `pruneSharedResourceMap()` method on the `elem::Runtime<FloatType>` interface, to remove contents from the shared map that are not actively being used
by any of the processing graph.

## With Custom Native Nodes

Lastly, if you find yourself needing a custom native node with a dependency on the virtual file system, you
can access the shared buffer map by overriding `elem::GraphNode<FloatType>::setProperty`. The GraphNode API provides
two different `setProperty` overloads, one of which carries a reference to Elementary's internal `SharedResourceMap<FloatType>& resources`.
From there you'll be able to grab a pointer to the audio buffer you need by name.
