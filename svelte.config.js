import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		target: ['es2020'],
		vite: {
			ssr: {
				noExternal: [
					'@fortawesome/*',
					'@fortawesome/free-brands-svg-icons',
					'@fortawesome/free-regular-svg-icons',
					'@fortawesome/free-solid-svg-icons'
				]
			},

			optimizeDeps: {
				esbuildOptions: {
					define: {
						global: 'globalThis'
					},
					plugins: [
						NodeGlobalsPolyfillPlugin({
							process: true,
							buffer: true
						}),
						NodeModulesPolyfillPlugin()
					]
				}
			},
			resolve: {
				alias: {
					stream: 'stream-browserify',
					https: 'agent-base'
				}
			},

			plugins: [],
			define: {
				global: 'globalThis'
			}
		}
	}
};

export default config;
