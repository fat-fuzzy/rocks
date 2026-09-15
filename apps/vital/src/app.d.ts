// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	// See https://kit.svelte.dev/docs/types#app
	// for information about these interfaces
	// and what to do when importing types
	namespace App {
		// interface Error {}
		interface Locals {
			nav
			sidebar
			appContext
		}
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace
			}
			context: {
				// eslint-disable-next-line
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & {default: Cache}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
