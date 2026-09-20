import {schemas} from '@fat-fuzzy/validation'
import {defineSchema} from '../index.js'

/** @type {{[key: string]: import('json-schema-to-typescript').JSONSchema}} */
// @ts-expect-error these are JSON Schema definitions from @fat-fuzzy/validation package
const externalNamespace = schemas.NamespaceSchema
/**
 * Base types used for validating data at transform boundaries:
 * aggregate <> bridge <> worker <> storage
 * CAVEAT: definitions that use multiple validation conditions need `allOf` to work for form validation
 * -> see ./FormBase.schema.js for equivalent types used in form validation
 */
const NamespaceSchema = defineSchema(externalNamespace)

export default NamespaceSchema
