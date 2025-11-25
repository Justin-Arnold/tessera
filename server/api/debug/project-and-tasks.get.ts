import { db } from '~~/server/database/client';
import { projects, tasks } from '~~/server/database/schema';
import { count } from 'drizzle-orm';

export default defineEventHandler(async () => {
    const [projectCountRow] = await db
        .select({ count: count() })
        .from(projects);

    const [taskCountRow] = await db
        .select({ count: count() })
        .from(tasks);

    return {
        projects: projectCountRow?.count ?? 0,
        tasks: taskCountRow?.count ?? 0,
    };
});