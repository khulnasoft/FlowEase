![flowease.khulnasoft.com - Workflow Automation](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

# flowease - Workflow automation tool

flowease is an extendable workflow automation tool. With a [fair-code](https://faircode.io) distribution model, flowease
will always have visible source code, be available to self-host, and allow you to add your own custom
functions, logic and apps. flowease's node-based approach makes it highly versatile, enabling you to connect
anything to everything.

![flowease.khulnasoft.com - Screenshot](https://raw.githubusercontent.com/khulnasoft/flowease/master/assets/flowease-screenshot.png)

## Demo

[:tv: A short video (< 5 min)](https://www.youtube.com/watch?v=1MwSoB0gnM4) that goes over key concepts of
creating workflows in flowease.

## Available integrations

flowease has 200+ different nodes to automate workflows. The list can be found on:
[https://flowease.khulnasoft.com/integrations](https://flowease.khulnasoft.com/integrations)

## Documentation

The official flowease documentation can be found on our [documentation website](https://docs.flowease.khulnasoft.com)

Additional information and example workflows on the [flowease.khulnasoft.com website](https://flowease.khulnasoft.com)

The release notes can be found [here](https://docs.flowease.khulnasoft.com/release-notes/) and the list of breaking
changes [here](https://github.com/khulnasoft/flowease/blob/master/packages/cli/BREAKING-CHANGES.md).

## Usage

- :books: Learn
  [how to **use** it from the command line](https://docs.flowease.khulnasoft.com/reference/cli-commands/)
- :whale: Learn
  [how to run flowease in **Docker**](https://docs.flowease.khulnasoft.com/hosting/installation/docker/)

## Start

You can try flowease without installing it using npx. You must have [Node.js](https://nodejs.org/en/) installed.
From the terminal, run:

`npx flowease`

This command will download everything that is needed to start flowease. You can then access flowease and start building workflows by opening [http://localhost:5678](http://localhost:5678).

## flowease cloud

Sign-up for an [flowease cloud](https://www.flowease.khulnasoft.com/cloud/) account.

While flowease cloud and flowease are the same in terms of features, flowease cloud provides certain conveniences such as:

- Not having to set up and maintain your flowease instance
- Managed OAuth for authentication
- Easily upgrading to the newer flowease versions

## Build with LangChain and AI in flowease (beta)

With flowease's LangChain nodes you can build AI-powered functionality within your workflows. The LangChain nodes are configurable, meaning you can choose your preferred agent, LLM, memory, and so on. Alongside the LangChain nodes, you can connect any flowease node as normal: this means you can integrate your LangChain logic with other data sources and services.

Learn more in the [documentation](https://docs.flowease.khulnasoft.com/langchain/).

- [LangChain nodes package](https://www.npmjs.com/package/@flowease/flowease-nodes-langchain)
- [Chatbot package](https://www.npmjs.com/package/@flowease/chat)

## Support

If you have problems or questions go to our forum, we will then try to help you asap:

[https://community.flowease.khulnasoft.com](https://community.flowease.khulnasoft.com)

## Jobs

If you are interested in working for flowease and so shape the future of the project check out our
[job posts](https://apply.workable.com/flowease/)

## What does flowease mean and how do you pronounce it?

**Short answer:** It means "nodemation" and it is pronounced as n-eight-n.

**Long answer:** "I get that question quite often (more often than I expected) so I decided it is probably
best to answer it here. While looking for a good name for the project with a free domain I realized very
quickly that all the good ones I could think of were already taken. So, in the end, I chose nodemation.
'node-' in the sense that it uses a Node-View and that it uses Node.js and '-mation' for 'automation' which is
what the project is supposed to help with. However, I did not like how long the name was and I could not
imagine writing something that long every time in the CLI. That is when I then ended up on 'flowease'." - **Jan
Oberhauser, Founder and CEO, flowease.khulnasoft.com**

## Development setup

Have you found a bug :bug: ? Or maybe you have a nice feature :sparkles: to contribute ? The
[CONTRIBUTING guide](https://github.com/khulnasoft/flowease/blob/master/CONTRIBUTING.md) will help you get your
development environment ready in minutes.

## License

flowease is [fair-code](https://faircode.io) distributed under the
[**Sustainable Use License**](https://github.com/khulnasoft/flowease/blob/master/packages/cli/LICENSE.md) and the
[**flowease Enterprise License**](https://github.com/khulnasoft/flowease/blob/master/packages/cli/LICENSE_EE.md).

Proprietary licenses are available for enterprise customers. [Get in touch](mailto:license@flowease.khulnasoft.com)

Additional information about the license model can be found in the
[docs](https://docs.flowease.khulnasoft.com/reference/license/).
