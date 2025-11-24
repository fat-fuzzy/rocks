import {describe, test, expect} from 'vitest'

import styles from '$lib/utils/styles'
import props from '../../fixtures/props'
const blockProps = props.PROPS_BLOCK
const containerProps = props.PROPS_CONTAINER
const layoutProps = props.PROPS_LAYOUT

describe('style.ts - a library that builds class names from style prop names', () => {
	describe('getContainerStyles', () => {
		test('generates container styles', () => {
			let actualValues = styles.getContainerStyles(containerProps)
			let expectedClasses = props.getContainerClasses(containerProps)
			expect(actualValues).toBe(expectedClasses)
		})

		test('returns empty string when no container props provided', () => {
			expect(styles.getContainerStyles({})).toBe('')
		})

		test('generates ravioli container without l: prefix', () => {
			expect(styles.getContainerStyles({container: 'ravioli'})).toContain(
				'ravioli',
			)
			expect(styles.getContainerStyles({container: 'ravioli'})).not.toContain(
				'l:ravioli',
			)
		})

		test('combines container with dimensions', () => {
			let result = styles.getContainerStyles({
				container: 'frame',
				dimensions: 'video',
				size: 'md',
			})
			expect(result).toBe('l:frame:video size:md')
		})

		test('uses size when dimensions not provided', () => {
			let result = styles.getContainerStyles({container: 'frame', size: 'md'})
			expect(result).toBe('l:frame:md')
		})

		test('includes layer class when provided', () => {
			let result = styles.getContainerStyles({container: 'stack', layer: '1'})
			expect(result).toContain('layer:1')
		})
	})

	describe('getLayoutStyles', () => {
		test('generates layout styles', () => {
			let actualValues = styles.getLayoutStyles(layoutProps)
			let expectedClasses = props.getLayoutClasses(layoutProps)
			expect(actualValues).toBe(expectedClasses)
		})

		test('returns empty string when no layout props provided', () => {
			expect(styles.getLayoutStyles({})).toBe('')
		})

		test('converts layout with pill shape to stack', () => {
			let result = styles.getLayoutStyles({layout: 'grid', shape: 'pill'})
			expect(result).toBe('l:grid shape:pill')
		})

		test('converts layout with non-pill shape to stack', () => {
			let result = styles.getLayoutStyles({layout: 'grid', shape: 'round'})
			expect(result).toBe('l:stack shape:round')
		})

		test('combines layout with size', () => {
			let result = styles.getLayoutStyles({layout: 'stack', size: 'lg'})
			expect(result).toBe('l:stack:lg')
		})

		/**
		 * TODO: throw warning when switcher used without threshold
		 */
		test('includes switcher class', () => {
			let result = styles.getLayoutStyles({layout: 'switcher', threshold: 'md'})
			expect(result).toContain('th:md')
		})
	})

	describe('getBlockStyles', () => {
		test('generates block styles', () => {
			let actualValues = styles.getBlockStyles(blockProps)
			let expectedClasses = props.getBlockClasses(blockProps)
			expect(actualValues).toBe(expectedClasses)
		})

		test('returns empty string when no block props provided', () => {
			expect(styles.getBlockStyles({})).toBe('')
		})

		test('uses color for background when background not provided', () => {
			let result = styles.getBlockStyles({color: 'primary'})
			expect(result).toContain('bg:primary')
		})

		test('prefers background over color for bg class', () => {
			let result = styles.getBlockStyles({
				color: 'primary',
				background: 'secondary',
			})
			expect(result).toContain('bg:secondary')
			expect(result).not.toContain('bg:primary')
		})

		test('uses size for font when font not provided', () => {
			let result = styles.getBlockStyles({size: 'lg'})
			expect(result).toContain('font:lg')
		})

		test('defaults assetType to emoji when not provided', () => {
			let result = styles.getBlockStyles({asset: 'profile'})
			expect(result).toContain('emoji:profile')
		})

		test('adds justify center when shape is provided without explicit justify', () => {
			let result = styles.getBlockStyles({shape: 'round'})
			expect(result).toContain('justify:center')
		})
	})

	describe('getStyles', () => {
		test('combines all style types', () => {
			let result = styles.getStyles({
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
			let result = styles.getStyles({size: 'md'})
			expect(result).not.toMatch(/^\s/)
			expect(result).not.toMatch(/\s$/)
			expect(result).not.toMatch(/\s{2,}/)
		})
	})
})
