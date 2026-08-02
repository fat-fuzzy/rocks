# Schemas

## Layers

- **Domain** core functionality model
  - root: Document, Preset
- **Identity** identity model
  - root: Human 🚧
- **Primitives** shared properties and types
  - root: - none -
- **Primitives** shared properties and types

## Property lifecycle

This makes the tier rules explicit and checkable:

| Property           | Seed         | Domain     | Export     |
| ------------------ | ------------ | ---------- | ---------- |
| schema_version     | root only    | root only  | root only  |
| id                 | ✗            | ✓ required | ✓ required |
| date_created       | ✗            | ✓          | ✓          |
| language, format   | ✓            | in DocMeta | in DocMeta |
| filename, filetype | ✗            | in DocPath | in DocPath |
| label, title       | in part meta | in DocMeta | in DocMeta |
| blocks             | ✗            | in Section | in Section |
