import {describe, it, expect} from 'vitest'
import UiReveal from '$lib/forms/UiReveal'
import constants from '$lib/types/constants'
const {DEFAULT_REVEAL_STATE} = constants

const revealComponents = [
	'Reveal',
	'RevealMenu',
	'RevealNav',
	'Header-nav',
	'Header-settings',
]

const revealMenus = ['tokens', 'blocks', 'layouts', 'recipes', 'raw']

describe(`UiReveal - a class that toggles an element's visibility based on FormData`, () => {
	describe('constructor', () => {
		it('should initialize with an element id', () => {
			const uiReveal = new UiReveal('Reveal')
			expect(uiReveal.toString()).toEqual(JSON.stringify(DEFAULT_REVEAL_STATE))
		})

		it('should initialize with an element id and a state object', () => {
			const uiReveal = new UiReveal('Reveal', {reveal: 'expanded'})
			expect(uiReveal.toString()).toEqual(JSON.stringify({reveal: 'expanded'}))
		})
	})

	describe('reveal - no update', () => {
		revealComponents.forEach((component) => {
			it(`should do nothing if the ${component} component does not contain a reveal button`, () => {
				const uiReveal = new UiReveal(component)
				const formData = new FormData()
				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: false,
				})
			})
		})

		revealMenus.forEach((menu) => {
			it(`should do nothing if the ${menu} menu does not contain a reveal button`, () => {
				const uiReveal = new UiReveal(menu)
				const formData = new FormData()
				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: false,
				})
			})
		})
	})

	describe('reveal - without JS', () => {
		revealComponents.forEach((component) => {
			it(`should expand ${component}`, () => {
				const uiReveal = new UiReveal(component, {reveal: 'collapsed'})
				const formData = new FormData()
				formData.append(`button-reveal-${component}`, 'collapsed')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'expanded'},
				})
			})
		})

		revealMenus.forEach((menu) => {
			it(`should expand ${menu}`, () => {
				const uiReveal = new UiReveal(menu, {reveal: 'collapsed'})
				const formData = new FormData()
				formData.append(`button-reveal-${menu}`, 'collapsed')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'expanded'},
				})
			})
		})

		revealComponents.forEach((component) => {
			it(`should collapse ${component}`, () => {
				const uiReveal = new UiReveal(component, {reveal: 'expanded'})
				const formData = new FormData()
				formData.append(`button-reveal-${component}`, 'expanded')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'collapsed'},
				})
			})
		})

		revealMenus.forEach((menu) => {
			it(`should collapse ${menu}`, () => {
				const uiReveal = new UiReveal(menu, {reveal: 'expanded'})
				const formData = new FormData()
				formData.append(`button-reveal-${menu}`, 'expanded')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'collapsed'},
				})
			})
		})
	})

	describe('reveal - with JS', () => {
		revealComponents.forEach((component) => {
			it(`should expand ${component}`, () => {
				const uiReveal = new UiReveal(component, {reveal: 'collapsed'})
				const formData = new FormData()
				formData.append(`button-reveal-${component}`, 'expanded')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'expanded'},
				})
			})
		})

		revealMenus.forEach((menu) => {
			it(`should expand ${menu}`, () => {
				const uiReveal = new UiReveal(menu, {reveal: 'collapsed'})
				const formData = new FormData()
				formData.append(`button-reveal-${menu}`, 'expanded')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'expanded'},
				})
			})
		})

		revealComponents.forEach((component) => {
			it(`should collapse ${component}`, () => {
				const uiReveal = new UiReveal(component, {reveal: 'expanded'})
				const formData = new FormData()
				formData.append(`button-reveal-${component}`, 'collapsed')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'collapsed'},
				})
			})
		})

		revealMenus.forEach((menu) => {
			it(`should collapse ${menu}`, () => {
				const uiReveal = new UiReveal(menu, {reveal: 'expanded'})
				const formData = new FormData()
				formData.append(`button-reveal-${menu}`, 'collapsed')

				const result = uiReveal.reveal(formData)

				expect(result).toEqual({
					success: true,
					state: {reveal: 'collapsed'},
				})
			})
		})
	})
})
