import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect'

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
				{
					name: 'dummy',
					configResolved(config) {
						console.log(config.plugins.map(p => p.name).join(', '))
						const idx = config.plugins.findIndex(p => p.name === 'vite-plugin-svelte')
						const idx2 = config.plugins.findIndex(p => p.name === 'unplugin-autoimport')
						if (idx > -1 && idx2 > -1) {
							console.log(`${idx} => ${idx2}`)
						}
					}
				},
				Icons({
					compiler: 'svelte'
				}),
				{
					...AutoImport({
	          dts: 'src/auto-imports.d.ts',
						resolvers: [IconsResolver()]
					}),
					enforce: 'post'
				},
				Inspect({ enabled: true })
			]
		}
	}
};

export default config;
