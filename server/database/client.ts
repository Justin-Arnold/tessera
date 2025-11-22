import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema/users';


export const db = drizzle('./.data/tessera.sqlite', { schema });
export type Db = typeof db;