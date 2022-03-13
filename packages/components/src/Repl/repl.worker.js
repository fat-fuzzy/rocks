//https://bugzilla.mozilla.org/show_bug.cgi?id=1360870 WebWorker module  ot working in FF
import * as svelte from 'https://cdn.jsdelivr.net/npm/svelte@3.38.2/compiler.js'
import rollup from 'rollup/dist/es/rollup.browser'
// importScripts(`${CDN_URL}/svelte/compiler.js`)
const CDN_URL = 'https://cdn.jsdelivr.net/npm'

const componentLookup = new Map()

async function fetchPackage(url) {
	return (await fetch(url)).text()
}

function generateLookup(components) {
	components.forEach((component) => {
		componentLookup.set(`./${component.name}.${component.type}`, component)
	})
}

async function handleMessage (event) {
	generateLookup(event.data)
	const bundle = await rollup.rollup({
		input: './index.svelte',
		plugins: [
			{
				name: 'repl-plugin',
				resolveId(importeePath, importerPath) {
					// import X from 'svelte'
					if (importeePath === 'svelte') {
						return `${CDN_URL}/svelte/index.mjs`
					}
					// import X from 'svelte/somewhere'
					if (importeePath.startsWith('svelte')) {
						return `${CDN_URL}/svelte/${importeePath.slice(7)}/index.mjs`
					}
					// import X from './file.js'
					if (importerPath && importerPath.startsWith(`${CDN_URL}/svelte`)) {
						// resolve path and get href prop
						const resolved = new URL(importeePath, importerPath).href
						if (resolved.endsWith('.mjs')) {
							return resolved
						}
						return `${resolved}/index.mjs`
					}

					// repl components
					if (componentLookup.has(importeePath)) {
						return importeePath
					}
				},
				async load(id) {
					if (componentLookup.has(id)) {
						return componentLookup.get(id).source
					}
					return await fetchPackage(id)
				},
				transform(code, id) {
					if (/.*\.svelte/.test(id)) {
						// eslint-disable-next-line no-undef
						return svelte.compile(code).js.code
					}
				}
			}
		]
	})
	const output = (await bundle.generate({ format: 'esm' })).output[0].code
	console.log('Worker handleMessage - output');
	console.log(output);
	self.postMessage(output)
}

if (self.addEventListener) {
	self.addEventListener('message', handleMessage)
}