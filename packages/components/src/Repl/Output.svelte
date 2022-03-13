<script>
	export let compiled

	let iframe

	function update(code) {
		iframe.contentWindow.postMessage(code, '*')
	}

	$: iframe && compiled && update(compiled)

	const srcdoc = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REPL</title>
	<script type="module">
	let c
	function update(source) {
		const blob = new Blob([source], { type: 'text/javascript' })
		const url = URL.createObjectURL(blob)
		import(url).then(({ default: App }) => {
			if (c) {
				c.$destroy()
			}
			document.body.innerHTML = ''
			c = new App({ target: document.body })
		})
	}
	window.addEventListener(
		'message',
		(event) => {
			update(event.data)
		},
		false
	)
<\/script>

</head>
<body></body>
</html>
`
</script>

<section><iframe title="Rendered REPL" frameborder="0" bind:this={iframe} {srcdoc} /></section>
