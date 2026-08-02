// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Ensures that the `$service-worker` import has proper type definitions
/// <reference types="@sveltejs/kit" />

// Only necessary if you have an import from `$env/static/public`
/// <reference types="../../.svelte-kit/ambient.d.ts" />

import {build, files, version} from '$service-worker'

// This gives `self` the correct types
const self = globalThis.self as unknown as ServiceWorkerGlobalScope

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`
const SHELL_URL = '/'
const CV_URL = '/cv'
const EDIT_URL = `${CV_URL}/edit`
const BUILD_URL = `${CV_URL}/build`
const PREVIEW_URL = `${CV_URL}/preview`
const PRINT_URL = `${CV_URL}/print`

const CTA = [EDIT_URL, BUILD_URL, PREVIEW_URL, PRINT_URL]

const ASSETS = [
	SHELL_URL,
	CV_URL,
	...build, // the app itself
	...files, // everything in `static`
]

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE)
		await cache.addAll(ASSETS)
		await cache.addAll(CTA)
	}

	event.waitUntil(addFilesToCache())
})

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key)
		}
	}

	event.waitUntil(deleteOldCaches())
})

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') {
		return
	}

	async function respond() {
		const url = new URL(event.request.url)
		const cache = await caches.open(CACHE)

		/**
		 * Case 1: shell files (`build`/`files` from sveltekit)
		 * - can always be served from the cache
		 */
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname)

			if (response) {
				return response
			}
		}

		/**
		 * Case 2: Navigation
		 * - our routes are param-driven, so cache/match by PATHNAME only
		 * - the query string is handled client-side via OPFS
		 */
		if (event.request.mode === 'navigate') {
			try {
				const withSearch = await cache.match(url.pathname)

				if (withSearch) {
					return withSearch
				}

				// offline / dev server down:
				// - find the cached page for this pathname
				// - ignore whatever query string was requested
				const withoutSearch = await cache.match(url.pathname, {
					ignoreSearch: true,
				})

				if (withoutSearch) {
					return withoutSearch
				}
			} catch (error) {
				throw new Error('Fetch failed', {cause: error})
			}
		}

		/**
		 * Case 3: Network
		 * - for everything else, try the network first
		 * - fall back to the cache if we're offline
		 */
		try {
			const response = await fetch(event.request)

			if (response.status === 200) {
				cache.put(event.request, response.clone())
			}

			return response
		} catch (error) {
			const response = await cache.match(event.request)

			if (response) {
				return response
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request

			throw new Error('Fetch failed', {cause: error})
		}
	}

	event.respondWith(respond())
})

// async function detectSWUpdate() {
// 	const registration = await navigator.serviceWorker.ready

// 	registration.addEventListener('updatefound', (event) => {
// 		const newSW = registration.installing

// 		if (newSW) {
// 			newSW.addEventListener('statechange', (event) => {
// 				if (newSW.state == 'installed') {
// 					// New service worker is installed, but waiting activation
// 				}
// 			})
// 		}
// 	})
// }
