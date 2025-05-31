const cssRules = {
	'rule-empty-line-before': null,
	'comment-empty-line-before': null,
	'value-no-vendor-prefix': null,
	'declaration-empty-line-before': null,
	'property-no-vendor-prefix': null,
	'at-rule-empty-line-before': null,
	'custom-property-empty-line-before': null,
	'media-feature-range-notation': 'prefix',
	'scss/operator-no-unspaced': null,
	'color-function-notation': null,
	'value-keyword-case': null,
	'hue-degree-notation': null,
	'selector-attribute-quotes': 'always',
}
const scssRules = {
	'selector-class-pattern': '([a-z](\\:)?)+((\\:)?[a-z])+',
	'custom-property-pattern': '([0-9]|[a-z](-)?[0-9]?(-)?)+',
	'scss/dollar-variable-pattern': '([a-z](-)?[0-9]?(-)?)+',
	'selector-attribute-quotes': 'never',
	'rule-empty-line-before': null,
	'scss/load-no-partial-leading-underscore': null,
	'function-name-case': null,
	'scss/operator-no-newline-after': null,
}
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
	rules: {...scssRules, ...cssRules},
}
