import {sveltekit} from '@sveltejs/kit/vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import type {UserConfig} from 'vite'

const config: UserConfig = {
	plugins: [sveltekit(), devtoolsJson()],
	build: {
		target: 'esnext',
		commonjsOptions: {transformMixedEsModules: true},
		assetsInlineLimit: 0,
	},
}

export default config
