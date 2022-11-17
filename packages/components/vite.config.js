// import { defineConfig, searchForWorkspaceRoot } from 'vite';

// export default defineConfig({
// 	server: {
// 		fs: {
// 			allow: [searchForWorkspaceRoot(process.cwd())]
// 		}
// 	}
// });
import {sveltekit} from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
}

export default config
