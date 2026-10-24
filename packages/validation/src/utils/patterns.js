export const BOOLEAN_INPUT_PATTERN = 'on|true|(^[a-zA-Z]|-|[0-9])+$'
export const DATE_STRING_PATTERN = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
export const LANGUAGE_PATTERN = '^[a-z]{2}$'
export const PASSWORD_DIGITS = '([0-9]{1}[a-z|A-Z|0-9]{0,100}){3}'
export const PASSWORD_SPECIAL_CHARS =
	'([$\\-+!?*&%~_@#]{1}[a-z|A-Z|0-9]{0,100}){3}'
export const PATH_PATTERN = '^/?([A-Za-z_][A-Za-z0-9_-]{0,255}\\/?){1,3}$'
export const PHONE = '[\\+0-9]{10,14}'
export const QUERY_STRING_PATTERN =
	'^\\?(?:[A-Za-z_][A-Za-z0-9_-]*=[A-Za-z0-9_-]+)(?:&(?:[A-Za-z_][A-Za-z0-9_-]*=[A-Za-z0-9_-]+))*$'
export const ROUTE_PATTERN = '^/([A-Za-z_][A-Za-z0-9_-]{0,255}\\/?)*$'
export const SLUG_PATTERN = '^[A-Za-z_]([A-Za-z0-9_-])*$'
export const TITLE_PATTERN = '^$|^[A-Za-z_](\\s?[A-Za-z0-9_-])*$'
export const USERNAME = '^[A-Za-z_]\\.?([A-Za-z0-9_-])*$'
export const UUID_PATTERN =
	'^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$'
export const VERSION_PATTERN = '^[0-9]+\\.[0-9]+$' // semver-lite: "1.0", "2.3", etc.
