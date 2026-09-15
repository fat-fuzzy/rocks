import {generatedAjvSchemas} from './schemas-from-registry.js'
import {schemas} from '../src/schemas/Chlorophyll.registry.js'

await generatedAjvSchemas(schemas)
