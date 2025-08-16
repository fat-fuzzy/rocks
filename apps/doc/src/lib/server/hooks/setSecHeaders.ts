/**
 * Set security headers for the application.
 * Verify:
 * - https://securityheaders.com
 * CSP Headers and Resources are in `svelte.config.js`.
 */
import type {Handle} from '@sveltejs/kit'

const PERMISSIONS_POLICY_DIRECTIVES = [
	'accelerometer=()',
	'ambient-light-sensor=()',
	'attribute-reporting=()',
	'autoplay=()',
	'bluetooth=()',
	'browsing-topics=()',
	'camera=()',
	'captured-surface-control=()',
	'compute-pressure=()',
	// 'cross-origin-isolated=()',
	// 'deferred-fetch=(self)',
	// 'deferred-fetch-minimal=(self)',
	// 'display-capture=(self)',
	'encrypted-media=()',
	'fullscreen=()',
	'geolocation=()',
	'gyroscope=()',
	'hid=()',
	// 'identity-credentials-get=()',
	// 'idle-detection=()',
	'local-fonts=(self)',
	'magnetometer=()',
	'microphone=()',
	'midi=()',
	// 'otp-credentials=()',
	'payment=()',
	'picture-in-picture=()',
	// 'publickey-credentials-create=()',
	// 'publickey-credentials-get=()',
	'screen-wake-lock=()',
	'serial=()',
	// 'storage-access=(self)',
	// 'summarizer=()',
	'magnetometer=()',
	'usb=()',
	// 'web-share=(self)',
	// 'window-management=()',
	'xr-spatial-tracking=()',
]

export const setPermissionsPolicy =
	(): Handle =>
	async ({event, resolve}) => {
		event.setHeaders({
			'Permissions-Policy': PERMISSIONS_POLICY_DIRECTIVES.join('; '),
		})
		return resolve(event)
	}

export const setSecHeaders =
	(): Handle =>
	async ({event, resolve}) => {
		event.setHeaders({
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
		})
		return resolve(event)
	}
