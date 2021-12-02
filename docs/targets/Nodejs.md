# Command Line Applications

After completing the [installation steps](../README.md#installation), you should be
able to invoke `elementary` at your command line. The next step, then, is to write a bit
of code that will make some noise. Consider the example below: we first import the `ElementaryNodeRenderer`
from the npm package, establish a callback for the "load" event, and then initialize the renderer.

```javascript
import {ElementaryNodeRenderer as core, el} from '@nick-thompson/elementary';

core.on('load', function() {
  core.render(el.cycle(440), el.cycle(441));
});

core.initialize();
```

That's it! Save the file to, say, `index.js`, then invoke the file with elementary:

```bash
$ elementary index.js
```

Now you should be hearing a simple beating sine tone.

## CLI Options

When working with the `elementary` command line tool, the following help menu is available
by passing the `--help` or `-h` flag. Here we'll go into more detail about each of the available options.

```bash
Usage: elementary [options] [node_options] file.js

    Run the given file with elementary.

Examples:

    elementary -i 2 -o 2 path/to/flanger.js
    elementary --inputs=2 --outputs=2 path/to/flanger.js

Options:

    -h, --help      Print this help and exit
    -i, --inputs    Set the number of input channels with which to open the driver. Default: 0.
    -o, --outputs   Set the number of output channels with which to open the driver. Default: 2.
    -s, --stack     Set the rendering stack size. Default: 512.
    -e, --heap      Set the rendering heap size. Default: 512.
    -q, --quantize  Set the rendering quantization interval. Default: -1 (off).
    -f, --file      Drive the runtime from an audio file instead of from system input.
```

* *Inputs*
    * `-i, --inputs`
    * Sets the number of input channels with which to open the driver. For example, if you want to process your microphone
      signal as a stereo input, you would set this to 2.
* *Outputs*
    * `-o, --outputs`
    * Sets the number of output channels with which to open the driver. For example, if you want to procedurally generate a
      drum pattern and output your kick on one channel, your snare on another, and your hats on a third, you can set this to 3.
    * Generally this corresponds with how many arguments you pass to `core.render`: e.g. `core.render(kick, snare, hat)`, as the arguments
      here posititionally correspond with which output channel you're writing to.
* *Stack*
    * `-s, --stack`
    * This option will likely often be unnecessary. It allows you to tune how much memory Elementary will allocate to prepare for
      rendering your audio process.
    * If you exceed the memory allocation you'll receive an error message, so if you find yourself needing more memory you can set this value
      larger. Or, if you need to run in a resource-constrained environment you can tune this value down to exactly as much as you need.
* *Heap*
    * `-e, --heap`
    * Like *stack*, this option will likely often be unnecessary. It's another way to tune how much memory Elementary will allocate to prepare for
      rendering your audio process.
    * If you exceed the memory allocation you'll receive an error message, so if you find yourself needing more memory you can set this value
      larger. Or, if you need to run in a resource-constrained environment you can tune this value down to exactly as much as you need.
* *Quantize*
    * `-q, --quantize`
    * Specifies the rendering event quantization interval in milliseconds.
    * Setting this value to anything above zero will have Elementary defer any changes made during a call to `core.render` until the next quantize
      boundary. For example, if you want to change the frequency of a synth note exactly in time with an LFO period, you can do so with this.
* *File*
    * `-f, --file`
    * **This option is not currently supported, but planned for the near future.**
    * Passing this argument will run Elementary with an input signal read from a file instead of from your microphone or system driver.
    * This too will enable offline rendering mode so that you can process to and from files as fast as possible.

Finally, any options present at the command line that are not consumed while processing for the above list will be passed onto initialize Node.js.
With that, you can always pass Node.js-specific options such as `--prof` to enable such behavior in Node.

## Node.js/npm Compatibility

The Elementary command line application is itself a binary application much like Node.js, designed
to execute your scripts to build up audio signal processes. Elementary
is in fact built on Node.js itself, hence the tight compatibility.

Specifically, Elementary is currently built on Node.js v16.0.0 ([7162e68](https://github.com/nodejs/node/releases/tag/v16.0.0)),
therefore the following compatibility constraints apply:

* Any Node.js program which runs comfortably in Node.js v16.0.0 will run the same in Elementary
* Any npm packages which suppoort Node v16.0.0 will support Elementary
* Any native Node extensions _must_ be built by Node v16.0.0 for compatibility with Elementary
    - This is to ensure Node ABI compatibility between the compiled extension and Elementary
* When invoking Elementary at the command-line, any arguments not consumed by Elementary will be passed straight onto Node itself
    - E.g. writing `elementary --prof myapp.js` is much the same as writing `node --prof myapp.js`

If your application has compatibility requirements not addressed here, or must be tied to
a different version of Node.js, please open an issue.
