import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './productSchema'
import { categorySchema } from './categorySchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema],
}
