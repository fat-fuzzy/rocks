import {describe, test, expect} from 'vitest'

import styles from '$lib/utils/styles'
import {
	PROPS_BLOCK,
	PROPS_CONTAINER,
	PROPS_LAYOUT,
	PROPS_FEEDBACK,
} from '$tests/fixtures/props'

describe('style.ts - a module to build class names from props', () => {
	describe('getContainerStyles', () => {
		test('generates container styles', () => {
			PROPS_CONTAINER.forEach((fixture) => {
				const received = styles.getContainerStyles(fixture.props)
				expect(received).toBe(fixture.expected)
			})
		})

		test('returns empty string when no container props provided', () => {
			expect(styles.getContainerStyles({})).toBe('')
		})
	})

	describe('getLayoutStyles', () => {
		test('generates layout styles', () => {
			PROPS_LAYOUT.forEach((fixture) => {
				const received = styles.getLayoutStyles(fixture.props)
				expect(received).toBe(fixture.expected)
			})
		})

		test('returns empty string when no layout props provided', () => {
			expect(styles.getLayoutStyles({})).toBe('')
		})

		test('justify center if shape is provided without explicit justify prop', () => {
			const result = styles.getLayoutStyles({shape: 'round'})
			expect(result).toContain('justify:center')
		})
	})

	describe('getBlockStyles', () => {
		test('generates block styles', () => {
			PROPS_BLOCK.forEach((fixture) => {
				const received = styles.getBlockStyles(fixture.props)
				expect(received).toBe(fixture.expected)
			})
		})

		test('returns empty string when no block props provided', () => {
			expect(styles.getBlockStyles({})).toBe('')
		})

		test('defaults assetType to emoji when not provided', () => {
			const result = styles.getBlockStyles({asset: 'profile'})
			expect(result).toContain('emoji:profile')
		})
	})

	describe('getFeedbackStyles', () => {
		test('generates feedback styles', () => {
			PROPS_FEEDBACK.forEach((fixture) => {
				const received = styles.getFeedbackStyles(
					fixture.props.props,
					fixture.props.status,
					fixture.props.context,
				)
				expect(received).toBe(fixture.expected)
			})
		})

		test('returns empty string when no container props provided', () => {
			expect(styles.getContainerStyles({})).toBe('')
		})
	})

	describe('getStyles', () => {
		test('combines all style types', () => {
			const result = styles.getStyles({
				container: 'ravioli',
				layout: 'grid',
				color: 'primary',
				size: 'md',
			})
			expect(result).toBeTruthy()
			expect(result).not.toMatch(/undefined/)

			const classes = result.split(' ')
			expect(classes).toContain('ravioli:md')
			expect(classes).toContain('l:grid:md')
			expect(classes).toContain('color:primary')
			expect(classes.length).toBeGreaterThan(3)
		})

		test('uses size for font when font not provided', () => {
			const result = styles.getBlockStyles({size: 'lg'})
			expect(result).toContain('font:lg')
		})
	})
})
