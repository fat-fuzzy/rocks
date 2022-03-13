<script>
	import * as api from '$lib/api.js'

	export let scene
	export let user

	async function toggleFavorite() {
		// optimistic UI
		if (scene.favorited) {
			scene.favoritesCount -= 1
			scene.favorited = false
		} else {
			scene.favoritesCount += 1
			scene.favorited = true
		}

		;({ scene } = await (scene.favorited
			? api.post(`play/${scene.slug}/favorite`, null, user && user.token)
			: api.del(`play/${scene.slug}/favorite`, user && user.token)))
	}
</script>

<div class="scene-preview">
	<div class="scene-meta">
		<div class="info" />

		{#if user}
			<div class="pull-xs-right">
				<button
					class="btn btn-sm {scene.favorited ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={toggleFavorite}
				>
					<i class="ion-heart" />
					{scene.favoritesCount}
				</button>
			</div>
		{/if}
	</div>

	<a href="/play/{scene.slug}" rel="prefetch" class="preview-link">
		<h1>{scene.emoji} {scene.name}</h1>
		<ul class="tag-list">
			{#each scene.tagList as tag}
				<li class="tag-default tag-pill tag-outline">
					{tag}
				</li>
			{/each}
		</ul>
	</a>
</div>
