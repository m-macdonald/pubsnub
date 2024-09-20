import { RouteConstants } from '$lib/constants/route.constants';
import dbConnection from 'db';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { lucia } from '$lib/server/auth';

/**@type {import('./$types').PageServerLoad} */
export const load = async (event) => {
    return {
        form: await superValidate(zod(formSchema))
    }
}

/**@type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (typeof username !== 'string') {
            return fail(400, {
                message: "Invalid username"
            });
        }

        if (typeof password !== 'string') {
            return fail(400, {
                message: "Invalid password"
            });
        }

        const db = dbConnection();
        /**@type {import('$lib/models/user').User} */
        const existingUser = db.prepare(`
            SELECT 
                id,
                username, 
                password_hash as passwordHash
            FROM user
            WHERE username = ?`, [username]).get();
        db.close();

        if (!existingUser) {
            return fail(400, {
                message: "Incorrect username or password"
            });
        }

        const isValidPassword = await Bun.password.verify(password, existingUser.passwordHash);
        if (!isValidPassword) {
            return fail(400, {
                message: "Incorrect username or password"
            });
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });

        return redirect(302, RouteConstants.REPORT)
    }
}