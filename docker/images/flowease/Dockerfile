ARG NODE_VERSION=18
FROM floweaseio/base:${NODE_VERSION}

ARG FLOWEASE_VERSION
RUN if [ -z "$FLOWEASE_VERSION" ] ; then echo "The FLOWEASE_VERSION argument is missing!" ; exit 1; fi

ENV FLOWEASE_VERSION=${FLOWEASE_VERSION}
ENV NODE_ENV=production
ENV FLOWEASE_RELEASE_TYPE=stable
RUN set -eux; \
	npm install -g --omit=dev flowease@${FLOWEASE_VERSION} --ignore-scripts && \
	npm rebuild --prefix=/usr/local/lib/node_modules/flowease sqlite3 && \
	rm -rf /usr/local/lib/node_modules/flowease/node_modules/@flowease/chat && \
	rm -rf /usr/local/lib/node_modules/flowease/node_modules/flowease-design-system && \
	rm -rf /usr/local/lib/node_modules/flowease/node_modules/flowease-editor-ui/node_modules && \
	find /usr/local/lib/node_modules/flowease -type f -name "*.ts" -o -name "*.js.map" -o -name "*.vue" | xargs rm -f && \
	rm -rf /root/.npm

COPY docker-entrypoint.sh /

RUN \
	mkdir .flowease && \
	chown node:node .flowease
ENV SHELL /bin/sh
USER node
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
