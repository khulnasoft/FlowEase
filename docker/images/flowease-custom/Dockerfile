ARG NODE_VERSION=18

# 1. Create an image to build flowease
FROM --platform=linux/amd64 floweaseio/base:${NODE_VERSION} as builder

# Build the application from source
WORKDIR /src
COPY . /src
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store --mount=type=cache,id=pnpm-metadata,target=/root/.cache/pnpm/metadata pnpm install --frozen-lockfile
RUN pnpm build

# Delete all dev dependencies
RUN jq 'del(.pnpm.patchedDependencies)' package.json > package.json.tmp; mv package.json.tmp package.json
RUN node scripts/trim-fe-packageJson.js

# Delete any source code, source-mapping, or typings
RUN find . -type f -name "*.ts" -o -name "*.js.map" -o -name "*.vue" -o -name "tsconfig.json" -o -name "*.tsbuildinfo" | xargs rm -rf

# Deploy the `flowease` package into /compiled
RUN mkdir /compiled
RUN NODE_ENV=production pnpm --filter=flowease --prod --no-optional deploy /compiled

# 2. Start with a new clean image with just the code that is needed to run flowease
FROM floweaseio/base:${NODE_VERSION}
ENV NODE_ENV=production

ARG FLOWEASE_RELEASE_TYPE=dev
ENV FLOWEASE_RELEASE_TYPE=${FLOWEASE_RELEASE_TYPE}

WORKDIR /home/node
COPY --from=builder /compiled /usr/local/lib/node_modules/flowease
COPY docker/images/flowease/docker-entrypoint.sh /

RUN \
	pnpm rebuild --dir /usr/local/lib/node_modules/flowease sqlite3 && \
	ln -s /usr/local/lib/node_modules/flowease/bin/flowease /usr/local/bin/flowease && \
	mkdir .flowease && \
	chown node:node .flowease

ENV SHELL /bin/sh
USER node
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
