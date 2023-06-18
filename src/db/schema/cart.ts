import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { InferModel } from "drizzle-orm"

export const cart = pgTable('cart', {
    id: serial('id').primaryKey(),
    user_id: varchar('user_id', { length: 255 }).notNull(),
    product_id: varchar('product_id', { length: 255 }).notNull(),
    quantity: integer('quantity').notNull(),
});

export type CartType = InferModel<typeof cart>