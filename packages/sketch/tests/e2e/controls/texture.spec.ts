import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches
	.filter((sketch) => sketch.meta.controls.includes('texture'))
	.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let controlsState
let controlsActions
let events = []

/**
 * Test thas the TextureControls menu works as expected for each sketch.
 * TODO: Controls state update - should be:
 *  - `hidden` on load until `play`
 *  - `pristine` on `play` until user interaction
 *  - `pristine` (or `cleared` ?) on `clear` until user interaction
 *  - `updated` on user interaction until `clear`
 *  - `disabled` on `pause`, then:
 *    - `updated` or `pristine` (the state previous to `paused`) on `play`
 *    - `pristine` on `clear`, then as above
 *  - `hidden` on `stop`, then as above
 */
sketches.map((sketch) => {
	test(`"${sketch.title}" sketch: Texture controls menu work as expected`, async ({
		page,
	}) => {
		const channels = sketch.filters?.channels
		const blur = sketch.filters?.blur
		const convolutions = sketch.filters?.convolutions

		await page.goto(`/${sketch.slug}`)

		previousEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-controls`)
			.getByTestId(`previous-event`)

		currentEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-controls`)
			.getByTestId(`current-event`)

		controlsState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-controls`)

		controlsActions = page
			.getByTestId('debug-table')
			.getByTestId(`debug-actions-controls`)

		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('load')
		await expect(events[1]).toHaveText('loadOk')
		await expect(controlsState).toHaveText('hidden')
		await expect(controlsActions).toBeEmpty()

		// Start the canvas animation
		await page.getByRole('button', {name: '✨ Play'}).click()

		// Expects Controls to be enabled
		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('loadOk')
		await expect(events[1]).toHaveText('play')
		await expect(controlsState).toHaveText('pristine')
		await expect(controlsActions).toHaveText('update')

		// Find the TextureControls menu and test it is enabled
		if (channels) {
			await expect(page.getByRole('button', {name: 'brga'})).toHaveAttribute(
				'aria-pressed',
				'false',
			)
			await page.getByRole('button', {name: 'brga'}).click()
			await expect(page.getByRole('button', {name: 'brga'})).toHaveAttribute(
				'aria-pressed',
				'true',
			)
			if (blur) {
				await expect(
					page.getByRole('button', {name: 'blur 3'}),
				).toHaveAttribute('aria-pressed', 'false')
				await page.getByRole('button', {name: 'blur 3'}).click()
				await expect(
					page.getByRole('button', {name: 'blur 3'}),
				).toHaveAttribute('aria-pressed', 'true')
			}
		}
		if (convolutions) {
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toHaveAttribute('aria-pressed', 'false')

			await page.getByRole('button', {name: 'edgeDetect2'}).click()
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toHaveAttribute('aria-pressed', 'true')

			if (blur) {
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toHaveAttribute('aria-pressed', 'false')
				await page.getByRole('button', {name: 'gaussianBlur'}).click()
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toHaveAttribute('aria-pressed', 'true')
			}
		}

		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('play')
		await expect(events[1]).toHaveText('update')
		await expect(controlsState).toHaveText('updated')
		await expect(controlsActions).toHaveText('update')
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests

		// Pause the canvas animation
		await page.getByRole('button', {name: '🪷 Pause'}).click()
		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('update')
		await expect(events[1]).toHaveText('pause')
		await expect(controlsState).toHaveText('updated')
		await expect(controlsActions).toHaveText('update') // TODO: fix this action: should be empty
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests
		if (channels) {
			await expect(page.getByRole('button', {name: 'brga'})).toBeDisabled()
			if (blur) {
				await expect(page.getByRole('button', {name: 'blur 3'})).toBeDisabled()
			}
		}
		if (convolutions) {
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toBeDisabled()
			if (blur) {
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toBeDisabled()
			}
		}
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests

		// Expects the Play button to resume the canvas animation
		await page.getByRole('button', {name: '✨ Play'}).click()
		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('pause')
		await expect(events[1]).toHaveText('play')
		await expect(controlsState).toHaveText('updated')
		await expect(controlsActions).toHaveText('update')
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests

		if (channels) {
			await expect(page.getByRole('button', {name: 'brga'})).toBeEnabled()
			if (blur) {
				await expect(page.getByRole('button', {name: 'blur 3'})).toBeEnabled()
			}
		}
		if (convolutions) {
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toBeEnabled()
			if (blur) {
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toBeEnabled()
			}
		}

		// Clear the canvas
		await page.getByRole('button', {name: '🐳 Clear'}).click()
		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('play')
		await expect(events[1]).toHaveText('clear')
		await expect(controlsState).toHaveText('pristine')
		await expect(controlsActions).toHaveText('update')
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests

		// Menu should be pristine TODO: fix
		// if (channels) {
		// 	await expect(page.getByRole('button', {name: 'brga'})).toBeEnabled()
		// 	await expect(page.getByRole('button', {name: 'brga'})).toHaveAttribute(
		// 		'aria-pressed',
		// 		'false',
		// 	)
		// 	if (blur) {
		// 		await expect(page.getByRole('button', {name: 'blur 3'})).toBeEnabled()
		// 		await expect(
		// 			page.getByRole('button', {name: 'blur 3'}),
		// 		).toHaveAttribute('aria-pressed', 'false')
		// 	}
		// }
		// if (convolutions) {
		// 	await expect(
		// 		page.getByRole('button', {name: 'edgeDetect2'}),
		// 	).toBeEnabled()
		// 	await expect(
		// 		page.getByRole('button', {name: 'edgeDetect2'}),
		// 	).toHaveAttribute('aria-pressed', 'false')
		// 	if (blur) {
		// 		await expect(page.getByRole('button', {name: 'blur 3'})).toBeEnabled()
		// 		await expect(
		// 			page.getByRole('button', {name: 'gaussianBlur'}),
		// 		).toHaveAttribute('aria-pressed', 'false')
		// 	}
		// }
	})
})
