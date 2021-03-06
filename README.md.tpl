[![Follow on Twitter](https://img.shields.io/twitter/follow/pownjs.svg?logo=twitter)](https://twitter.com/pownjs)
[![NPM](https://img.shields.io/npm/v/@pown/nucleoid.svg)](https://www.npmjs.com/package/@pown/nucleoid)
[![Fury](https://img.shields.io/badge/version-2x%20Fury-red.svg)](https://nucleoidhub.com/pownjs/lobby)
![default workflow](https://github.com/pownjs/nucleoid/actions/workflows/default.yaml/badge.svg)
[![SecApps](https://img.shields.io/badge/credits-SecApps-black.svg)](https://secapps.com)

> **WARNING**: This project is a giant experiment.

# Pown Nucleoid

Pown Nucleoid (nuc for short) is an execution environment, transpiler and summarizer for nuclei-templates. The project has the following goals:

1. Provide an alternative nuclei template execution environment.
1. Provide an embeddable way to consume nuclei templates.
2. Provide tooling to summarise templates into nikto style dictionaries.
3. Provide a template-to-code transpiler.

## Why Dictionaries

Most Nuclei templates do not have advanced logic. Most templates instruct the interpreter to perform several requests and check the results using the matcher syntax. Rather than executing individual templates, we can boil them down to a simple dictionary (basically what nikto is doing), easily traversed, pipelined, etc. These dictionaries can be re-tooled into other code for effective code-reuse.

## Why Transpile

Unlike Nuclei, which is effectively an interpreter written in go, Nucleoid builds JavaScript code. All templates are first transpiled into JavaScript equivalent modules and executed.

The benefits of this approach are a few:

1. The V8 engine backing Node is much more advanced to optimize hot code paths then a simple interpreter. This helps when performing large scans.
2. The Nuclei templating language is limited. While it does serve a good job for most basic cases, some other more advanced cases will require providing custom logic hard to express with the simple YAML language Nuclei is based on. Thus, having a transpiled script to work from is an excellent starting point to optimize performance and extend tests with more advanced features.
3. Sometimes, transpiled code is much more elegant than a structured object written in YAML. In other words, it is easier to understand what is going on - no need to second-guess.
4. The transpiled templates can be directly included in other JavaScript tools and libraries. Import this npm module and have it as you wish. You can even run tests from your very own browser if this is what you want. Build your tools as you see fit!

## Credits

All credits go to projectdiscovery and [Nuclei](https://github.com/projectdiscovery/nuclei/).

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

See [nuclei-templates](https://github.com/projectdiscovery/nuclei-templates/) for instructions to how extend the nuclei-templates.
