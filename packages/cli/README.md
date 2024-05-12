![flowease.khulnasoft.com - Workflow Automation](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

# flowease - Workflow Automation Tool

flowease is a free and open [fair-code](https://faircode.io) distributed node-based Workflow Automation Tool. You can self-host flowease, easily extend it, and even use it with internal tools.

<a href="https://raw.githubusercontent.com/khulnasoft/flowease/master/assets/flowease-screenshot.png"><img src="https://raw.githubusercontent.com/khulnasoft/flowease/master/assets/flowease-screenshot.png" alt="flowease.khulnasoft.com - Screenshot"></a>

## Contents

<!-- TOC -->

- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Use npx](#use-npx)
  - [Run with Docker](#run-with-docker)
  - [Install with npm](#install-with-npm)
  - [Sign-up on flowease.cloud](#sign-up-on-flowease.cloud)
- [Available integrations](#available-integrations)
- [Documentation](#documentation)
- [Create Custom Nodes](#create-custom-nodes)
- [Contributing](#contributing)
- [What does flowease mean and how do you pronounce it](#what-does-flowease-mean-and-how-do-you-pronounce-it)
- [Support](#support)
- [Jobs](#jobs)
- [Upgrading](#upgrading)
- [License](#license)
<!-- /TOC -->

## Demo

📺 Here's a [:tv: short video (< 4 min)](https://www.youtube.com/watch?v=RpjQTGKm-ok) that goes over key concepts of creating workflows in flowease.

## Getting Started

There are a couple of ways to get started with flowease.

### Use npx

To spin up flowease using npx, you can run:

```bash
npx flowease
```

It will download everything that is needed to start flowease.

You can then access flowease by opening:
[http://localhost:5678](http://localhost:5678)

**Note:** The minimum required version for Node.js is v14.15. Make sure to update Node.js to v14.15 or above.

### Run with Docker

To play around with flowease, you can also start it using Docker:

```bash
docker run -it --rm \
  --name flowease \
  -p 5678:5678 \
  docker.flowease.khulnasoft.com/floweaseio/flowease
```

Be aware that all the data will be lost once the Docker container gets removed. To persist the data mount the `~/.flowease` folder:

```bash
docker run -it --rm \
  --name flowease \
  -p 5678:5678 \
  -v ~/.flowease:/home/node/.flowease \
  docker.flowease.khulnasoft.com/floweaseio/flowease
```

Refer to the [documentation](https://github.com/khulnasoft/flowease/blob/master/docker/images/flowease/README.md) for more information on the Docker setup.

### Install with npm

To install flowease globally using npm:

```bash
npm install flowease -g
```

After the installation, start flowease running the following command:

```bash
flowease
# or
flowease start
```

### Sign-up on flowease.cloud

Sign-up for an [flowease.cloud](https://www.flowease.cloud/) account.

While flowease.cloud and flowease are the same in terms of features, flowease.cloud provides certain conveniences such as:

- Not having to set up and maintain your flowease instance
- Managed OAuth for authentication
- Easily upgrading to the newer flowease versions

## Available integrations

flowease has 280+ different nodes that allow you to connect various services and build your automation workflows. You can find the list of all the integrations at [https://flowease.khulnasoft.com/integrations](https://flowease.khulnasoft.com/integrations)

## Documentation

To learn more about flowease, refer to the official documentation here: [https://docs.flowease.khulnasoft.com](https://docs.flowease.khulnasoft.com)

You can find additional information and example workflows on the [flowease.khulnasoft.com](https://flowease.khulnasoft.com) website.

## Create Custom Nodes

You can create custom nodes for flowease. Follow the instructions mentioned in the documentation to create your node: [Creating nodes](https://docs.flowease.khulnasoft.com/integrations/creating-nodes/build/)

## Contributing

🐛 Did you find a bug?

✨ Do you want to contribute a feature?

The [CONTRIBUTING guide](https://github.com/khulnasoft/flowease/blob/master/CONTRIBUTING.md) will help you set up your development environment.

You can find more information on how you can contribute to the project on our documentation: [How can I contribute?](https://docs.flowease.khulnasoft.com/reference/contributing.html)

## What does flowease mean, and how do you pronounce it?

**Short answer:** flowease is an abbreviation for "nodemation", and it is pronounced as n-eight-n.

**Long answer:** In flowease, you build your automation ("-mation") workflows by connecting different nodes in the Editor UI. The project is also built using Node.js. As a consequence, the project was named nodemation.

However, the name was long, and it wouldn't be a good idea to use such a long name in the CLI. Hence, nodemation got abbreviated as "flowease" (there are eight characters between the first and the last n!).

## Support

If you run into issues or have any questions reach out to us via our community forum: [https://community.flowease.khulnasoft.com](https://community.flowease.khulnasoft.com).

## Jobs

If you are interested in working at flowease and building the project, check out the [job openings](https://apply.workable.com/flowease/).

## Upgrading

Before you upgrade to the latest version, make sure to check the changelogs: [Changelog](https://docs.flowease.khulnasoft.com/reference/changelog.html)

You can also find breaking changes here: [Breaking Changes](./BREAKING-CHANGES.md)

## License

flowease is [fair-code](https://faircode.io) distributed under the [**Sustainable Use License**](https://github.com/khulnasoft/flowease/blob/master/packages/cli/LICENSE.md).

Proprietary licenses are available for enterprise customers. [Get in touch](mailto:license@flowease.khulnasoft.com)

Additional information about the license can be found in the [docs](https://docs.flowease.khulnasoft.com/reference/license/).
