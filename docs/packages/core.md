# @elemaudio/core

The official Elementary Audio core package; this package provides the standard library for composing
audio processing nodes, as well as utilities for constructing and addressing composite nodes. This package
also provides a set of core algorithms shared by each available renderer that you can generally ignore.

## Installation

```js
npm install --save @elemaudio/core
```

## Usage

```js
import {
  el,
  createNode,
  isNode,
  resolve,
} from '@elemaudio/core';
```

### el

A namespace object through which you can access all of the available standard library nodes. For
documentation on exactly which nodes are available and what they do, see the Core API Reference.

### createNode

```ts
function createNode(compositeNodeFactory: function, props: Object, children: array<Node_Repr_t>);
```

TODO
