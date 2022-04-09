# Understanding Memoization

After reading the [In Depth](../In_Depth.md) introduction to Elementary, and [Understanding Keys](./Understanding_Keys.md),
you understand that Elementary is designed for the dynamic nature of your audio application. It handles that dynamic change
through repeated calls to the `render()` function, which is addressed by the internal reconciler.

Recall, from the [In Depth](../In_Depth.md) guide, what  happens when we make a call to `render()`:

> This kicks off the process of reconciliation. The renderer will carefully step through the new graph to identify similarities and differences between the new graph and the one that's currently making sound. Along the way, it applies a series of optimizations to ensure that the graph that actually makes noise is highly efficient. As the renderer reconciles the two graphs, it precisely applies only the required changes to the underlying platform to ensure that what you're hearing reflects the new graph that you've described.

This process of reconciling changes between two graphs is a notoriously difficult problem, and as you can imagine, it
compounds with the scale of your application. Let's consider a hypothetical graph below to illustrate a very real example
of rendering a new graph to apply a constant value change. We start with a graph like the following.

(Image of graph, color a leaf node blue)

Now let's imagine that this graph represents the audio process we want, and that we've already called `render()` to realize
this graph, and we're hearing the expected results. Then a user input comes along, perhaps the user has dragged a slider
which should change the cutoff frequency of a particular filter somewhere in our graph. In that case, we understand intuitively
that the only real change here is one number: changing from the cutoff frequency that it was already at to the new value that
the user has set. In Elementary, we handle a change like this in the same way that we might handle a much larger change: we
build the graph that represents how our app should sound _now_, we call `render()` and we let Elementary handle the rest. For
illustration, let's look at our new desired graph.

(Image of graph, color the blue node red)

We can see that the graph is identical, except that the node that used to be blue is now red. This is the only change we're
asking for. But now we also see that by building this new graph and calling `render()`, Elementary has to go and compare this
graph to the prior graph to find the change that went from blue to red. How wasteful!

This is where part of the functional, declarative nature of Elementary really shines. By using "Composite" nodes, which we detail
in the following section, we can lean into the composability of pure functions to sort of "hide" huge portions of our graph from
the reconciliation process– even in the sense that we don't actually have to construct large parts of the graph if we know already
that the changes we're looking for haven't occured within those subgraphs. Through the use of composite nodes, then, we can easily
prepare Elementary to look at particular, small sections of our graph to find and apply any necessary changes.

## Composite Nodes

To describe what a Composite node actually is, let's recall the `createNode` function from [@elemaudio/core](../packages/core.md#createnode).
Most of the standard library functions that you use regularly, `el.*()`, are thin wrappers around a call to `createNode` exercising
the interface that takes a string-type `kind`. The nodes that these calls produce are called "Primitive" nodes, which ultimately describe
exactly what the reconciler needs to consider when trying to identify changes. But `createNode` can also be used with a function-type argument,
which is how we create a "Composite" node. As an example,

```js
function MyComposite({props, context, children}): NodeRepr_t {
  return resolve(el.add(
    el.blepsaw(children[0]),
    el.blepsaw(el.mul(1.01, children[0])),
  ));
}

function detunedSaws(props: Record<string, unknown>, frequency: NodeRepr_t | number) : NodeRepr_t {
  return createNode(MyComposite, props, [frequency]);
}
```

With this example, you could use the `detunedSaws` helper the same way you might use the core library:

```js
core.render(el.lowpass(800, 0.707, detunedSaws({}, 440)));
```

Now the first interesting detail of using Composite nodes reveals itself: note that by calling `createNode` and
passing our `MyComposite` function, we are never explicitly invoking `MyComposite` itself. This remains true in the internals
of the reconciler too: if Elementary doesn't _need_ to invoke `MyComposite`, it simply won't, meaning that we can both
skip the step of reconciling whatever subgraph is produced by `MyComposite`, _and_ skip making it in the first place.

## Mem Table Lookups

This leads neatly into the next question: how does Elementary know when it needs to invoke `MyComposite`? Here we
encounter the implicit memoization feature of Composite nodes. Note that our call to `createNode` carried two
other arguments: a `props` object, and an array of child nodes. These are exactly the same inputs that we destructure
in the definition of `MyComposite`: `function MyComposite({props, context, children})`, and here, the beauty of pure
functions reveals itself. Elementary uses memoization during the render pass to check: are these the same props and the
same children that we saw the last time around? If they are, we know already that we have rendered whatever subgraph
our `MyComposite` function yields, and that the change we're looking for isn't in there. If the props or children are
new, then we invoke the function and consider that subgraph in the reconciliation process.

### Advanced (memoKey)

Very often, you won't even need to really think about this, especially if you keep to a general rule of using simple, shallow
props objects when using `createNode` for Composite nodes. However, if you really want to squeeze some extra performance
out of this operation, you can use the reserved prop called `memoKey`.

```js
function detunedSaws(props: Record<string, unknown>, frequency: NodeRepr_t | number) : NodeRepr_t {
  return createNode(MyComposite, Object.assign(props, {memoKey: 'someUniqueIdentifier'}), [frequency]);
}
```

The `memoKey` prop is to be used only as a special directive when the props you're passing to `createNode` are actually
complex and difficult to compare. When you pass `memoKey` into `createNode` via the props object, Elementary will _only_
consider the value of that `memoKey` (and the prior value of that key) to decide whether or not the Composite node should be
visited during the reconciliation pass. This key pairs nicely with the idea of versioned state or "state IDs," if your application uses them, but
we recommend this feature only for advanced and specific use cases.
