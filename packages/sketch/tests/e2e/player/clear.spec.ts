import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let events = []
let sketchState
let canvasState
let playerState
let controlsState
let states = []
/**
 * Test the Player's Clear button works as expected for each sketch.
 */
sketches.map((sketch) => {
	test(`"${sketch.title}" sketch: Clear button works as expected`, async ({
		page,
	}) => {
		await page.goto(`/${sketch.slug}`)
		const hasControls =
			sketch.controls?.length > 1 ||
			(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')

		previousEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-player`)
			.getByTestId(`previous-event`)

		currentEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-player`)
			.getByTestId(`current-event`)

		sketchState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-sketch`)

		canvasState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-canvas`)

		playerState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-player`)

		controlsState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-controls`)

		states = await Promise.all([sketchState, canvasState, playerState])
		await expect(states[0]).toHaveText('active')
		await expect(states[1]).toHaveText('idle')
		await expect(states[2]).toHaveText('idle')
		if (hasControls) {
			await expect(controlsState).toHaveText('hidden')
		}

		// Start the canvas animation
		await page.getByRole('button', {name: '✨ Play'}).click()

		// Expects the Clear to be enabled
		await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()

		if (hasControls) {
			await expect(controlsState).toHaveText('pristine')
		}

		// Clear the canvas
		await page.getByRole('button', {name: '🐳 Clear'}).click()

		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('play')
		await expect(events[1]).toHaveText('clear')

		states = await Promise.all([sketchState, canvasState, playerState])
		await expect(states[0]).toHaveText('active')
		await expect(states[1]).toHaveText('playing')
		await expect(states[2]).toHaveText('playing')
		if (hasControls) {
			await expect(controlsState).toHaveText('pristine')
		}

		// Pause the animation
		await page.getByRole('button', {name: '🪷 Pause'}).click()

		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('clear')
		await expect(events[1]).toHaveText('pause')

		states = await Promise.all([sketchState, canvasState, playerState])
		await expect(states[0]).toHaveText('active')
		await expect(states[1]).toHaveText('paused')
		await expect(states[2]).toHaveText('paused')
		if (hasControls) {
			await expect(controlsState).toHaveText('pristine')
		}

		// Clear the canvas
		await page.getByRole('button', {name: 'clear'}).click()
		events = await Promise.all([previousEvent, currentEvent])
		await expect(events[0]).toHaveText('pause')
		await expect(events[1]).toHaveText('clear')

		states = await Promise.all([sketchState, canvasState, playerState])
		await expect(states[0]).toHaveText('active')
		await expect(states[1]).toHaveText('paused')
		await expect(states[2]).toHaveText('paused')
		if (hasControls) {
			await expect(controlsState).toHaveText('pristine')
		}

		// Stop, Play / Pause and Clear Actions should be enabled
		await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
		await expect(page.getByRole('button', {name: 'stop'})).toBeEnabled()
		await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()
	})
})
