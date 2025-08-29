# DOM Utils

Notes taken while viewing: [DOM ready events considered harmful | HTTP 203](https://www.youtube.com/watch?v=_iq1fPjeqMQ)

- **PROBLEM:** An element (and a component) needs to react to changes over time
- **SOLUTION(S):** Use the DOM to listen for events and update the component

## IDEA 1 : Use `defer`

If there is a script with `defer` attribute, it will load scripts after the document has been parsed

```html
<head>
	<script defer src="deps.js"></script>
	<script defer src="bundle.js"></script>
	<script src="app.js" type="module"></script>
	<!-- ESM modules are deferred by default -->
</head>
```

BUT: if the document takes a long time finish parsing (including any blocking API calls etc), this might delay animations that are loaded using `defer`

## IDEA 2: Use `async`

If there is a script with `async` attribute, it will be executed as soon as it is downloaded

```html
<head>
	<!-- Async modules will run as soon as they are loaded -->
	<script async type="module" src="animation.js"></script>
</head>
```

BUT: if all scripts use `async`, browsers will push them to the back of the queue and they will be executed in the order they are downloaded

## IDEA 3: Use `preload`

If there is a script with `async` attribute, it will be executed as soon as it is downloaded

```html
<head>
  <!-- Async modules will run as soon as they are loaded -->
  <script async type="module" src="animation.js"></script>
  <link rel="preload" href="animation.js" as="script" crossorigin></link>
</head>
```

## IDEA 4: Use custom elements hack

You can hook to a `connected` event from a custom element inside a component: this will indicate that the content before it has already been rendered.

```html
<enhance-parent>Hello</enhance-parent>
```

```js
customElements.define(
	'enhance-parent',
	class extends HTMLElement {
		connectedCallback() {
			console.log('connected', this.innerHTML)
		}
		disconnectCallback() {
			console.log('disconnected', this.innerHTML)
		}
	},
)
```

```html
<div class="gallery">
	<!-- ... content -->

	<!--
         👇 This will trigger a 'connected' event:
         by the time this loads, I can be sure that all the content in "gallery" will have loaded
     -->
	<enhance-parent></enhance-parent>
</div>
```

## IDEA 5: Use `MutationObserver`

```js
new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {

    // I can observe the changes in the DOM here
    console.log(mutation.addedNodes.length)
  })
}).observe(document.body, {
  childList: true,
  subtree: true,
}
```

BUT:

- The following code will log 1 event, because the MutationObserver will only observe the changes `document.body` and not the `div` that is added

```js
const div = document.createElement('div')
div.append(document.createElement('p'))
document.body.append(div)
```

- Whereas The following code will log 2 events, because the `div` is added to the `document.body`, which means that the MutationObserver can observe its changes

```js
const div = document.createElement('div')
document.body.append(div)
div.append(document.createElement('p'))
```

## Resources

- [MDN - Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [MDN- MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
