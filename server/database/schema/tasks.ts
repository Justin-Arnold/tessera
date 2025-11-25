import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { projects } from './projects';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),

  // Subtasks
  parentTaskId: integer('parent_task_id').references(() => tasks.id, {
    onDelete: 'cascade',
  }),

  title: text('title').notNull(),
  description: text('description'),

  // todo | in_progress | blocked | done
  status: text('status').notNull().default('todo'),

  priority: integer('priority'), // 1..5 or null

  dueDate: text('due_date'), // 'YYYY-MM-DD' or ISO datetime

  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  completedAt: text('completed_at'),

  archived: integer('archived', { mode: 'boolean' })
    .notNull()
    .default(false),

  version: integer('version').notNull().default(1),
});
