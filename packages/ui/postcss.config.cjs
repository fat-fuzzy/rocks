const autoprefixer = require('autoprefixer')
const stylelint = require('stylelint')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const config = {
	plugins: [autoprefixer(), stylelint()],
}

module.exports = config
