import {expect, test} from '@playwright/test'
import gfx from '@fat-fuzzy/gfx'

const sketches = gfx.gl.sketches.learning
	.filter((sketch) => sketch.meta.controls.includes('texture'))
	.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let controlsState
let controlsActions

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
	const channels = sketch.filters?.channels
	const blur = sketch.filters?.blur
	const convolutions = sketch.filters?.convolutions

	test(`"${sketch.title}": tex controls menu works as expected`, async ({
		page,
	}) => {
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

		await expect(previousEvent).toHaveText('loadOk')
		await expect(currentEvent).toHaveText('loadOk')
		await expect(controlsState).toHaveText('hidden')
		await expect(controlsActions).toBeEmpty()

		// Start the canvas animation
		await page.getByRole('button', {name: '✨ Play'}).click()

		// Expects Controls to be enabled
		await expect(previousEvent).toHaveText('loadOk')
		await expect(currentEvent).toHaveText('play')
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
			await expect(previousEvent).toHaveText('play')
			await expect(currentEvent).toHaveText('update')
			if (blur) {
				await expect(
					page.getByRole('button', {name: 'blur 3'}),
				).toHaveAttribute('aria-pressed', 'false')
				await page.getByRole('button', {name: 'blur 3'}).click()
				await expect(
					page.getByRole('button', {name: 'blur 3'}),
				).toHaveAttribute('aria-pressed', 'true')
				await expect(previousEvent).toHaveText('update')
				await expect(currentEvent).toHaveText('update')
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

			await expect(previousEvent).toHaveText('play')
			await expect(currentEvent).toHaveText('update')
			if (blur) {
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toHaveAttribute('aria-pressed', 'false')
				await page.getByRole('button', {name: 'gaussianBlur'}).click()
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toHaveAttribute('aria-pressed', 'true')
				await expect(previousEvent).toHaveText('update')
				await expect(currentEvent).toHaveText('update')
			}
		}
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests

		// Pause the canvas animation
		await page.getByRole('button', {name: '🪷 Pause'}).click()
		await expect(previousEvent).toHaveText('update')
		await expect(currentEvent).toHaveText('pause')
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
		await expect(previousEvent).toHaveText('pause')
		await expect(currentEvent).toHaveText('play')
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
		await expect(previousEvent).toHaveText('play')
		await expect(currentEvent).toHaveText('clear')
		await expect(controlsState).toHaveText('pristine')
		await expect(controlsActions).toHaveText('update')
		// await expect(page).toHaveScreenshot() TODO: fix screenshot tests

		// Menu should be pristine after Clear
		if (channels) {
			await expect(page.getByRole('button', {name: 'brga'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'brga'})).toHaveAttribute(
				'aria-pressed',
				'false',
			)
			await page
				.getByRole('button', {name: 'brga'})
				.click()
				.then(async () => {
					await expect(
						page.getByRole('button', {name: 'brga'}),
					).toHaveAttribute('aria-pressed', 'true')
				})

			await expect(page.getByRole('button', {name: 'rgba'})).toBeVisible()
			if (blur) {
				await expect(page.getByRole('button', {name: 'blur 3'})).toBeEnabled()
				await expect(
					page.getByRole('button', {name: 'blur 3'}),
				).toHaveAttribute('aria-pressed', 'false')
				await page.getByRole('button', {name: 'blur 3'}).click()
				await expect(
					page.getByRole('button', {name: 'blur 3'}),
				).toHaveAttribute('aria-pressed', 'true')
				await expect(page.getByRole('button', {name: 'blur 1'})).toBeVisible()
			}
		}
		if (convolutions) {
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toBeEnabled()
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toHaveAttribute('aria-pressed', 'false')
			await page.getByRole('button', {name: 'edgeDetect2'}).click()
			await expect(
				page.getByRole('button', {name: 'edgeDetect2'}),
			).toHaveAttribute('aria-pressed', 'true')
			await expect(page.getByRole('button', {name: 'normal'})).toBeVisible()
			if (blur) {
				await expect(page.getByRole('button', {name: 'blur 3'})).toBeEnabled()
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toHaveAttribute('aria-pressed', 'false')
				await page.getByRole('button', {name: 'gaussianBlur'}).click()
				await expect(
					page.getByRole('button', {name: 'gaussianBlur'}),
				).toHaveAttribute('aria-pressed', 'true')
				await expect(page.getByRole('button', {name: 'normal'})).toBeVisible()
			}
		}
	})
})
