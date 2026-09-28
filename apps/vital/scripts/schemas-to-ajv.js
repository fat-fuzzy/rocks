import {generatedAjvSchemas} from './schemas-from-registry.js'
import {schemas} from '../src/schemas/Vital.registry.js'

await generatedAjvSchemas(schemas)
