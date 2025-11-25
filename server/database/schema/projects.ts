import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  // Self-referential parent project (sub-projects)
  parentId: integer('parent_id').references(() => projects.id, {
    onDelete: 'set null',
  }),

  title: text('title').notNull(),
  description: text('description'),

  // planning | active | on_hold | completed
  status: text('status').notNull().default('active'),

  archived: integer('archived', { mode: 'boolean' })
    .notNull()
    .default(false),

  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
