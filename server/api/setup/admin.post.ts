import { db } from '~~/server/database/client';
import { users } from '~~/server/database/schema/users';
import bcrypt from 'bcryptjs';

interface SetupBody {
    email: string;
    password: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<SetupBody>(event);

    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }

    // Check if any user already exists
    const result = await db.select({ id: users.id }).from(users).limit(1);
    if (result.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Admin already set up',
        });
    }

    // Optional: basic email format check
    if (!body.email.includes('@')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email',
        });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const inserted = await db
        .insert(users)
        .values({
            email: body.email,
            passwordHash,
        })
        .returning({ id: users.id, email: users.email });

    const user = inserted[0];

    // For now, no full session system – we just return the user.
    // Later you’ll create a session token + cookie here.
    return {
        user,
    };
});
