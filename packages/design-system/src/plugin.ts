import type { Component, Plugin } from 'vue';
import * as components from './components';

export interface FloweasePluginOptions {}

export const FloweasePlugin: Plugin<FloweasePluginOptions> = {
	install: (app) => {
		for (const [name, component] of Object.entries(components)) {
			app.component(name, component as unknown as Component);
		}
	},
};
