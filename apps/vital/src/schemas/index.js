/**
 * @template {import('json-schema-to-typescript').JSONSchema} T
 * @param {T} schema
 * @returns {T}
 */
export const defineSchema = (schema) => schema

/**
 * @template {{[key: string]: import('json-schema-to-typescript').JSONSchema}} T
 * @param {T} defs
 * @returns {T}
 */
export const defineDefinitions = (defs) => defs
