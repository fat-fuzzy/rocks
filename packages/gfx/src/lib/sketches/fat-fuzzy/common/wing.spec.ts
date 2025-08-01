import {describe, it, expect, beforeEach} from 'vitest'
import Wing from './wing'

describe('Wing', () => {
	let wing
	const wingState = {
		position: [0, 0],
		direction: 1,
		step: 0,
		layers: 3,
		steps: 10,
		pause: 5,
		bones: {
			magnitude: [10, 20, 30],
			beginning: [0, 0, 0],
			middle: [45, 45, 45],
			end: [90, 90, 90],
		},
		feathers: {
			sections: [
				{featherCount: 5, beginning: 0, middle: 45, end: 90},
				{featherCount: 5, beginning: 0, middle: 45, end: 90},
				{featherCount: 5, beginning: 0, middle: 45, end: 90},
			],
		},
		colors: {
			mute: (angle, color, time) => [angle, color, time],
		},
		drawFeathers: true,
		canvasWidth: 800,
		canvasHeight: 600,
	}

	beforeEach(() => {
		wing = new Wing(wingState)
	})

	it('should initialize with correct properties', () => {
		expect(wing.position).toEqual([0, 0])
		expect(wing.direction).toBe(1)
		expect(wing.currentStep).toBe(0)
		expect(wing.layers).toBe(3)
		expect(wing.steps).toBe(10)
		expect(wing.pause).toBe(5)
		expect(wing.width).toBe(800)
		expect(wing.height).toBe(600)
	})

	it('should scale magnitudes to canvas size', () => {
		const magnitudes = [10, 20, 30]
		const scaledMagnitudes = wing.scaleToCanvasSize(magnitudes)
		expect(scaledMagnitudes).toEqual([72, 144, 216])
	})

	it('should get bone vertices', () => {
		const boneVertices = wing.getBoneVertices()
		expect(boneVertices).toBeInstanceOf(Array)
		expect(boneVertices.length).toBeGreaterThan(0)
	})

	it('should get geometry coordinates', () => {
		const geometryCoords = wing.getGeometryCoords()
		expect(geometryCoords).toHaveProperty('color')
		expect(geometryCoords).toHaveProperty('translation')
		expect(geometryCoords).toHaveProperty('rotation')
		expect(geometryCoords).toHaveProperty('scale')
		expect(geometryCoords).toHaveProperty('width')
		expect(geometryCoords).toHaveProperty('height')
		expect(geometryCoords).toHaveProperty('geometry')
		expect(geometryCoords).toHaveProperty('background')
		expect(geometryCoords).toHaveProperty('clear')
	})

	it('should update wing state', () => {
		const initialTime = wing.currentTime
		wing.updateWingState()
		expect(wing.currentTime).not.toBe(initialTime)
	})
})
