import {describe, test, expect} from 'vitest'

import styles from '$lib/utils/styles'
import {
	PROPS_BLOCK,
	PROPS_CONTAINER,
	PROPS_LAYOUT,
	getBlockClasses,
} from '$tests/fixtures/props'

describe('style.ts - a library that builds class names from style prop names', () => {
	describe('getContainerStyles', () => {
		test('generates container styles', () => {
			PROPS_CONTAINER.forEach((fixture) => {
				const actualValues = styles.getContainerStyles(fixture.props)
				expect(actualValues).toBe(fixture.expected)
			})
		})

		test('returns empty string when no container props provided', () => {
			expect(styles.getContainerStyles({})).toBe('')
		})
	})

	describe('getLayoutStyles', () => {
		test('generates layout styles', () => {
			PROPS_LAYOUT.forEach((fixture) => {
				const actualValues = styles.getLayoutStyles(fixture.props)
				expect(actualValues).toBe(fixture.expected)
			})
		})

		test('returns empty string when no layout props provided', () => {
			expect(styles.getLayoutStyles({})).toBe('')
		})

		test('converts layout with non-pill shape to stack', () => {
			const result = styles.getLayoutStyles({layout: 'grid', shape: 'round'})
			expect(result).toBe('l:stack shape:round')
		})

		/**
		 * TODO: throw warning when switcher used without threshold
		 */
		test('includes switcher class', () => {
			const result = styles.getLayoutStyles({
				layout: 'switcher',
				threshold: 'md',
			})
			expect(result).toContain('th:md')
		})
	})

	describe('getBlockStyles', () => {
		test('generates block styles', () => {
			const actualValues = styles.getBlockStyles(PROPS_BLOCK)
			const expectedClasses = getBlockClasses(PROPS_BLOCK)
			expect(actualValues).toBe(expectedClasses)
		})

		test('returns empty string when no block props provided', () => {
			expect(styles.getBlockStyles({})).toBe('')
		})

		test('uses color for background when background not provided', () => {
			const result = styles.getBlockStyles({color: 'primary'})
			expect(result).toContain('bg:primary')
		})

		test('prefers background over color for bg class', () => {
			const result = styles.getBlockStyles({
				color: 'primary',
				background: 'secondary',
			})
			expect(result).toContain('bg:secondary')
			expect(result).not.toContain('bg:primary')
		})

		test('uses size for font when font not provided', () => {
			const result = styles.getBlockStyles({size: 'lg'})
			expect(result).toContain('font:lg')
		})

		test('defaults assetType to emoji when not provided', () => {
			const result = styles.getBlockStyles({asset: 'profile'})
			expect(result).toContain('emoji:profile')
		})

		test('adds justify center when shape is provided without explicit justify', () => {
			const result = styles.getBlockStyles({shape: 'round'})
			expect(result).toContain('justify:center')
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
			expect(classes).toContain('size:md')
			expect(classes.length).toBeGreaterThan(3)
		})

		test('returns trimmed string with no extra spaces', () => {
			const result = styles.getStyles({size: 'md'})
			expect(result).not.toMatch(/^\s/)
			expect(result).not.toMatch(/\s$/)
			expect(result).not.toMatch(/\s{2,}/)
		})
	})
})
