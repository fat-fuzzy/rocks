import {describe, it, expect} from 'vitest'
import AppContext from '$lib/forms/AppContext'
import constants from '$lib/types/constants'
const {DEFAULT_COOKIES_PREFERENCES} = constants

describe(`AppContext - a class that updates an app's ViewingPreferences based on FormData`, () => {
	describe('constructor', () => {
		it('should initialize with no arguments', () => {
			const appContext = new AppContext()
			expect(appContext.state).toEqual(DEFAULT_COOKIES_PREFERENCES)
			expect(appContext.state.consent).toEqual({
				analytics: false,
				functional: true,
				legitimateInterest: true,
			})
		})

		it('should initialize with default preferences', () => {
			const appContext = new AppContext(DEFAULT_COOKIES_PREFERENCES)
			expect(appContext.state).toEqual(DEFAULT_COOKIES_PREFERENCES)

			expect(appContext.state.consent).toEqual({
				analytics: false,
				functional: true,
				legitimateInterest: true,
			})
		})

		it('should initialize without consent preferences', () => {
			const preferences = {...DEFAULT_COOKIES_PREFERENCES}
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
		it('should return default consent if no consent has been submitted', () => {
			const appContext = new AppContext(DEFAULT_COOKIES_PREFERENCES)
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
