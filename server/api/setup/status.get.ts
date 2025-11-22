import { db } from '~~/server/database/client';
import { users } from '~~/server/database/schema/users';
import { count } from 'drizzle-orm';

export default defineEventHandler(async () => {
    const result = await db.select({ count: count() }).from(users);
    const userCount = result[0]?.count ?? 0;

    return {
        hasUser: userCount > 0,
    };
});
