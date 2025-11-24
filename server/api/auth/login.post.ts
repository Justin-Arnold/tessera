import { z } from 'zod';
import { db } from '~~/server/database/client';
import { users } from '~~/server/database/schema/users';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const bodySchema = z.object({
    username: z.string().min(1),
    password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
    const { username, password } = await readValidatedBody(event, bodySchema.parse);

    const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

    const user = result[0];

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'User does not exist',
        });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Incorrect password',
        });
    }

    await setUserSession(event, {
        user: {
            id: user.id,
            username: user.username,
        },
    });

    return {
        user: {
            id: user.id,
            username: user.username,
        },
    };
});
