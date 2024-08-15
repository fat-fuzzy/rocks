const express = require('express')
const Ajv = require('ajv')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

const schema = {
	type: 'object',
	properties: {
		password: {
			type: 'string',
			minLength: 12,
			pattern: '[$\\-+!?*&%~_@#]{1}',
			pattern: '[0-9]{1}',
		},
	},
	required: ['password'],
}

const ajv = new Ajv()
const validate = ajv.compile(schema)

app.post('/register', async (req, res) => {
	const valid = validate(req.body)

	if (!valid) {
		return res.status(400).json({errors: validate.errors})
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 10)
	// Save hashedPassword to the database

	res.status(200).send('User registered successfully')
})

app.listen(3000, () => {
	console.log('Server running on port 3000')
})
