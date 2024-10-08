import {sveltekit} from '@sveltejs/kit/vite'
import type {UserConfig} from 'vite'

const config: UserConfig = {
	plugins: [sveltekit()],
	build: {
		target: 'esnext',
		commonjsOptions: {transformMixedEsModules: true},
	},
}

export default config
