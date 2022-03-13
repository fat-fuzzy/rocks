<script>
	import PlayList from '../PlayList/index.svelte'

	export let tab = 'all'
	export let tag = null
	export let p
</script>

<div class="col-md-9">
	<div class="feed-toggle">
		<ul class="nav nav-pills outline-active">
			{#if tag}
				<li class="nav-item">
					<a
						href="."
						class="nav-link {tab === 'tag' ? 'active' : ''}"
						on:click={() => (tab = 'tag')}
					>
						<i class="ion-pound" />
						{tag}
					</a>
				</li>
			{/if}
		</ul>
	</div>

	<PlayList {p} {tab} {tag} />
</div>
