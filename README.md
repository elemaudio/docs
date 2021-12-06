# Elementary Audio Docs

Community powered documentation site for [Elementary Audio](https://elementary.audio).

## Contributing

We need your help to make these docs a great community resource. Here are a couple of ways you can contribute.

* Add an Example
    * Have a good example illustrating or explaining a good use case for a given library function? Share it with the community! See below for example guidelines.
* Give Feedback
    * For larger structural or organizational ideas to improve this project, please open an issue to start a discussion
* Submit a PR
    * If you've found something small like a typo, a poorly written sentence, or an unclear explanation, feel free to make a change and open a PR


### Example Guidelines

Examples should be short, self-contained snippets of code that illustrate the usage of a given library function in the simplest possible way.

* Where possible, try to provide an example which could be copy/pasted into an existing project and run correctly
* Try to provide helpful context to illustrate what problem your example solves
* Apply comments in your code example liberally to help the reader
* Assume that an `import {core, el}` statement is written for you, and omit it from your example
* Assume the reader has a background in software development, with little JavaScript or DSP experience.

Lastly, take credit for your example! Feel free to provide a link back to your GitHub profile next to your example.

## Development

This site is built with [Docusaurus 2](https://docusaurus.io).

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
Please run this command before submitting a pull request to ensure that your PR builds correctly.
