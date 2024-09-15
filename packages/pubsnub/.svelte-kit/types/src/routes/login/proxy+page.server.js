// @ts-nocheck
import { RouteConstants } from '$lib/constants/route.constants';
import { db } from 'db';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

/**@param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async (event) => {
    return {
        form: await superValidate(zod(formSchema))
    }
}

/***/
export const actions = {
    default:/** @param {import('./$types').RequestEvent} event */  async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        console.log(username, password);

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


        /**@type {import('$lib/models/user').User} */
        const existingUser = db.prepare(`
            SELECT id, username, password_hash 
            FROM user
            WHERE username = ?`, [username]).get();

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

        redirect(302, RouteConstants.REPORT)
    }
}