import {describe, it, expect} from 'vitest'
import AppContext from '$lib/forms/AppContext'
import constants from '$lib/types/constants'
const {DEFAULT_PREFERENCES} = constants

describe(`AppContext - a class that updates an app's ViewingPreferences based on FormData`, () => {
	describe('constructor', () => {
		it('should initialize with no arguments', () => {
			const appContext = new AppContext()
			expect(appContext.state).toEqual(DEFAULT_PREFERENCES)
			expect(appContext.state.consent).toEqual({
				analytics: false,
				functional: true,
				legitimateInterest: true,
			})
		})

		it('should initialize with default preferences', () => {
			const appContext = new AppContext(DEFAULT_PREFERENCES)
			expect(appContext.state).toEqual(DEFAULT_PREFERENCES)

			expect(appContext.state.consent).toEqual({
				analytics: false,
				functional: true,
				legitimateInterest: true,
			})
		})

		it('should initialize without consent preferences', () => {
			const preferences = {...DEFAULT_PREFERENCES}
			delete preferences.consent.analytics
			delete preferences.consent.functional
			delete preferences.consent.legitimateInterest

			const appContext = new AppContext(preferences)
			expect(appContext.state).toEqual(preferences)
			expect(appContext.state.consent).toEqual({
				functional: true,
				legitimateInterest: true,
			})
		})
	})

	describe('update', () => {
		it('should update brightness', () => {
			const appContext = new AppContext(DEFAULT_PREFERENCES)
			const formData = new FormData()

			expect(appContext.state.brightness).toEqual(
				DEFAULT_PREFERENCES.brightness,
			)

			formData.append('brightness', 'night')
			appContext.update(formData)

			expect(appContext.state.brightness).toEqual('night')
		})

		it('should switch brightness on update if it equals current value (nojs toggle)', () => {
			const appContext = new AppContext(DEFAULT_PREFERENCES)
			const formData = new FormData()

			expect(appContext.state.brightness).toEqual(
				DEFAULT_PREFERENCES.brightness,
			)

			// First update sets the brightness
			formData.append('brightness', 'day')
			appContext.update(formData)

			expect(appContext.state.brightness).toEqual('day')
			// TODO: try to make this more coherent
			// Second update switches the brightness
			formData.append('brightness', 'day')
			appContext.update(formData)

			expect(appContext.state.brightness).toEqual('night')
		})

		it('should update contrast', () => {
			const appContext = new AppContext(DEFAULT_PREFERENCES)
			const formData = new FormData()

			expect(appContext.state.contrast).toEqual(DEFAULT_PREFERENCES.contrast)

			formData.append('contrast', 'blend')
			appContext.update(formData)

			expect(appContext.state.contrast).toEqual('blend')
		})

		it('should switch contrast on update if it equals current value (nojs toggle)', () => {
			const appContext = new AppContext(DEFAULT_PREFERENCES)
			const formData = new FormData()

			expect(appContext.state.contrast).toEqual(DEFAULT_PREFERENCES.contrast)

			// First update sets the contrast
			formData.append('contrast', 'contrast')
			appContext.update(formData)

			expect(appContext.state.contrast).toEqual('contrast')
			// TODO: try to make this more coherent
			// Second update switches the contrast
			formData.append('contrast', 'contrast')
			appContext.update(formData)

			expect(appContext.state.contrast).toEqual('blend')
		})

		it('should return default consent if no consent has been submitted', () => {
			const appContext = new AppContext(DEFAULT_PREFERENCES)
			const formData = new FormData()

			// Set legitimateInterest to true
			formData.append('legitimateInterest', 'on')
			appContext.update(formData)

			expect(appContext.state.consent).toEqual({
				functional: true,
				legitimateInterest: true,
			})
		})

		it('should update consent if consent has been submitted', () => {
			const appContext = new AppContext()
			const formData = new FormData()

			// Set legitimateInterest to false
			formData.append('consent-submit', 'true')
			formData.append('legitimateInterest', 'off')
			appContext.update(formData)

			expect(appContext.state.consent).toEqual({
				functional: true,
				legitimateInterest: false,
			})
		})
	})
})
