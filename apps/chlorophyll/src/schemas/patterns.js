export const VERSION_PATTERN = '^[0-9]+\\.[0-9]+$' // semver-lite: "1.0", "2.3", etc.
export const SLUG_PATTERN = '^[A-Za-z_]([A-Za-z0-9_-])*$'
export const LANGUAGE_PATTERN = '^[a-z]{2}$'
export const TITLE_PATTERN = '^$|^[A-Za-z_](\\s?[A-Za-z0-9_-])*$'
export const PATH_PATTERN = '^([A-Za-z_][A-Za-z0-9_-]*\\/?){1,3}$'
export const DATE_STRING_PATTERN = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
