import {expect, test} from '@playwright/test'

// TODO: Controls state update - should be:
// - `hidden` on load until `play`
// - `pristine` on `play` until user interaction
// - `pristine` (or `cleared` ?) on `clear` until user interaction
// - `pristine` on `stop` until user interaction
// - `updated` on user interaction until` `clear`
// - `paused` on `pause`, then:
//   - `updated` or `pristine` (the state previous to `paused`) on `play`
//   - `pristine` on `clear`, then as above
// - `hidden` on `stop`, then as above
test('Geometry 2D Sketch loads OK', async ({page}) => {
	// TODO: Load a geometry-2d Sketch and check that it loads OK
})
