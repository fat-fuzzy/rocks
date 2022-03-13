<script>
	import Input from './Input.svelte'
	import Output from './Output.svelte'
	import Worker from './repl.worker.js?worker'

	let components = [
		{
			id: 0,
			name: 'Input',
			type: 'svelte',
			source: `<script type="module">
        import Input from './Input.svelte'
        <\/script>`
		},
		{
			id: 1,
			name: 'Output',
			type: 'svelte',
			source: `<script type="module">
        import Output from './Output.svelte'
        <\/script>`
		}
	]

	let current = 0
	let compiled

	const worker = new Worker()
	worker.addEventListener('message', (event) => {
		compiled = event.data
	})

	function compile(_components) {
		worker.postMessage(_components)
	}

	$: compile(components)
</script>

<Input bind:components bind:current />
<Output {compiled} />
