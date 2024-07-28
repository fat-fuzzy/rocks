/**
 * Utils to poke at the DOM
 *
 * see: `dom.md` for more details about dom events
 */

/**
 * This function will log the order of events that happen when the document is loaded
 */
function domEventLogger() {
	// 1. DOM EVENT -> Document's readyState becomes 'interactive'
	console.log('document.readyState', document.readyState)

	// 2. Wait for styles and subframes that are inserted by the parser and their media matches to finish loading

	// 3. Wait for and execute all 'defer' scripts in order

	// 4. DOM EVENT -> DOMContentLoaded event fires on the document

	// 5. Wait for anything else that triggered a request

	// 6. DOM EVENT -> document state becomes complete

	// 7. DOM EVENT -> 'load' event fires on the window

	// 8. DOM EVENT -> 'pageshow' event fires on the window

	document.addEventListener('readystatechange', function () {
		// Document's readyState becomes 'complete'
		console.log('readystatechange', document.readyState)
	})
}
