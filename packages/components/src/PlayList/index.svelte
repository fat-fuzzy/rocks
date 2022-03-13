<script>
	import { session, page } from '$app/stores'
	// import * as api from '$lib/api.js'
	import * as data from '$lib/data.js'
	import PlayPreview from './PlayPreview.svelte'
	import Pagination from './Pagination.svelte'

	export let tab,
		username = false
	export let favorites = false
	export let tag
	export let p

	let query
	let scenes
	let scenesCount

	$: {
		const endpoint = '/play/'
		const page_size = 10

		let params = `limit=${page_size}&offset=${(p - 1) * page_size}`
		if (tab === 'tag') params += `&tag=${tag}`
		if (tab === 'profile')
			params += `&${favorites ? 'favorited' : 'author'}=${encodeURIComponent(username)}`

		query = `${endpoint}?${params}`
	}

	$: query && getData()

	async function getData() {
		scenes = null
		;({ scenes, scenesCount } = await Promise.resolve({
			scenes: data.animations,
			sceneCount: data.animations.length
		}))
		// TODO do we need some error handling here?
		// ;({ scenes, scenesCount } = await api.get(query, $session.user && $session.user.token))
	}
</script>

{#if scenes}
	{#if scenes.length === 0}
		<div class="scene-preview">No scenes are here... yet.</div>
	{:else}
		<div>
			{#each scenes as scene (scene.slug)}
				<PlayPreview {scene} user={$session.user} />
			{/each}

			<Pagination {scenesCount} page={parseInt($page.params.user, 10)} />
		</div>
	{/if}
{:else}
	<div class="scene-preview">Loading...</div>
{/if}
