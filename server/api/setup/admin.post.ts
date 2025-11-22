import { db } from '~~/server/database/client';
import { users } from '~~/server/database/schema/users';
import bcrypt from 'bcryptjs';

interface SetupBody {
    username: string;
    password: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<SetupBody>(event);

    if (!body.username || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username and password are required',
        });
    }

    const result = await db.select({ id: users.id }).from(users).limit(1);
    if (result.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Admin already set up',
        });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const inserted = await db
        .insert(users)
        .values({
            username: body.username,
            passwordHash,
        })
        .returning({ id: users.id, email: users.username });

    const user = inserted[0];

    // For now, no full session system – we just return the user.
    // Later you’ll create a session token + cookie here.
    return {
        user,
    };
});
