import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

export const db = drizzle('./.data/tessera.sqlite', { schema });
export type Db = typeof db;