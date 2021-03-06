[![Follow on Twitter](https://img.shields.io/twitter/follow/pownjs.svg?logo=twitter)](https://twitter.com/pownjs)
[![NPM](https://img.shields.io/npm/v/@pown/nucleoid.svg)](https://www.npmjs.com/package/@pown/nucleoid)
[![Fury](https://img.shields.io/badge/version-2x%20Fury-red.svg)](https://nucleoidhub.com/pownjs/lobby)
![default workflow](https://nucleoidhub.com/pownjs/nucleoid/actions/workflows/default.yaml/badge.svg)

# Pown Nucleoid

Pown Nucleoid (nuc for short) is an execution environment and transpiler for nuclei-templates. Unlike nuclei, which is effectively an interpreter, pown nucleoid is run

## Credits

This tool is part of [secapps.com](https://secapps.com) open-source initiative.

```
  ___ ___ ___   _   ___ ___  ___
 / __| __/ __| /_\ | _ \ _ \/ __|
 \__ \ _| (__ / _ \|  _/  _/\__ \
 |___/___\___/_/ \_\_| |_|  |___/
  https://secapps.com
```

### Authors

* [@pdp](https://twitter.com/pdp) - https://pdparchitect.nucleoidhub.io/www/

## Quickstart

This tool is meant to be used as part of [Pown.js](https://nucleoidhub.com/pownjs/pown), but it can be invoked separately as an independent tool.

Install Pown first as usual:

```sh
$ npm install -g pown@latest
```

Install nucleoid:

```sh
$ pown modules install @pown/nucleoid
```

Invoke directly from Pown:

```sh
$ pown nucleoid
```

### Standalone Use

Install this module locally from the root of your project:

```sh
$ npm install @pown/nucleoid --save
```

Once done, invoke pown cli:

```sh
$ POWN_ROOT=. ./node_modules/.bin/pown-cli nucleoid
```

You can also use the global pown to invoke the tool locally:

```sh
$ POWN_ROOT=. pown nucleoid
```

## Usage

> **WARNING**: This pown command is currently under development and as a result will be subject to breaking changes.

```
{{usage}}
```

## How To Contribute

See [pown/leaks](https://github.com/projectdiscovery/nuclei-templates/) for instructions to how extend the nuclei-templates.
