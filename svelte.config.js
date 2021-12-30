import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [
				AutoImport({
					resolvers: [IconsResolver()]
				}),
				Icons({
					compiler: 'svelte'
				})
			]
		}
	}
};

export default config;
