import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import checker from 'vite-plugin-checker';

import packageJSON from './package.json';
import { vitestConfig } from '../design-system/vite.config.mts';
import icons from 'unplugin-icons/vite';

const vendorChunks = ['vue', 'vue-router'];
const floweaseChunks = ['flowease-workflow', 'flowease-design-system', '@flowease/chat'];
const ignoreChunks = [
	'@fontsource/open-sans',
	'@vueuse/components',
	// TODO: remove this. It's currently required by xml2js in NodeErrors
	'stream-browserify',
	'vue-markdown-render',
];

const isScopedPackageToIgnore = (str: string) => /@codemirror\//.test(str);

function renderChunks() {
	const { dependencies } = packageJSON;
	const chunks: Record<string, string[]> = {};

	Object.keys(dependencies).forEach((key) => {
		if ([...vendorChunks, ...floweaseChunks, ...ignoreChunks].includes(key)) {
			return;
		}

		if (isScopedPackageToIgnore(key)) return;

		chunks[key] = [key];
	});

	return chunks;
}

const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';

const { NODE_ENV } = process.env;

const alias = [
	{ find: '@', replacement: resolve(__dirname, 'src') },
	{ find: 'stream', replacement: 'stream-browserify' },
	{
		find: /^flowease-design-system$/,
		replacement: resolve(__dirname, '..', 'design-system', 'src', 'main.ts'),
	},
	{
		find: /^flowease-design-system\//,
		replacement: resolve(__dirname, '..', 'design-system', 'src') + '/',
	},
	{
		find: /^@flowease\/chat$/,
		replacement: resolve(__dirname, '..', '@flowease', 'chat', 'src', 'index.ts'),
	},
	{
		find: /^@flowease\/chat\//,
		replacement: resolve(__dirname, '..', '@flowease', 'chat', 'src') + '/',
	},
	...['orderBy', 'camelCase', 'cloneDeep', 'startCase'].map((name) => ({
		find: new RegExp(`^lodash.${name}$`, 'i'),
		replacement: `lodash-es/${name}`,
	})),
	{
		find: /^lodash\.(.+)$/,
		replacement: 'lodash-es/$1',
	},
];

const plugins = [
	icons({
		compiler: 'vue3',
	}),
	vue(),
];
if (process.env.ENABLE_TYPE_CHECKING === 'true') {
	plugins.push(checker({ vueTsc: true }));
}

const { SENTRY_AUTH_TOKEN: authToken, RELEASE: release } = process.env;
if (release && authToken) {
	plugins.push(
		sentryVitePlugin({
			org: 'floweaseio',
			project: 'instance-frontend',
			// Specify the directory containing build artifacts
			include: './dist',
			// Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
			// and needs the `project:releases` and `org:read` scopes
			authToken,
			telemetry: false,
			release,
		}),
	);
}

export default mergeConfig(
	defineConfig({
		define: {
			// This causes test to fail but is required for actually running it
			// ...(NODE_ENV !== 'test' ? { 'global': 'globalThis' } : {}),
			...(NODE_ENV === 'development' ? { 'process.env': {} } : {}),
			BASE_PATH: `'${publicPath}'`,
		},
		plugins,
		resolve: { alias },
		base: publicPath,
		envPrefix: 'VUE_APP',
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '\n@use "@/flowease-theme-variables.scss" as *;\n',
				},
			},
		},
		build: {
			assetsInlineLimit: 0,
			minify: !!release,
			sourcemap: !!release,
			rollupOptions: {
				treeshake: !!release,
				output: {
					manualChunks: {
						vendor: vendorChunks,
						flowease: floweaseChunks,
						...renderChunks(),
					},
				},
			},
		},
	}),
	vitestConfig,
);
